import { getCurrentInstance, ref } from 'vue';

const useAsyncDataStatus = () => {
  try {
    const instance = getCurrentInstance();
    const isDataReady = ref(false);

    const asyncData_fetched = () => {
      isDataReady.value = true;
      instance.emit('ready');
    };

    return { isDataReady, asyncData_fetched };
  } catch (err) {
    console.log('Error : ', err);
  }
};

export default useAsyncDataStatus;
