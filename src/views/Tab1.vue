<template>
  <ion-page ref="page">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Toodo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" class="ion-no-border">
        <ion-toolbar>
          <ion-title size="large">Toodo</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding-vertical"></div>
      <ion-item lines="none" color="none">
        <ion-label class="ion-text-wrap">
          <h1><b>{{ greeting }}!</b></h1>
          <h2>What have you done today?</h2>
        </ion-label>
      </ion-item>
      <ListProjects />
      <ion-fab vertical="bottom" horizontal="center" slot="fixed" class="ion-margin-bottom">
        <ion-fab-button @click="openModal">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  modalController,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import AddProject from '@/components/AddProject.vue';
import ListProjects from '@/components/ListProjects.vue';

export default  {
  name: 'Tab1',
  components: { 
    ListProjects,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  data() {
    return {
      add,
    }
  },
  computed: {
    greeting() {
      var today = new Date()
      var curHr = today.getHours()

      if (curHr >= 0 && curHr <= 4) {
        return'Good Night'
      } else if (curHr >= 5 && curHr <= 11) {
        return'Good Morning'
      } else if (curHr >= 12 && curHr <= 17) {
        return'Good Afternoon'
      } else {
        return'Good Evening'
      }
    }
  },
  methods: {
    async openModal() {
      const modal = await modalController
        .create({
          component: AddProject,
          cssClass: 'modal-class',
          showBackdrop: true,
          swipeToClose: true,
          presentingElement: this.$refs.page.$el,
          componentProps: {
            title: 'Add Project',
          },
        })
      return modal.present();
    },
  },
}
</script>