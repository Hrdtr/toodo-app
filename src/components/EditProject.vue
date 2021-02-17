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
        <ion-label position="floating">Name</ion-label>
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <ion-input v-model="data.name" required></ion-input>
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
      <div class="ion-padding" slot="start">
        <ion-button fill="outline" color="danger" @click="deleteProject">Delete</ion-button>
      </div>
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
  alertController,
  loadingController,
} from "@ionic/vue";

import {
  closeOutline,
} from 'ionicons/icons';

export default ({
  name: "Add Project",
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
    dismissModal() {
      modalController.dismiss()
    },
    async deleteProject() {
      const alert = await alertController
        .create({
          header: 'Confirm Deletion!',
          message: `Are you sure to delete project: <strong>${this.data.name}</strong>?`,
          cssClass: 'alert-class',
          translucent: true,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              // handler: (blah) => {
              //   console.log('Confirm Cancel:', blah)
              // },
            },
            {
              text: 'Okay',
              handler: async () => {
                this.startDeleting()
                try {
                  this.data.tasks.forEach((t) => {
                    this.$appwrite.database.deleteDocument(
                      '6027dcf83254b',
                      t.$id,
                    )
                  })
                  await this.$appwrite.database.deleteDocument(
                    '6027d9bbdcb36',
                    this.data.$id,
                  )
                  this.$router.replace('/tabs/tab1')
                  this.$store.dispatch('fetchData')
                  loadingController.dismiss()
                  modalController.dismiss()
                } catch (error) {
                  console.log(error)
                  loadingController.dismiss()
                }
              },
            },
          ],
        });
      return alert.present();
    },
    async startDeleting() {
      const loading = await loadingController
        .create({
          message: 'Deleting project<br />Please wait...',
          translucent: true,
        });

      loading.present();
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
        await this.$appwrite.database.updateDocument(
          '6027d9bbdcb36',
          this.data.$id,
          {
            name: this.data.name,
            description: this.data.description
          },
          null,
          null
        )
        this.$store.dispatch('fetchData')
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