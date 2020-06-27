<template>
  <div style="margin: 0 0.5rem">
    <v-menu open-on-hover offset-y :close-on-click="false" :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <button class="hover-button" v-on="on">
          <v-badge
            v-if="stuAnnouceList!=null && stuAnnouceList.length > 0"
            color="pink"
            :content="stuAnnouceList.length"
            :close-on-click="false"
            :close-on-content-click="false"
          >
            <v-icon style="color:black" size="20">mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else style="color:black" size="20">mdi-bell</v-icon>
        </button>
      </template>
      <v-card class="my-card" width="300">
        <div v-for="(annouce,index) in stuAnnouceList" :key="index">
          <div @click="goTab(annouce)" v-if="index < 4" class="annouce-item">
            <div class="course-name">
              <strong>Khóa học: {{formatString(annouce.name)}}</strong>
            </div>
            <div class="my-annouce">
              <div v-html="annouce.text"></div>
            </div>
          </div>
        </div>
        <div style="margin-top: 1rem;width:100%">
          <button
            style="width:100%;"
            class="btn btn-info"
            @click="moreAnnouce()"
            v-if="stuAnnouceList != null && stuAnnouceList.length > 3"
          >Xem thêm</button>
          <h5
            v-if="(stuAnnouceList == null || stuAnnouceList.length==0)"
            class="text-center"
          >Danh sách rỗng!</h5>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userUserInfo: "userUserInfo",
      userUserInfoLoading: "userUserInfoLoading",
      userCourseLikeList: "userCourseLikeList",
      userCourseLikeLoading: "userCourseLikeLoading",
      stuAnnouceList: "stuAnnouceList",
      stuAnnouceLoading: "stuAnnouceLoading"
    })
  },
  created() {
    this.$store.dispatch("studentGetAnnouce");
  },
  methods: {
    formatString(string) {
      if (string.length > 30) return string.slice(0, 30) + "...";
      else return string;
    },
    goTab(annouce) {
      if (this.$route.name == "lesson-page") {
        this.$router.replace({ query: { annouce: annouce.annouce_id } });
        
      } else {
        this.$router.push({
          name: "lesson-page",
          params: { id: annouce.course_id },
          query: { annouce: annouce.annouce_id }
        });
      }
    },
    moreAnnouce() {
      this.$store.commit("changeTab", "annouce-tab");
      if (this.$route.name != "my-page") {
        this.$router.push({ name: "my-page" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.my-card {
  min-height: 6rem !important;
  padding: 0.7rem 0.5rem;
}
.hover-button {
  width: 2.5rem;
  height: 2.5rem;
  padding-top: 0rem;
  border-radius: 50%;
  &:hover {
    background-color: #ece8e8;
  }
  &:focus {
    outline: none;
  }
}
.annouce-item {
  cursor: pointer;
  padding: 0.7rem 0.5rem;
  border: 1px solid rgb(219, 214, 214);
  opacity: 0.8;
  &:hover {
    background-color: #e9f9f3;
    opacity: 1;
    font-weight: bolder;
  }
}

.my-annouce {
  max-height: 2rem !important;
  overflow: hidden;
}

.course-name {
  max-width: 100%;
  text-overflow: ellipsi;
}
</style>