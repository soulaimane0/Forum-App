<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#333',
  },
});
const spinnerColor = props.color;
</script>

<template>
  <div class="sk-circle">
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
  </div>
</template>

<style lang="scss" scoped>
.sk-circle {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  .sk-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: v-bind(spinnerColor);
      border-radius: 100%;
      animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    }
  }
  .sk-circle2 {
    transform: rotate(30deg);
  }

  .sk-circle3 {
    transform: rotate(60deg);
  }

  .sk-circle4 {
    transform: rotate(90deg);
  }

  .sk-circle5 {
    transform: rotate(120deg);
  }

  .sk-circle6 {
    transform: rotate(150deg);
  }

  .sk-circle7 {
    transform: rotate(180deg);
  }

  .sk-circle8 {
    transform: rotate(210deg);
  }

  .sk-circle9 {
    transform: rotate(240deg);
  }

  .sk-circle10 {
    transform: rotate(270deg);
  }

  .sk-circle11 {
    transform: rotate(300deg);
  }

  .sk-circle12 {
    transform: rotate(330deg);
  }

  .sk-circle2:before {
    animation-delay: -1.1s;
  }

  .sk-circle3:before {
    animation-delay: -1s;
  }

  .sk-circle4:before {
    animation-delay: -0.9s;
  }

  .sk-circle5:before {
    animation-delay: -0.8s;
  }

  .sk-circle6:before {
    animation-delay: -0.7s;
  }

  .sk-circle7:before {
    animation-delay: -0.6s;
  }

  .sk-circle8:before {
    animation-delay: -0.5s;
  }

  .sk-circle9:before {
    animation-delay: -0.4s;
  }

  .sk-circle10:before {
    animation-delay: -0.3s;
  }

  .sk-circle11:before {
    animation-delay: -0.2s;
  }

  .sk-circle12:before {
    animation-delay: -0.1s;
  }

  @keyframes sk-circleBounceDelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
}
</style>
