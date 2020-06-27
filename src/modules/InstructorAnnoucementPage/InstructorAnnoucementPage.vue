<template>
  <div >
    <h3>Danh sách thông báo đã gửi</h3>
    <v-btn color="primary" style="margin: 0.5rem 0" @click="openNewAnnouce()">Tạo thông báo mới</v-btn>
    <v-data-table
      :items-per-page="10"
      :headers="header"
      :items="userAnnouceList"
      :loading="userAnnouceLoading"
    >
      <template v-slot:item.text="data">
         <div class="my-annouce"><div v-html="(data.item.text)"></div></div>
      </template>
      <template v-slot:item.name="data">{{formatString(data.item.name)}}</template>
      <template v-slot:item.action="data">
        <v-btn color="red" outlined small @click="show(data.item.text)">Chi tiết</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("userGetAnnouce").then(response => {});
  },
  data() {
    return {
      header: [
        { value: "name", text: "Khóa học", width: "15%" },
        { value: "text", text: "Nội dung", width: "45%" },
        { value: "updated_at", text: "Thời gian", width: "20%" },
        { value: "action", text: "", width: "10%" }
      ],
      dialog: false
    };
  },
  methods: {
    formatString(string) {
      if (string.length > 30) return string.slice(0, 30) + "...";
      else return string;
    },
    show(text) {
      this.$swal({
        title: text
      });
    },
    openNewAnnouce() {
      this.dialog = true;
      this.$router.push({ name: "ins-new-annouce-page" });
      this.annouce = {
        course_id: "",
        text: ""
      };
    }
  },
  computed: {
    ...mapGetters({
      userAnnouceList: "userAnnouceList",
      userAnnouceLoading: "userAnnouceLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
.my-dialog {
  height: 30rem !important;
}

.my-annouce {
  max-height: 1rem !important;
  overflow: hidden;
}
</style>