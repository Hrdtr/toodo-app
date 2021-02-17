<template>
  <ion-page ref="page">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" class="ion-no-border">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding-vertical"></div>
      <ion-item lines="none" color="none">
        <ion-label v-if="$store.state.user === null" class="ion-text-wrap">
          <ion-skeleton-text animated style="width: 30%; height: 26px;"></ion-skeleton-text>
          <ion-skeleton-text animated style="width: 50%; height: 16px;"></ion-skeleton-text>
        </ion-label>
        <ion-label v-else class="ion-text-wrap">
          <h1><b>{{ $store.state.user.name }}</b></h1>
          <h2 v-if="$store.state.user.name !== $store.state.user.email">{{ $store.state.user.email }}</h2>
        </ion-label>
      </ion-item>
      <ion-list class="ion-margin-top">
        <ion-item button detail @click="openModal">
          <ion-label>Change Password</ion-label>
        </ion-item>
        <ion-item button detail @click="logout">
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
      <Credit name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonList,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonSkeletonText,
  modalController,
  loadingController,
} from "@ionic/vue";
import Credit from "@/components/Credit.vue";
import ChangePassword from "@/components/ChangePassword.vue";

export default {
  name: "Tab3",
  components: {
    Credit,
    IonHeader,
    IonList,
    IonLabel,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonSkeletonText,
    IonPage,
  },
  data() {
    return {};
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: ChangePassword,
        cssClass: "modal-class",
        showBackdrop: true,
        swipeToClose: true,
        presentingElement: this.$refs.page.$el,
        componentProps: {
          title: "Change Password",
        },
      });
      return modal.present();
    },
    async logout() {
      try {
        this.startLoading()
        await this.$appwrite.account.deleteSession('current')
        this.$store.commit('setUser', null)
        this.$store.commit('setIsLoggedIn', false)
        localStorage.setItem('isLoggedIn', false)
        loadingController.dismiss()
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
        loadingController.dismiss()
      }
    },
    async startLoading() {
      const loading = await loadingController
        .create({
          message: 'Logging you out<br />Please wait...',
          translucent: true,
        });

      loading.present();
    },
  },
};
</script>