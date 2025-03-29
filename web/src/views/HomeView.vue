<template>
  <div class="home">
    <TextAnimation v-if="showTextAnimation" @animation-complete="onAnimationComplete"/>
    <GlobeWidget v-if="showGlobe" />
  </div>
</template>

<script>
// @ is an alias to /src
import TextAnimation from '@/components/TaglineWidget.vue'
import GlobeWidget from '@/components/GlobeWidget.vue'

export default {
  name: 'HomeView',
  components: {
    TextAnimation,
    GlobeWidget
  },
  data() {
    return {
      showTextAnimation: true,
      showGlobe: false
    };
  },
  methods: {
    onAnimationComplete() {
      this.showTextAnimation = false;
      this.showGlobe = true;
    }
  }
}
</script>
