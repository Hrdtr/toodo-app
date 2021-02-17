<template>
  <ion-page ref="page">
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="openEditProjectModal">
            <ion-icon :icon="createOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ project.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" class="ion-no-border">
        <ion-toolbar>
          <ion-title size="large">{{ project.name }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding-vertical"></div>
      <div v-if="project.description">
        <h3 class="section-title base-padding">Project Description:</h3>
        <p class="base-padding">{{ project.description }}</p>
      </div>

      <h3 class="section-title base-padding" :class="project.description ? 'ion-padding-top' : ''">Tasks:</h3>
      
      <div v-if="project.tasks.length === 0" class="no-task-text base-padding">
        <p>There is no task yet in this project<br />Add a new task by tapping on the plus sign button below ↓</p>
      </div>

      <ion-card v-else v-for="(task, i) in project.tasks" :key="i" class="ion-margin" button @click="toggleTask(i)">
        <div class="task-card-content ion-padding">
          <div v-if="task.status === 1" class="task-done-indicator"></div>
          <div class="task-card-header">
            <p color="none" class="task-card-title" :class="task.status === 1 ? 'task-done': ''">
              {{ task.title }}
            </p>
            <button v-if="task.expanded" color="none" @click.stop="collapseTask(i)" style="background: transparent; margin-top: -5px;">
              <ion-icon :icon="caretUpOutline"></ion-icon>
            </button>
            <button v-else color="none" @click.stop="toggleTask(i)" style="background: transparent; margin-top: -5px;">
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
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonButtons,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonBackButton,
  IonSpinner,
  modalController,
  alertController,
  loadingController
} from '@ionic/vue';
import {
  checkmarkDoneOutline,
  createOutline,
  trashBinOutline,
  handLeftOutline,
  add,
  caretDownOutline,
  caretUpOutline,
} from 'ionicons/icons';

import AddTask from '@/components/AddTask.vue';
import EditTask from '@/components/EditTask.vue';
import EditProject from '@/components/EditProject.vue';

export default  {
  name: 'Tab1',
  components: { 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonButtons,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonBackButton,
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
      project: {
        tasks: []
      }
    }
  },
  created() {
    const project = this.$store.state.projects
      .find((p) => p.$id === this.$route.params.id)
    project.tasks.forEach((t) => t.expanded = false)
    project.tasks.sort((a, b) => a.status - b.status)
    this.project = JSON.parse(JSON.stringify(project))
  },
  methods: {
    toggleTask(i) {
      if (this.project.tasks[i].expanded === false) {
        this.project.tasks.forEach((task) => task.expanded = false)
        this.project.tasks[i].expanded = true
      }
    },
    collapseTask(i) {
      if (this.project.tasks[i].expanded === true) {
        this.project.tasks[i].expanded = false
      }
    },
    async toggleStatus(i, status) {
      this.project.tasks[i].status = null
      try {
        await this.$appwrite.database.updateDocument(
          '6027dcf83254b',
          this.project.tasks[i].$id,
          {
            status: status
          },
          null,
          null
        )
        this.project.tasks[i].status = status
        this.project.tasks.sort((a, b) => a.status - b.status)
        this.$store.dispatch('fetchData')
      } catch (error) {
        console.log(error)
      }
    },
    async openModal() {
      const modal = await modalController
        .create({
          component: AddTask,
          cssClass: 'modal-class',
          showBackdrop: true,
          swipeToClose: true,
          presentingElement: this.$refs.page.$el,
          componentProps: {
            title: 'Add Task',
            projectId: this.project.$id
          },
        })
      modal.onDidDismiss().then((task) => {
        if (task.data) this.project = task.data
      })
      return modal.present();
    },
    async openEditProjectModal() {
      const modal = await modalController
        .create({
          component: EditProject,
          cssClass: 'modal-class',
          showBackdrop: true,
          swipeToClose: true,
          presentingElement: this.$refs.page.$el,
          componentProps: {
            title: 'Edit Project',
            data: this.project
          },
        })
      return modal.present();
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
            data: JSON.parse(JSON.stringify(this.project.tasks[i]))
          },
        })
      modal.onDidDismiss().then((task) => {
        if (task.data) this.project.tasks[i] = task.data
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
          message: `Are you sure to delete <strong>${this.project.tasks[i].title}</strong> from task list?`,
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
                    this.project.tasks[i].$id,
                  )
                  const removedTaskId = this.project.tasks[i].$id
                  this.$store.dispatch('fetchData')
                  this.project.tasks = this.project.tasks.filter((t) => t.$id !== removedTaskId)
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
}
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
  justify-items: center;
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
  text-decoration: line-through;
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