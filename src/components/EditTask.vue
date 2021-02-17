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
    <form @submit.prevent="saveChanges">
      <ion-item color="none">
        <ion-label position="floating">Title</ion-label>
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <ion-input v-model="data.title" required></ion-input>
      </ion-item>
      <ion-item color="none">
        <ion-label position="floating">Description</ion-label>
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <ion-textarea v-model="data.description" auto-grow></ion-textarea>
      </ion-item>
      <button ref="submitButton" type="submit" style="display: none;"></button>
    </form>
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar color="none">
      <div class="ion-padding" slot="end">
        <ion-button fill="clear" @click="dismissModal">Cancel</ion-button>
        <ion-button type="button" @click="$refs.submitButton.click()">Save</ion-button>
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
  loadingController
} from "@ionic/vue";

import {
  closeOutline,
} from 'ionicons/icons';

export default ({
  name: "AddTask",
  props: {
    title: { type: String, default: "" },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      closeOutline
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
    closeModal(task) {
      modalController.dismiss(task)
    },
    dismissModal() {
      modalController.dismiss(null)
    },
    async startLoading() {
      const loading = await loadingController
        .create({
          message: 'Saving changes<br />Please wait...',
          translucent: true,
        });

      loading.present();
    },
    async saveChanges() {
      this.startLoading()
      try {
        const res = await this.$appwrite.database.updateDocument(
          '6027dcf83254b',
          this.data.$id,
          {
            title: this.data.title,
            description: this.data.description
          },
          null,
          null
        )
        this.$store.dispatch('fetchData')
        loadingController.dismiss()
        this.closeModal({...res, expanded: true})
      } catch (error) {
        console.log(error)
        loadingController.dismiss()
      }
    }
  },
});
</script>