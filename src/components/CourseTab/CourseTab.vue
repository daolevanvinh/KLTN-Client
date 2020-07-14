<template>
  <div>
    <v-tab-item value="course-tab">
      <div style="margin-right: 2rem;">
        <div class="row" v-if="userStudentCourseLoading">
          <div class="col-3" v-for="i in 4" :key="i">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-3" v-for="(course, index) in userStudentCourseList" :key="index">
            <ItemMyPage @courseComment="courseComment" :course="course"></ItemMyPage>
          </div>
        </div>
      </div>
    </v-tab-item>
    <v-dialog persistent v-model="dialogComment">
      <v-card style="padding: 1rem">
        <div class="row" style="margin:0">
          <div class="col-4">
            <img
              width="100%"
              height="100%"
              :src="imageURL+'/'+courseSelected.course_id+'/'+courseSelected.course_id+'.png'"
              alt="image"
            />
          </div>
          <div class="col-8">
            <h4>Enter your comment about this course</h4>
            <h3>
              <b>{{courseSelected.name}}</b>
            </h3>
            <StarRating v-model="comment.rating_value" :star-size="30"></StarRating>
            <v-textarea v-model="comment.comment" outlined label="comment" style="margin-top: 1rem"></v-textarea>
          </div>
        </div>
        <v-card-actions>
          <hr />
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="commentFunction()">Save</v-btn>
          <v-btn color="red" style="color: white" @click="setDefault()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="loading" width="200">
      <v-card style="padding: 1rem">In progressing...</v-card>
    </v-dialog>
  </div>
</template>
<script>
import ItemMyPage from "../ItemMyPage/ItemMyPage";
import apiConfig from "../../API/api.json";
import StarRating from "../../../node_modules/vue-star-rating/src/star-rating";
import { mapGetters } from "vuex";
export default {
  components: { ItemMyPage, StarRating },
  props: ["account"],
  watch: {
    account(newVal) {
      this.account = newVal;
    }
  },
  created() {
    this.$store.dispatch("userGetStudentCourse");
  },
  data() {
    return {
      imageURL: apiConfig.imageURL,
      courseSelected: {},
      dialogComment: false,
      comment: {
        rating_value: 5,
        comment: ""
      },
      loading: false
    };
  },
  methods: {
    setDefault() {
      this.comment = {
        rating_value: 5,
        comment: ""
      };
      this.dialogComment = false;
    },
    courseComment(course) {
      this.courseSelected = course;
      this.dialogComment = true;
    },
    commentFunction() {
      this.$swal({
        icon: "question",
        title: "Are you want to comment this course?",
        showCancelButton: true
      }).then(rs => {
        if (rs.value) {
          this.loading = true;
          this.comment.course_id = this.courseSelected.course_id;
          this.$store
            .dispatch("userCourseComment", this.comment)
            .then(response => {
              let icon = "";
              response.data.RequestSuccess === true
                ? (icon = "success")
                : (icon = "error");
              this.$swal({
                icon: icon,
                title: response.data.msg
              });
              this.loading = false;
              this.setDefault();
            });
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      userStudentCourseList: "userStudentCourseList",
      userStudentCourseLoading: "userStudentCourseLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
.profile-container {
  width: 100%;
  padding: 1rem;
  border: 1px solid;
  word-break: break-all;
}
</style>