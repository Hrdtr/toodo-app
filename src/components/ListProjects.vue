<template>
  <h3 class="section-title base-padding">Projects</h3>

  <div v-if="loading">
    <ion-card class="ion-margin">
      <div class="project-card-content ion-padding">
        <ion-skeleton-text animated style="width: 40%; height: 20px"></ion-skeleton-text>
        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
    <ion-card class="ion-margin">
      <div class="project-card-content ion-padding">
        <ion-skeleton-text animated style="width: 40%; height: 20px"></ion-skeleton-text>
        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
    <ion-card class="ion-margin">
      <div class="project-card-content ion-padding">
        <ion-skeleton-text animated style="width: 40%; height: 20px"></ion-skeleton-text>
        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
    <ion-card class="ion-margin">
      <div class="project-card-content ion-padding">
        <ion-skeleton-text animated style="width: 40%; height: 20px"></ion-skeleton-text>
        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
    <ion-card class="ion-margin">
      <div class="project-card-content ion-padding">
        <ion-skeleton-text animated style="width: 40%; height: 20px"></ion-skeleton-text>
        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
    <ion-card class="ion-margin">
      <div class="project-card-content ion-padding">
        <ion-skeleton-text animated style="width: 40%; height: 20px"></ion-skeleton-text>
        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label style="display: flex; flex-direction: row; align-items: center;"><ion-skeleton-text animated style="width: 14px; height: 16px; margin-right: 4px;"></ion-skeleton-text> left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
  </div>

  <div v-if="!loading && projects.length === 0" class="no-project-text base-padding">
    <p>You dont have any project added<br />Add a new project by tapping on the plus sign button below ↓</p>
  </div>
  <div v-if="!loading && projects.length !== 0">
    <ion-card v-for="(project, i) in projects" :key="i" class="ion-margin" button :router-link="`/tabs/tab1/${project.$id}`">
      <div class="project-card-content ion-padding">
        <ion-card-title class="project-card-title">
          {{ project.name }}
        </ion-card-title>

        <div class="project-card-chip">
          <ion-chip color="success">
            <ion-label>{{ project.tasks.filter((task) => task.status === 1).length }} done</ion-label>
          </ion-chip>
          <ion-chip color="tertiary">
            <ion-label>{{ project.tasks.filter((task) => task.status === 0).length }} left</ion-label>
          </ion-chip>
        </div>
      </div>
    </ion-card>
  </div>

</template>

<script>
import {
  IonCard,
  IonCardTitle,
  IonChip,
  IonLabel,
  IonSkeletonText
} from '@ionic/vue';

export default ({
  components: {
    IonCard,
    IonCardTitle,
    IonChip,
    IonLabel,
    IonSkeletonText
  },
  data() {
    return {
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    projects() {
      return this.$store.state.projects
    }
  }
});
</script>

<style scoped>
.project-card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.project-card-chip {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
}
.project-card-title {
  padding-right: 10px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.no-project-text {
  line-height: 21px;
}
</style>