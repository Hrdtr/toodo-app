<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="home" />
          <!-- <ion-label>Home</ion-label> -->
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="copy" />
          <!-- <ion-label>Tasks</ion-label> -->
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="person" />
          <!-- <ion-label>Account</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { 
  IonTabBar,
  IonTabButton,
  IonTabs,
  // IonLabel,
  IonIcon,IonPage
} from '@ionic/vue';
import { home, copy, person } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { 
    // IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,IonPage
  },
  setup() {
    return {
      home, 
      copy, 
      person,
    }
  },
  created() {
    this.$store.dispatch('fetchData')
  },
  // mounted() {
  //   if (this.$store.state.isLoggedIn === false) {
  //     this.$router.replace('/login')
  //   }
  // }
}
</script>