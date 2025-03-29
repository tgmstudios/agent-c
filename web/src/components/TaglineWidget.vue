<template>
    <div class="text-animation" v-if="showAnimation">
        <div class="phrase">{{ displayedText }}</div>
    </div>
</template>

<script>
export default {
    name: 'TaglineWidget',
    data() {
        return {
            phrases: ["From Design and Development", "To Hosting and Deploying", "That's TGM."],
            currentIndex: 0,
            displayedText: '',
            showAnimation: true,
            typingSpeed: 70, // milliseconds per character
            pauseBetweenPhrases: 1000 // milliseconds
        };
    },
    mounted() {
        this.animateText();
    },
    methods: {
        animateText() {
            this.typePhrase(this.phrases[this.currentIndex]);
        },
        typePhrase(phrase) {
            let i = 0;
            const typing = setInterval(() => {
                if (i < phrase.length) {
                    this.displayedText += phrase.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    if (this.currentIndex < this.phrases.length - 1) {
                        setTimeout(() => {
                            this.erasePhrase();
                        }, this.pauseBetweenPhrases);
                    } else {
                        this.finishAnimation();
                    }
                }
            }, this.typingSpeed);
        },
        erasePhrase() {
            const erasing = setInterval(() => {
                if (this.displayedText.length > 0) {
                    this.displayedText = this.displayedText.slice(0, -1);
                } else {
                    clearInterval(erasing);
                    this.currentIndex++;
                    this.animateText();
                }
            }, this.typingSpeed / 2);
        },
        finishAnimation() {
            setTimeout(() => {
                this.showAnimation = false;
                this.$emit('animation-complete');
            }, 2000); // Keep the last phrase visible for 2 seconds before emitting the event
        }
    }
};
</script>

<style scoped>
.text-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #010007;
    color: whitesmoke;
    font-size: 3rem;
    text-align: center;
}

.phrase {
    min-height: 3.5rem; /* Adjust based on your font size to prevent layout shifts */
}

.phrase::after {
    content: '|';
    animation: blink 0.7s infinite;
}

@keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}
</style>