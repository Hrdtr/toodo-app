<template>
  <div id="container">
    <ion-spinner></ion-spinner>
  </div>
</template>

<script>
import { IonSpinner } from '@ionic/vue';

export default {
  name: 'ExploreContainer',
  components: { IonSpinner },
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>