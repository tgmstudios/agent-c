<template>
    <div id="globeContainer" ref="globeContainer"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProjects } from '@/lib/projectsLoader.js';
import Globe from 'globe.gl';
import * as THREE from 'three';

export default {
    name: 'GlobeWidget',
    setup() {
        const router = useRouter();
        const globeContainer = ref(null);
        let myGlobe;

        const handleResize = () => {
            if (myGlobe && globeContainer.value && globeContainer.value.getBoundingClientRect().width) {
                const { width, height } = globeContainer.value.getBoundingClientRect();
                myGlobe.width(width);
                myGlobe.height(height);
            }
        };
        
        const N = 20;
        const arcsData = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
        }));

        const storedCoordinates = [];
        const MAX_ATTEMPTS = 500;

        const randomLatLng = () => {
            const getRandom = (min, max) => Math.random() * (max - min) + min;
            
            const isFar = ({ lat, lng }) => {
                for (const { lat: l, lng: g } of storedCoordinates) {
                    if (Math.hypot(lat - l, lng - g) < 50) return false;
                }
                return true;
            };

            let coord, attempts = 0;

            while (attempts < MAX_ATTEMPTS) {
                coord = {
                    lat: parseFloat(getRandom(-40, 40).toFixed(4)),
                    lng: parseFloat(getRandom(-180, 180).toFixed(4))
                };
                if (isFar(coord)) {
                    storedCoordinates.push(coord);
                    return coord;
                }
                attempts++;
            }

            console.warn("Could not find a suitable coordinate after maximum attempts. Icons will overlap!");
            return coord;
        };

        const projectsObj = getProjects();
        const projects = Object.keys(projectsObj).map(key => {
            const project = projectsObj[key];
            const { lat, lng } = randomLatLng();
            return { ...project, lat, lng };
        });

        onMounted(() => {
            myGlobe = Globe()
            myGlobe(globeContainer.value)
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
                .enablePointerInteraction(true)
                .width(globeContainer.value.clientWidth)
                .height(globeContainer.value.clientHeight)

            myGlobe.controls().autoRotate = true
            myGlobe.controls().autoRotateSpeed = 0.6
            myGlobe.controls().enableZoom = false
            myGlobe.controls().touches = false
            myGlobe.controls().enableRotate = false

            myGlobe.arcsData(arcsData)
                .arcColor('color')
                .arcDashLength(() => Math.random())
                .arcDashGap(() => Math.random())
                .arcDashAnimateTime(() => Math.random() * 4000 + 500)
                    
            myGlobe.customLayerData(projects) // Layer for images and text
                .customThreeObject(d => {
                    const group = new THREE.Group();

                    // Create sprite for the icon
                    const iconTexture = new THREE.TextureLoader().load(d.icon);
                    const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture });
                    const iconSprite = new THREE.Sprite(iconMaterial);
                    iconSprite.scale.set(5, 5, 1); // Adjust the size as needed
                    group.add(iconSprite);

                    // Create text canvas
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    context.font = 'Bold 32px Arial';

                    // Measure text width and adjust canvas size dynamically
                    const textMetrics = context.measureText(d.title);
                    canvas.width = textMetrics.width + 20;  // Add padding
                    canvas.height = 64;

                    // Re-draw the text after adjusting the canvas size
                    context.font = 'Bold 32px Arial';
                    context.fillStyle = 'white';
                    context.textAlign = 'center';
                    context.fillText(d.title, canvas.width / 2, 40);

                    // Create text texture and sprite
                    const textTexture = new THREE.CanvasTexture(canvas);
                    textTexture.needsUpdate = true;
                    const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
                    const textSprite = new THREE.Sprite(textMaterial);
                    textSprite.scale.set(canvas.width / 40, canvas.height / 40, 1);  // Scale based on canvas size

                    // Position text below the icon
                    textSprite.position.y = -2.5;

                    // Add sprites to group
                    group.add(textSprite);
                    return group;
                })
                .customThreeObjectUpdate((obj, d) => {
                    const { x, y, z } = myGlobe.getCoords(d.lat, d.lng, .5);
                    obj.position.set(x, y, z);

                    //const scale = 7;
                    const screenWidth = window.innerWidth;
                    const baseScale = 7;
                    const scaleFactor = screenWidth < 768 ? 0.8 : 1; // Adjust for mobile
                    const scale = baseScale * scaleFactor;
                    obj.scale.set(scale, scale, scale);
                })
                .onCustomLayerClick((d) => {
                    if (d.path) {
                        router.push(d.path);
                    }
                })
                .onCustomLayerHover(obj => {
                    if (obj) {
                        document.body.style.cursor = 'pointer';
                    } else {
                        document.body.style.cursor = 'default';
                    }
                }).customLayerLabel(null);

            const screenWidth = window.innerWidth;
            const altitude = screenWidth < 768 ? 3.5 : 2.5; // Reduced altitude for mobile
            myGlobe.pointOfView({ altitude: altitude })

            window.addEventListener('resize', handleResize);
            handleResize(); // Initial resize
        });
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return { globeContainer };
    }
}
</script>

<style scoped>
#globeContainer {
    overflow-x:hidden;
    width: 100%; 
    height: 100vh;
}
@media (max-width: 768px) {
    #globeContainer {
       pointer-events: none;
    }
}
</style>