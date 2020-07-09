<template>
  <div>
    <h3>Annoucement List</h3>
    <v-btn color="primary" style="margin: 0.5rem 0" @click="openNewAnnouce()">Create new</v-btn>
    <v-data-table
      :items-per-page="10"
      :headers="header"
      :items="userAnnouceList"
      :loading="userAnnouceLoading"
    >
      <template v-slot:item.text="data">
        <div class="my-annouce">
          <div v-html="(data.item.text)"></div>
        </div>
      </template>
      <template v-slot:item.name="data">{{formatString(data.item.name)}}</template>
      <template v-slot:item.action="data">
        <v-btn
          color="red"
          outlined
          small
          @click="textDialog=true;text=data.item.text;courseName=data.item.name"
        >Detail</v-btn>
      </template>
    </v-data-table>
    <v-dialog width="1000" v-model="textDialog">
      <v-card width="1000" min-height="10rem" style="padding: 1rem">
        <v-icon style="float: right" @click="textDialog=false;text =''">mdi-close-thick</v-icon>
        <p><b>{{courseName}}</b></p>
        <div v-html="text"></div>
      </v-card>
    </v-dialog>
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
      courseName: "",
      text: "",
      textDialog: false,
      header: [
        { value: "name", text: "Course Name", width: "15%" },
        { value: "text", text: "Content", width: "45%" },
        { value: "updated_at", text: "At Time", width: "20%" },
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
.text-dialog {
  min-height: 10rem !important;
}
.my-annouce {
  max-height: 1rem !important;
  overflow: hidden;
}
</style>