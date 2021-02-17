<template>
  <ion-page ref="page">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>All Tasks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" class="ion-no-border">
        <ion-toolbar>
          <ion-title size="large">All Tasks</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding-vertical"></div>

      <div v-if="loading">
        <ion-card class="ion-margin">
          <div class="ion-padding">
            <ion-skeleton-text animated style="width: 20%; height: 14px"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 40%; margin-top: 8px; height: 18px"></ion-skeleton-text>
            <ion-skeleton-text animated style="margin-top: 12px; height: 14px"></ion-skeleton-text>
          </div>
        </ion-card>
        <ion-card class="ion-margin">
          <div class="ion-padding">
            <ion-skeleton-text animated style="width: 20%; height: 14px"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 40%; margin-top: 8px; height: 18px"></ion-skeleton-text>
            <ion-skeleton-text animated style="margin-top: 12px; height: 14px"></ion-skeleton-text>
          </div>
        </ion-card>
        <ion-card class="ion-margin">
          <div class="ion-padding">
            <ion-skeleton-text animated style="width: 20%; height: 14px"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 40%; margin-top: 8px; height: 18px"></ion-skeleton-text>
            <ion-skeleton-text animated style="margin-top: 12px; height: 14px"></ion-skeleton-text>
          </div>
        </ion-card>
        <ion-card class="ion-margin">
          <div class="ion-padding">
            <ion-skeleton-text animated style="width: 20%; height: 14px"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 40%; margin-top: 8px; height: 18px"></ion-skeleton-text>
            <ion-skeleton-text animated style="margin-top: 12px; height: 14px"></ion-skeleton-text>
          </div>
        </ion-card>
        <ion-card class="ion-margin">
          <div class="ion-padding">
            <ion-skeleton-text animated style="width: 20%; height: 14px"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 40%; margin-top: 8px; height: 18px"></ion-skeleton-text>
            <ion-skeleton-text animated style="margin-top: 12px; height: 14px"></ion-skeleton-text>
          </div>
        </ion-card>
      </div>
      
      <div v-if="!loading && tasks.length === 0" class="no-task-text base-padding">
        <p>You not have any project added yet.</p>
      </div>

      <div v-if="!loading && tasks.length !== 0">
        <ion-card v-for="(task, i) in tasks" :key="i" class="ion-margin" button @click="toggleTask(i)">
          <div class="task-card-content ion-padding">
            <div v-if="task.status === 1" class="task-done-indicator"></div>
            <div class="task-card-header">
              <div style="display: flex; flex-direction: column;">
                <span style="margin-bottom: 2px;">
                  {{ task.project }}
                </span>
                <p color="none" class="task-card-title" :class="task.status === 1 ? 'task-done': ''">
                  {{ task.title }}
                </p>
              </div>
              <button v-if="task.expanded" color="none" @click.stop="collapseTask(i)" style="background: transparent; margin-top: -22px;">
                <ion-icon :icon="caretUpOutline"></ion-icon>
              </button>
              <button v-else color="none" @click.stop="toggleTask(i)" style="background: transparent; margin-top: -22px;">
                <ion-icon :icon="caretDownOutline"></ion-icon>
              </button>
            </div>

            <div class="task-card-description" :class="task.status === 1 ? 'task-done': ''">
              <span :class="task.expanded ? 'ion-text-wrap' : 'ion-text-nowrap'">
                {{ task.description }}
              </span>
            </div>

            <div v-if="task.expanded" class="task-card-action">
              <ion-button size="small" color="danger" fill="solid" @click="deleteTask(i)">
                <ion-icon slot="start" :icon="trashBinOutline"></ion-icon>
                Delete
              </ion-button>
              <div>
                <ion-button size="small" color="primary" @click="openEditModal(i)">
                  <ion-icon slot="start" :icon="createOutline"></ion-icon>
                  Edit
                </ion-button>
                <ion-button v-if="task.status === 0" size="small" color="success" button @click="toggleStatus(i, 1)">
                  <ion-icon slot="start" :icon="checkmarkDoneOutline"></ion-icon>
                  Done
                </ion-button>
                <ion-button v-if="task.status === 1" size="small" color="warning" button @click="toggleStatus(i, 0)">
                  <ion-icon slot="start" :icon="handLeftOutline"></ion-icon>
                  To do
                </ion-button>
                <ion-button v-if="task.status === null" size="small" color="none">
                  <ion-spinner name="dots"></ion-spinner>
                </ion-button>
              </div>
            </div>
          </div>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonButton,
  IonIcon,
  IonSkeletonText,
  IonSpinner,
  modalController,
  alertController,
  loadingController
} from "@ionic/vue";
import {
  checkmarkDoneOutline,
  createOutline,
  trashBinOutline,
  handLeftOutline,
  add,
  caretDownOutline,
  caretUpOutline,
} from 'ionicons/icons';

import EditTask from '@/components/EditTask.vue';

export default {
  name: "Tab2",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonButton,
    IonIcon,
    IonSkeletonText,
    IonSpinner,
  },
  data() {
    return {
      checkmarkDoneOutline,
      createOutline,
      trashBinOutline,
      handLeftOutline,
      add,
      caretDownOutline,
      caretUpOutline,
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    projects() {
      return this.$store.state.projects
    },
    tasks() {
      return this.$store.state.tasks
    }
  },
  methods: {
    toggleTask(i) {
      if (this.tasks[i].expanded === false) {
        this.tasks.forEach((task) => task.expanded = false)
        this.tasks[i].expanded = true
      }
    },
    collapseTask(i) {
      if (this.tasks[i].expanded === true) {
        this.tasks[i].expanded = false
      }
    },
    async toggleStatus(i, status) {
      this.tasks[i].status = null
      try {
        await this.$appwrite.database.updateDocument(
          '6027dcf83254b',
          this.tasks[i].$id,
          {
            status: status
          },
          null,
          null
        )
        await this.$store.dispatch('fetchData')
      } catch (error) {
        console.log(error)
      }
    },
    async openEditModal(i) {
      const modal = await modalController
        .create({
          component: EditTask,
          cssClass: 'modal-class',
          showBackdrop: true,
          swipeToClose: true,
          presentingElement: this.$refs.page.$el,
          componentProps: {
            title: 'Edit Task',
            data: JSON.parse(JSON.stringify(this.tasks[i]))
          },
        })
      return modal.present();
    },
    async startDeleting() {
      const loading = await loadingController
        .create({
          message: 'Deleting task<br />Please wait...',
          translucent: true,
        });

      loading.present();
    },
    async deleteTask(i) {
      const alert = await alertController
        .create({
          header: 'Confirm Deletion!',
          message: `Are you sure to delete <strong>${this.tasks[i].title}</strong> from task list?`,
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
                  await this.$appwrite.database.deleteDocument(
                    '6027dcf83254b',
                    this.tasks[i].$id,
                  )
                  this.$store.dispatch('fetchData')
                  loadingController.dismiss()
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
  }
};
</script>

<style scoped>
.task-card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.task-card-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: flex-start;
}
.task-card-title {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  --color: var(--ion-text-color, #000);
  margin: 0px;
  padding: 0px;
  line-height: 1.2;
  color: var(--color);
}
.task-card-description {
  width: 100%;
  margin-top: 4px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.task-done-indicator {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: var(--ion-color-success);
}
.task-done {
  text-decoration: line-through !important;
}
.task-card-action {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.no-task-text {
  line-height: 21px;
}

button:focus {
  outline: none;
  box-shadow: none;
}
</style>