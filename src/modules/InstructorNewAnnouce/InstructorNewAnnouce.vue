<template>
  <div>
    <v-card>
      <v-card-title class="headline">Tạo thông báo mới</v-card-title>
      <div class="my-container">
        <div class="row">
          <div class="col-2">
            <label>Khóa học:&nbsp;</label>
          </div>
          <div class="col-5">
            <v-select
              v-model="course_id"
              class="my-combobox"
              :items="userChannelCourseList"
              :loading="userChannelLoading"
            ></v-select>
          </div>
          <div class="col-1 offset-4">
            <v-app>
              <v-btn color="red" @click="send()" outlined>Gửi</v-btn>
            </v-app>
          </div>
        </div>
        <VueEditor class="my-editor" v-model="text"></VueEditor>
        <div></div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
export default {
  components: { VueEditor },
  data() {
    return {
      course_id: '',
      text: ''
    };
  },
  created() {
    this.$store.dispatch("userGetChannelCourseList");
  },
  methods: {
    send() {
      if (this.course_id == "") {
        this.$swal({
          icon: "error",
          title: "Chưa chọn khóa học!"
        });
      } else {
        this.$swal.showLoading()
        this.$store.dispatch("userSendAnnouce", {
            course_id: this.course_id,
            text: this.text
        }).then((response) => {
            let icon = ''
            response.data.RequestSuccess ? icon = 'success' : icon = 'error'
            this.$swal({
                icon: icon,
                title: response.data.msg
            })
            this.$router.push({name: 'ins-annouce-page'})
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      userChannelCourseList: "userChannelCourseList",
      userChannelLoading: "userChannelLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
.my-container {
  padding: 1rem;
  .my-combobox {
    width: 20rem !important;
    margin-top: -1.5rem;
  }
}
</style>