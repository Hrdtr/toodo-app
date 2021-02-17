<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal">
          <ion-icon :icon="closeOutline" size="large"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense" class="ion-no-border">
      <ion-toolbar>
        <ion-title size="large">{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="ion-padding-vertical"></div>
    <form ref="newProject" @submit.prevent="saveData">
      <ion-item color="none">
        <ion-label position="floating">Name</ion-label>
        <ion-input v-model="payload.name" autofocus required></ion-input>
      </ion-item>
      <ion-item color="none">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="payload.description" auto-grow></ion-textarea>
      </ion-item>
      <button type="submit" ref="submitButton" style="display: none"></button>
    </form>
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar color="none">
      <div class="ion-padding" slot="end">
        <ion-button fill="clear" @click="dismissModal">Cancel</ion-button>
        <ion-button type="submit" @click="$refs.submitButton.click()">Save</ion-button>
      </div>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonFooter,
  IonItem,
  IonInput,
  IonTextarea,
  IonLabel,
  IonIcon,
  modalController,
  loadingController,
} from "@ionic/vue";

import {
  closeOutline,
} from 'ionicons/icons';

export default ({
  name: "Add Project",
  props: {
    title: { type: String, default: "" },
  },
  data() {
    return {
      closeOutline,
      payload: {
        name: '',
        description: '',
        tasks: []
      }
    }
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonFooter,
    IonItem,
    IonInput,
    IonTextarea,
    IonLabel,
    IonIcon,
  },
  methods: {
    dismissModal() {
      this.$refs.newProject.reset()
      modalController.dismiss()
    },
    async startLoading() {
      const loading = await loadingController
        .create({
          message: 'Saving data<br />Please wait...',
          translucent: true,
        });

      loading.present();
    },
    async saveData() {
      this.startLoading()
      try {
        await this.$appwrite.database.createDocument(
          '6027d9bbdcb36',
          this.payload,
          [`user:${this.$store.state.user.$id}`],
          [`user:${this.$store.state.user.$id}`]
        )
        this.$store.dispatch('fetchData')
        this.$refs.newProject.reset()
        loadingController.dismiss()
        this.dismissModal()
      } catch (error) {
        console.log(error)
        loadingController.dismiss()
      }
    }
  },
});
</script>