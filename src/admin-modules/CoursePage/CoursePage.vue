<template>
  <v-app>
    <v-card>
      <v-card-title>
        COURSE MANAGEMENT
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="courses"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.disable="{ item }">
          <v-checkbox v-model="item.disable" @click="unActiveItem(item)"></v-checkbox>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
import { CommonService } from "../../service/common.service";
import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.all";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Course ID",
          align: "start",
          sortable: false,
          value: "course_id"
        },
        { text: "Course name", value: "name" },
        { text: "Instructor name", value: "InstructorName" },

        { text: "Date created", value: "created_at" },
        { text: "Disable", value: "disable" }
      ],
      courses: []
    };
  },
  created() {
    this.getListCourse();
  },
  methods: {
    getListCourse() {
      this.$store.dispatch("adminGetListCourse").then(response => {
        if (response.data.errorToken === true) {
          CommonService.checkErrorToken(this, response.data.msg);
        } else {
          if (response.data.RequestSuccess === true) {
            this.courses = response.data.list;
          }
        }
      });
    },
    unActiveItem(item) {
      const index = this.courses.indexOf(item);
      if (this.courses[index].disable == 0) {
        Swal.fire({
          title: "Are you sure to disable this course",
          text: "You won't be able to revert this !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            Swal.fire("Course has been disabled !");
            var vm = this;
            this.$store
              .dispatch("adminUnactiveCourse", this.courses[index].course_id)
              .then(function(response) {
                //console.log("this ",vm.courses[index].course_id)
                vm.getListCourse();
              });
          }
        });
      } else {
        Swal.fire({
          title: "Are you sure to enable this course",
          text: "You won't be able to revert this !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            Swal.fire("Course has been enabled !");
            var vm = this;
            this.$store
              .dispatch("adminActiveCourse", this.courses[index].course_id)
              .then(function(response) {
                //console.log("this ",vm.courses[index].course_id)
                vm.getListCourse();
              });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>