<template>
  <div>
    <v-app>
      <div class="profile-container">
        <h3 v-if="!guestProfileViewLoading">Tổng quan về tôi</h3>
        <div v-if="guestProfileViewLoading">
          <v-skeleton-loader type="heading" tile boilerplate></v-skeleton-loader>
        </div>
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <div
              v-if="!guestProfileViewLoading"
              class="ql-editor"
              :class="{'short-profile' : shortProfile}"
            >
              <div v-html="guestProfileViewObject.profile"></div>
            </div>
            <div v-if="guestProfileViewLoading">
              <v-skeleton-loader type="paragraph" boilerplate tile></v-skeleton-loader>
              <v-skeleton-loader type="paragraph" boilerplate tile></v-skeleton-loader>
            </div>
            <div style="margin: 1rem 0;" class="text-left">
              <a href="#" v-if="shortProfile" @click="shortProfile = false">Xem thêm</a>
            </div>
            <div class="row" v-if="!loading && !guestProfileViewLoading">
              <div
                id="itemContainer"
                class="col-md-6 col-sm-12 item-container"
                v-for="(course, index) in courseList"
                :key="index"
              >
                <router-link
                  :id="'scroll'+index"
                  :to="{name: 'course-detail-page', params: { id: course.course_id }}"
                >
                  <img
                    :src="ImgCourseURL + '/'+course.course_id+'/'+course.course_id+'.png'"
                    style="width: 80%;height: 10rem;border-radius: 5px"
                  />
                  <div style="font-size: 15px">
                    <b>{{formatString(course.name)}}</b>
                  </div>
                  <div style="font-size:14px;color: #8C8784">{{course.instructor.name}}</div>
                  <div class="my-rating">
                    <div style=";color: #ECA818;margin-top: -0.05rem">
                      <b>{{avgStar(course)}}</b>
                    </div>
                    <div>
                      <StarRating
                        style="width: 80%;"
                        :inline="true"
                        :star-size="20"
                        :increment="0.1"
                        :show-rating="false"
                        :rating="avgStar(course)"
                        :read-only="true"
                      ></StarRating>
                    </div>
                    <div
                      style="margin-top: -0.1rem;margin-left: 0.5rem"
                    >({{course.course_comment.length}})</div>
                  </div>
                  <p style="font-size: 18px">
                    <b>
                      <span
                        v-if="course.price_tier.priceTier > 0"
                      >{{course.price_tier.priceTier.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</span>
                      <span v-else style="color: red">Free</span>
                    </b>
                  </p>
                </router-link>
              </div>
            </div>
            <div class="row" v-if="loading || guestProfileViewLoading">
              <div class="col-md-6 col-sm-12" v-for="i in 8" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
              </div>
            </div>
            <div class="text-center">
              <b-pagination
                pills
                :total-rows="guestProfileViewList.length"
                :per-page="perPage"
                v-model="currentPage"
                @change="paginationFunction()"
              ></b-pagination>
            </div>
          </div>
          <div class="col-md-3 col-sm-12">
            <div v-if="!guestProfileViewLoading">
              <img style="width: 100%; height: 10rem" :src="ImageURL" />
              <div style="margin-top: 1rem">
                <b>
                  <v-icon size="22">mdi-star</v-icon>
                  &nbsp;{{instructorAVGStar}}
                </b>&nbsp; Instructor rating
              </div>

              <div>
                <b>
                  <v-icon size="22">mdi-chat</v-icon>
                  &nbsp;{{instructorReview}}
                </b>&nbsp; Reviews
              </div>
            </div>
            <div v-if="guestProfileViewLoading">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </div>
          </div>
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apiConfig from "../../API/api.json";
import StarRating from "../../../node_modules/vue-star-rating/src/star-rating";
export default {
  components: { StarRating },
  data() {
    return {
      ImageURL: "",
      ImgCourseURL: apiConfig.imageURL,
      instructorAVGStar: 0,
      instructorReview: 0,
      shortProfile: true,
      currentPage: 1,
      perPage: 10,
      courseList: [],
      changePage: false,
      loading: false
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    "$route.params.app_id": function() {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("guestGetProfileView", this.$route.params.app_id)
        .then(response => {
          if (response.data.RequestSuccess === true) {
            if (this.guestProfileViewObject.social_id == 0) {
              this.ImageURL =
                apiConfig.avatarURL +
                "/" +
                this.guestProfileViewObject.user_id +
                "/avatar.png";
            } else {
              this.ImageURL = this.guestProfileViewObject.avatar;
            }
          } else {
            this.$router.push({ name: "not-found-page" });
          }
          this.handleForInstructor();
          this.paginationFunction();
        });
    },
    handleForInstructor() {
      let instructor = this.guestProfileViewObject;
      if (instructor != null) {
        let courses = this.guestProfileViewList;
        if (courses != null) {
          let sumReview = 0;
          let sumStar = 0;
          courses.forEach(course => {
            if (
              course.course_comment != null &&
              course.course_comment.length > 0
            ) {
              sumReview += course.course_comment.length;
              let tempStar = 0;
              course.course_comment.forEach(comment => {
                tempStar += comment.rating_value;
              });
              sumStar += tempStar;
            }
          });
          this.instructorReview = sumReview;
          sumReview == 0
            ? (this.instructorAVGStar = 0)
            : (this.instructorAVGStar = Math.floor(sumStar / sumReview));
        }
      }
    },
    avgStar(course) {
      let comments = course.course_comment;
      let avgStar = 0;
      if (comments.length > 0) {
        comments.forEach(comment => {
          avgStar += comment.rating_value;
        });
        return Math.floor(avgStar / comments.length);
      }
      return avgStar;
    },
    formatString(string) {
      if (string.length > 30) {
        return string.substring(0, 30) + "...";
      } else return string;
    },
    paginationFunction() {
      let vm = this;
      this.loading = true;
      setTimeout(() => {
        if (vm.changePage == false) {
          vm.courseList = [];
          let start = (vm.currentPage - 1) * vm.perPage;
          if (vm.currentPage == 1) start = 0;
          vm.courseList = vm.guestProfileViewList.slice(
            start,
            start + vm.perPage
          );
        }
      }, 100);
      setTimeout(() => {
        vm.loading = false;
      }, 500);
    }
  },
  computed: {
    ...mapGetters({
      guestProfileViewObject: "guestProfileViewObject",
      guestProfileViewList: "guestProfileViewList",
      guestProfileViewLoading: "guestProfileViewLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
@import "../../../node_modules/vue2-editor/dist/vue2-editor.css";
@import "../../../node_modules/quill/dist/quill.snow.css";

.short-profile {
  overflow: hidden;
  max-height: 15rem;
}
.profile-container {
  width: 70%;
  margin: 2rem 15%;
}
.item-container {
  .my-rating {
    display: grid;
    grid-template-columns: 5% 30% 5%;
  }
  a {
    color: black;
    text-decoration: none;
    &:hover {
      color: black;
      text-decoration: none;
    }
  }
  &:hover {
    img {
      filter: brightness(70%);
    }
  }
}
</style>