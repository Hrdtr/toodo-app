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
    <form ref="newTask" @submit.prevent="saveData">
      <ion-item color="none">
        <ion-label position="floating">Title</ion-label>
        <ion-input v-model="payload.title" required></ion-input>
      </ion-item>
      <ion-item color="none">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="payload.description" auto-grow></ion-textarea>
      </ion-item>
      <button ref="submitButton" type="submit" style="display: none"></button>
    </form>
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar color="none">
      <div class="ion-padding" slot="end">
        <ion-button @click="dismissModal" fill="clear">Cancel</ion-button>
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
  loadingController,
} from "@ionic/vue";

import {
  closeOutline,
} from 'ionicons/icons';

export default ({
  name: "AddTask",
  props: {
    title: { type: String, default: "" },
    projectId: { type: String, default: "" },
  },
  data() {
    return {
      closeOutline,
      payload: {
        title: '',
        description: '',
        status: 0,
      },
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
      this.$refs.newTask.reset()
    },
    dismissModal() {
      modalController.dismiss(null)
      this.$refs.newTask.reset()
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
        const res = await this.$appwrite.database.createDocument(
          '6027dcf83254b',
          this.payload,
          [`user:${this.$store.state.user.$id}`],
          [`user:${this.$store.state.user.$id}`],
          this.projectId,
          'tasks',
          'append'
        )
        this.$store.dispatch('fetchData')
        this.$refs.newTask.reset()

        const project = JSON.parse(JSON.stringify(res))
        project.tasks.forEach((t) => t.expanded = false)
        project.tasks.sort((a, b) => a.status - b.status)

        loadingController.dismiss()
        this.closeModal(project)
      } catch (error) {
        console.log(error)
        loadingController.dismiss()
      }
    }
  },
});
</script>