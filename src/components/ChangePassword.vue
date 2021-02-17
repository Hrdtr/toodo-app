<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal">Close</ion-button>
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
        <ion-label position="floating">Current Password</ion-label>
        <ion-input v-model="currentPassword" type="password" required :minlength="8"></ion-input>
      </ion-item>
      <ion-item color="none">
        <ion-label position="floating">New Password</ion-label>
        <ion-input v-model="newPassword" type="password" required :minlength="8"></ion-input>
      </ion-item>
      <ion-item v-if="errorMessage" lines="none" color="none">
        <ion-text slot="end" style="text-align: right;" color="danger">
          <p>{{ errorMessage }}</p>
        </ion-text>
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
  IonLabel,
  IonText,
  modalController,
  loadingController,
  toastController
} from "@ionic/vue";

export default ({
  name: "AddTask",
  props: {
    title: { type: String, default: "" },
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      errorMessage: ''
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
    IonLabel,
    IonText,
  },
  methods: {
    dismissModal() {
      modalController.dismiss()
    },
    async startLoading() {
      const loading = await loadingController
        .create({
          message: 'Saving changes<br />Please wait...',
          translucent: true,
        });

      loading.present();
    },
    async openToast() {
      const toast = await toastController
        .create({
          message: 'Your password has been changed',
          duration: 4000,
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel',
              // handler: () => {
              //   console.log('Cancel clicked');
              // }
            }
          ]
        })
      return toast.present();
    },
    async saveChanges() {
      this.startLoading()
      try {
        await this.$appwrite.account.updatePassword(this.newPassword, this.currentPassword)
        loadingController.dismiss()
        this.dismissModal()
        this.openToast()
      } catch (error) {
        console.log(error)
        this.errorMessage = error.message;
        loadingController.dismiss()
      }
    }
  },
});
</script>