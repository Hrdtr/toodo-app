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
      <form ref="login" style="height: 85%; display: flex; flex-direction: column; justify-content: center;" @submit.prevent="login">
        <ion-item lines="none" color="none">
          <ion-label class="ion-text-wrap">
            <h1>Login to your account first</h1>
          </ion-label>
        </ion-item>
        <ion-item color="none">
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email" inputmode="email" required></ion-input>
        </ion-item>
        <ion-item color="none">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password" required></ion-input>
        </ion-item>
        <ion-text v-if="errorMessage" class="ion-padding-horizontal" style="text-align: right;" color="danger">
          <p>{{ errorMessage }}</p>
        </ion-text>
        <div class="ion-padding ion-margin-top" style="text-align: right;">
          <ion-button type="submit">Login</ion-button>
        </div>
        <!-- <ion-item color="none" lines="none" class="ion-padding-top">
          <p slot="end">Or...</p>
        </ion-item>
        <div class="ion-padding-horizontal" style="text-align: right;">
          <ion-button type="submit">
            <ion-icon :icon="logoGoogle" slot="start"></ion-icon>
            Login with Google
          </ion-button>
        </div> -->
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  loadingController,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  // IonIcon,
} from '@ionic/vue';
import { logoGoogle } from 'ionicons/icons';

export default  {
  name: 'Tab1',
  components: { 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    // IonIcon,
  },
  data() {
    return {
      logoGoogle,
      email: '',
      password: '',
      errorMessage: '',
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
    async login() {
      try {
        this.startLoading()
        await this.$appwrite.account.createSession(this.email, this.password)
        localStorage.setItem('isLoggedIn', 'true')
        location.reload()
      } catch (error) {
        this.errorMessage = error.message
        loadingController.dismiss()
      }
    },
    async startLoading() {
      const loading = await loadingController
        .create({
          message: 'Logging you in<br />Please wait...',
          translucent: true,
        });

      loading.present();
    },
  },
}
</script>