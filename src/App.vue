<template>
  <ion-app>
    <ion-router-outlet :animated="false" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default ({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
});
</script>