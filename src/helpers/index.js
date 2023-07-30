import useUnsubscribeStore from '@/stores/UnsubscribeStore';

export const findById = (resources, id) => resources.find((item) => item.id === id);

export const handleImgError = (e) => (e.target.src = '/user-placeholder.png');
export const appendUnsubscribe = (unsubscribe) =>
  useUnsubscribeStore().unsubscribes.push(unsubscribe);
export const arrayRandom = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
