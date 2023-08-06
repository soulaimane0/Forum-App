<script setup>
import { arrayRandom } from '@/helpers';

const emits = defineEmits(['hit']);
const getRandomImage = async () => {
  const searchTerms = [
    'cats',
    'dogs',
    'abstract',
    'cars',
    'mountains',
    'beach',
    'landscape',
    'object',
    'food',
    'flowers',
    'architecture',
    'yellow',
    'green',
    'blue',
    'orange',
    'black',
    'white',
    'brown',
    'red',
    'patterns',
    'animal',
    'code',
    'space',
  ];
  const randomWord = arrayRandom(searchTerms);
  const res = await fetch(
    `https://pixabay.com/api/?key=38553140-2602e9d0a39d6526226f823d2&q=${randomWord}`
  );
  const data = await res.json();
  const randomImage = arrayRandom(data.hits);

  const response = await fetch(randomImage.webformatURL);
  const blob = await response.blob();

  const file = new File([blob], randomImage.webformatURL, { type: blob.type });
  emits('hit', file);
};
</script>

<template>
  <div class="text-center my-2">
    <button class="btn btn-success-500 text-white btn-sm" @click.prevent="getRandomImage">
      Random Avatar
    </button>
    <br />
    <small class="opacity-50">Powered by <a href="https://pixabay.com">Pixabay</a></small>
  </div>
</template>
