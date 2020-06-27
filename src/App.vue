<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {
    let vm = this;
    this.$store.dispatch("userGetChannelList").then(() => {
      for (let channel of this.userChannelList) {
        window.Echo.channel("InstructorCourse." + channel.course_id).listen(
          "AnnoucePosted",
          data => {
            vm.$store.dispatch("studentGetAnnouce");
            vm.$store.dispatch(
              "studentGetAnnouceByCourse",
              this.$route.params.id
            );
          }
        );
      }
    });
  },
  computed: {
    ...mapGetters({
      userChannelList: "userChannelList",
      userChannelLoading: "userChannelLoading"
    })
  }
};
</script>
<style scoped>
</style>