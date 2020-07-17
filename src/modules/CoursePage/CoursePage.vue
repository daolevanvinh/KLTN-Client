<template>
  <div style="margin-bottom: 10rem">
    <div v-if="!guestCourseDetailLoading">
      <div class="row" id="stickyInfo" style="background: #29303b;position: relative;">
        <div class="col-7" id="DetailSubject">
          <h3>{{guestCourseDetailObject.name}}</h3>
          <p style="color:white">Author:&nbsp;{{guestCourseDetailObject.instructor.name}}</p>
        </div>
        <div class="my-card-container">
          <img :src="courseURL" />
          <div class="container">
            <div class="row">
              <div class="col-12" style="text-align: center;">
                <h4>
                  <span
                    style="color:red"
                    v-if="guestCourseDetailObject.price_tier.priceTier_id!=0"
                  >{{guestCourseDetailObject.price_tier.priceTier.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</span>
                  <span v-else style="color:red">Free</span>
                </h4>
              </div>
            </div>
            <v-app>
              <v-btn
                height="3rem"
                v-if="guestCourseDetailObject.price_tier.priceTier_id!=0"
                :loading="userCourseListCartLoading"
                style="background-color:#ec5252;color:white"
                @click="addToCart()"
              >Add To Cart</v-btn>
              <v-btn
                height="3rem"
                v-else
                style="background-color:#ec5252;color:white"
                :loading="userCourseListCartLoading"
                @click="addToCart()"
              >Add To Your Courses</v-btn>
              <router-link
                style="height: 3rem;border: 1px solid;padding-top: 0.7rem"
                class="btn-outline-default btn"
                :to="{name: 'cart-page'}"
              >Go To Cart</router-link>
            </v-app>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-7 offset-1" style="padding-left: 0">
          <div id="content-container">
            <h3>What you'll learn</h3>
            <div class="row">
              <div
                class="col-6"
                v-for="(learn,index ) in guestCourseDetailObject.what_you_learn"
                :key="index"
              >
                <span>
                  <i class="fas fa-check"></i>
                  {{learn.learn}}
                </span>
              </div>
            </div>
          </div>

          <div id="description-container">
            <h2>Description</h2>
            <div
              class="my-align"
              :class="{'miniContent' : !descriptionMore}"
              v-html="guestCourseDetailObject.description"
            ></div>
            <div class="text-center" style="margin-top: 1rem;">
              <a
                style="color: black;cursor:pointer"
                v-if="!descriptionMore"
                @click="descriptionMore = true"
              >
                <b>Xem Thêm</b>
              </a>
            </div>
            <hr />
          </div>

          <div>
            <h3 style="margin-bottom: 1rem">Course Content</h3>
            <span>{{guestCourseDetailObject.chapterList.length}} chapter • {{guestCourseDetailObject.totalDurations}} total length</span>
            <div
              @click="moreContentTable = !moreContentTable"
              style="background: #fbfbf8;padding: 1rem;border: 1px solid #8F8E8D;cursor: pointer"
            >
              <span v-if="moreContentTable == true">
                <v-icon>mdi-chevron-up</v-icon>
              </span>
              <span v-if="moreContentTable == false">
                <v-icon>mdi-chevron-down</v-icon>
              </span>
              <span style="margin-left: 1rem;font-size: 18px">
                <b>Fundamentals of coaching</b>
              </span>
              <span style="float:right">
                <span>{{guestCourseDetailObject.chapterList.length}}&nbsp;chapter&nbsp;•&nbsp;</span>
                <span>{{guestCourseDetailObject.totalDurations}}&nbsp;total length</span>
              </span>
            </div>
            <div
              v-if="moreContentTable"
              style="padding: 1rem;border: 1px solid #8F8E8D;border-top: none;"
            >
              <div
                style="margin-top: -0.5rem"
                v-for="(chapter,index) in guestCourseDetailObject.chapterList"
                :key="index"
              >
                <div
                  v-if="chapter.lessonList.length > 0"
                  class="my-chapter-title"
                  v-b-toggle="'chapter'+index"
                >
                  •&nbsp;
                  <span>{{chapter.text}}</span>
                  <span style="float:right">{{chapter.duration}}</span>
                </div>
                <b-collapse
                  style="margin-top: -1rem"
                  class="content-lesson-item"
                  :id="'chapter'+index"
                >
                  <div v-for="(lesson,index2) in chapter.lessonList" :key="index2">
                    <div
                      @click="watchPreview(lesson)"
                      class="havePreview"
                      v-if="lesson.havePreview==1"
                    >
                      <div>
                        <v-icon size="20" style="margin-right: 0.5rem">mdi-play-circle</v-icon>
                      </div>
                      <div class="lesson-title">{{lesson.title}}</div>
                      <div style="position: absolute;right: 1.2rem;top: 0.2rem">
                        <i>{{lesson.duration}}</i>
                      </div>
                    </div>
                    <div v-else class="noPreview">
                      <div>
                        <v-icon size="20" style="margin-right: 0.5rem">mdi-play-circle</v-icon>
                      </div>
                      <div class="lesson-title">{{lesson.title}}</div>
                      <div style="position: absolute;right: 1.2rem;top: 0.2rem">
                        <i>{{lesson.duration}}</i>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>

          <div id="introduce-container">
            <div class="row" style="margin-bottom:0">
              <div class="col-3">
                <img
                  :src="ImageURL"
                  class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                  alt
                />
                <div>
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
                <div>
                  <b>
                    <v-icon size="22">mdi-play-circle</v-icon>&nbsp;
                    <span
                      v-if="guestCourseDetailObject.instructor.ins_courses!=null"
                    >{{guestCourseDetailObject.instructor.ins_courses.length}}</span>
                    <span v-else>0</span>
                  </b>
                  &nbsp;Course
                </div>
              </div>
              <div class="col-9" style="padding-left: 0">
                <h3>
                  <router-link
                    :to="{name: 'profile-view-page', params: {app_id: guestCourseDetailObject.instructor.app_id}}"
                  >{{guestCourseDetailObject.instructor.name}}</router-link>
                </h3>
                <div class="ql-editor">
                  <div
                    style="margin-left: -1rem;"
                    class="my-align"
                    :class="{'miniContent' : !authorMore}"
                    v-html="guestCourseDetailObject.instructor.profile"
                  ></div>
                </div>
                <div class="text-center">
                  <a
                    style="color: black;cursor:pointer"
                    v-if="!authorMore"
                    @click="authorMore = true"
                  >
                    <b>Xem Thêm</b>
                  </a>
                </div>
              </div>
            </div>
            <hr style="margin-top: -0.5rem" />
          </div>
          <div class="recommend-container">
            <h3 v-if="guestCourseDetailObject.top5.length > 0">Students also bought</h3>
            <div
              class="reccommend-item"
              v-for="(course, i) in guestCourseDetailObject.top5"
              :key="i"
            >
              <RecommendItem
                @openLoginModal="openLoginModal"
                :course="course"
                @changeItem="changeItem"
              ></RecommendItem>
            </div>
            <button v-b-modal.login-modal id="openLoginModal"></button>
          </div>
          <div class="review-container">
            <h3>Student feedback</h3>
            <div class="row">
              <div class="col-3">
                <h1 class="text-center">{{avgStar}}</h1>
                <StarRating
                  style="width: 80%;margin: 1rem 10%;margin-left: 15%;"
                  :star-size="20"
                  :increment="0.1"
                  :show-rating="false"
                  :rating="avgStar"
                  :read-only="true"
                ></StarRating>
                <p class="text-center">Average</p>
              </div>
              <div class="col-9">
                <div
                  class="row"
                  v-for="i in 5"
                  :key="i"
                  :class="activeProgress == i || activeProgress==-1 ? 'active' : 'unactive' "
                  style="cursor: pointer"
                >
                  <div class="col-8" @click="getCommentListByStar(i)">
                    <v-app>
                      <v-progress-linear
                        :value="perCentStar(i)"
                        color="#8a92a3"
                        height="20"
                        reactive
                      >
                        <template v-slot="{ value }">
                          <strong>{{ (value) }}%</strong>
                        </template>
                      </v-progress-linear>
                    </v-app>
                  </div>
                  <div class="col-3" @click="getCommentListByStar(i)">
                    <StarRating
                      style="margin-top: -0.5rem"
                      :star-size="20"
                      :show-rating="false"
                      :rating="i"
                      :perCentStar="i"
                      :read-only="true"
                    ></StarRating>
                  </div>
                  <div class="col-1">
                    <v-icon
                      v-if="activeProgress == i"
                      @click="closeSelectStar()"
                      style="margin-top: -0.5rem;cursor:pointer"
                    >mdi-close</v-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3" style="padding-top: 1.5rem">
                <h5>Reviews</h5>
              </div>
              <div class="col-5 offset-4">
                <v-spacer></v-spacer>
                <v-app>
                  <v-text-field
                    @keyup="searchKeyWord"
                    v-model="search"
                    dense
                    outlined
                    label="Search"
                  ></v-text-field>
                </v-app>
              </div>
            </div>
            <hr style="margin-top: -0.5rem;" />
            <div v-if="commentList==null || commentList.length == 0">
              <h3 class="text-center">There is no preview!</h3>
            </div>
            <div v-for="(comment, i) in commentList" :key="i">
              <div class="row" style="margin-top: -1rem">
                <div class="col-4">
                  <div class="row">
                    <div class="col-4">
                      <b-avatar v-if="comment.author.social_id != 0" :src="comment.author.avatar"></b-avatar>
                      <b-avatar v-else :src="avatarURL+'/'+comment.author.user_id+'/avatar.png'"></b-avatar>
                    </div>
                    <div class="col-8" style="padding-left: 0">
                      <div>
                        <b>{{comment.author.name}}</b>
                      </div>
                      <div>
                        <i>{{comment.updated_at.slice(0, 10)}}</i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div style="margin-top: 0.6rem;margin-bottom: 1rem">
                    <StarRating
                      :star-size="20"
                      :increment="0.1"
                      :show-rating="false"
                      :rating="comment.rating_value"
                      :read-only="true"
                    ></StarRating>
                  </div>
                  <div>{{comment.comment}}</div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="history-course-container">
            <div class="history-1">
              <h3 class="text-center">History</h3>
              <div class="history-2">
                <HisoryCoursePage
                  @changeItem="changeItem"
                  v-for="(course,index) in historyCourseList"
                  :course="course"
                  :key="index"
                ></HisoryCoursePage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center" style="width: 100%;padding: 4rem 0;">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </div>
    <v-dialog dark v-model="previewDialog" width="650">
      <v-card style="padding: 1rem">
        <v-icon style="float: right" @click="previewDialog=false;previewLink =null">mdi-close-thick</v-icon>
        <div>Course Preview</div>
        <h3>{{currentPreviewLesson.title}}</h3>
        <!-- <b-embed
          v-if="previewLink!=null"
          type="iframe"
          aspect="16by9"
          :src="previewLink"
          allowfullscreen
        ></b-embed>-->
        <videoPlayer
          :options="videoOptions"
          :configs="{ hls: true }"
        ></videoPlayer>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.all";
import apiConfig from "../../API/api.json";
import StarRating from "../../../node_modules/vue-star-rating/src/star-rating";
import RecommendItem from "../../components/RecommendItem/RecommendItem";
import HisoryCoursePage from "../../components/HistoryCoursePage/HistoryCoursePage";
import { videoPlayer } from "vue-vjs-hls";
export default {
  components: { StarRating, RecommendItem, HisoryCoursePage, videoPlayer },
  data() {
    return {
      previewVideoURL: apiConfig.uploadsURL,
      moreContentTable: true,
      ImageURL: "",
      courseURL: "",
      avatarURL: apiConfig.avatarURL,
      activeProgress: -1,
      descriptionMore: false,
      authorMore: false,
      commentList: [],
      search: "",
      countValueStar: [],
      totalStars: 0,
      avgStar: 0,
      instructorAVGStar: 0,
      instructorReview: 0,
      previewLink: null,
      previewDialog: false,
      currentPreviewLesson: {},
      videoOptions: {
        source: {
          type: "application/x-mpegURL",
          src: "",
          withCredentials: false
        },
        live: true
      }
    };
  },
  watch: {
    "$route.params.id": function() {
      this.loadCourseDetail();
    }
  },
  created() {
    this.loadCourseDetail();
    this.$store.commit("updateHistoryCourseList");
    this.$store.commit("ShowHeaderUser");
    this.$store.commit("ShowFooterUser");
  },
  methods: {
    watchPreview(lesson) {
      this.videoOptions.source.src =
        this.previewVideoURL +
        "/" +
        lesson.lesson_id +
        "/" +
        lesson.lesson_id +
        ".m3u8";
      this.currentPreviewLesson = lesson;
      this.previewDialog = true;
    },
    openLoginModal() {
      document.getElementById("openLoginModal").click();
    },
    loadCourseDetail() {
      let vm = this;
      this.$store
        .dispatch("guestGetCourseDetail", this.$route.params.id)
        .then(response => {
          if (response.data.RequestSuccess == false) {
            this.$router.push({ name: "not-found-page" });
          }
          if (this.guestCourseDetailObject.instructor.social_id == 0) {
            this.ImageURL =
              apiConfig.avatarURL +
              "/" +
              this.guestCourseDetailObject.instructor.user_id +
              "/avatar.png";
          } else {
            this.ImageURL = this.guestCourseDetailObject.instructor.avatar;
          }
          this.courseURL =
            apiConfig.imageURL +
            "/" +
            this.guestCourseDetailObject.course_id +
            "/" +
            this.guestCourseDetailObject.course_id +
            ".png";
          this.countValueStar = [];
          this.descriptionMore = false;
          this.authorMore = false;
          this.totalStars = 0;
          vm.handleForInstructor();
          vm.handlStar();
          vm.closeSelectStar();
          vm.addHistory();
        });
    },
    addHistory() {
      let history = [];
      let flag = false;
      if (localStorage.historyCourseList) {
        history = JSON.parse(localStorage.historyCourseList);
        history.forEach(course => {
          if (course.course_id == this.guestCourseDetailObject.course_id) {
            flag = true;
          }
        });
      }
      if (!flag) {
        let course = {};
        course.course_id = this.guestCourseDetailObject.course_id;
        course.name = this.guestCourseDetailObject.name;
        course.description = this.guestCourseDetailObject.description;
        course.author = this.guestCourseDetailObject.instructor.name;
        course.rating = this.avgStar;
        if (this.guestCourseDetailObject.course_comment)
          course.commentCount = this.guestCourseDetailObject.course_comment.length;
        else course.commentCount = 0;
        course.priceTier = this.guestCourseDetailObject.price_tier.priceTier;
        course.whatLearn = this.guestCourseDetailObject.what_you_learn;
        course.topicEnable = this.guestCourseDetailObject.topics_enable;
        history.push(course);
        localStorage.historyCourseList = JSON.stringify(history);
        this.$store.commit("updateHistoryCourseList");
      }
    },
    changeItem(course_id) {
      this.$router.push({
        name: "course-detail-page",
        params: { id: course_id }
      });
      this.loadCourseDetail();
    },
    getCommentListByStar(index, flag) {
      if (index != -1) {
        this.activeProgress = index;
        this.currentIndexStar = index;
        let tempList = this.guestCourseDetailObject.course_comment;
        this.commentList = [];
        if (tempList != null && tempList.length > 0) {
          let star = index;
          tempList.forEach(comment => {
            if (comment.rating_value == star) {
              this.commentList.push(comment);
            }
          });
        }
        if (flag == null) this.search = "";
      } else {
        this.closeSelectStar(flag);
      }
    },
    closeSelectStar(flag) {
      this.activeProgress = -1;
      this.commentList = [];
      this.commentList = this.guestCourseDetailObject.course_comment;
      if (flag == null) this.search = "";
    },
    handlStar() {
      let tempList = this.guestCourseDetailObject.course_comment;
      this.totalStars = 0;
      if (tempList != null && tempList.length > 0) {
        tempList.forEach(comment => {
          if (this.countValueStar[comment.rating_value] != null) {
            this.countValueStar[comment.rating_value]++;
          } else {
            this.countValueStar[comment.rating_value] = 1;
          }
          this.totalStars += comment.rating_value;
        });
        this.avgStar = this.totalStars / tempList.length;
      } else {
        this.totalStars = 0;
        this.avgStar = 0;
      }
    },
    perCentStar(index) {
      if (
        this.countValueStar[index] != null &&
        this.guestCourseDetailObject != null &&
        this.guestCourseDetailObject.course_comment != null
      ) {
        let perCent =
          (this.countValueStar[index] /
            this.guestCourseDetailObject.course_comment.length) *
          100;
        return Math.floor(perCent);
      } else return 0;
    },
    searchKeyWord() {
      if (this.search != "" && this.commentList != null) {
        this.getCommentListByStar(this.activeProgress, 1);
        let tempList = [];
        for (let i = 0; i < this.commentList.length; i++) {
          let str1 = this.commentList[i].comment.toLowerCase();
          let str2 = this.search.toLowerCase();
          if (str1.includes(str2)) {
            tempList.push(this.commentList[i]);
          }
        }
        this.commentList = tempList;
      } else {
        this.getCommentListByStar(this.activeProgress);
      }
    },
    handleForInstructor() {
      let instructor = this.guestCourseDetailObject.instructor;
      if (instructor != null) {
        let courses = instructor.ins_courses;
        if (courses != null) {
          let sumReview = 0;
          let sumStar = 0;
          courses.forEach(course => {
            if (course.course_comment != null) {
              sumReview += course.course_comment.length;
              let tempStar = 0;
              course.course_comment.forEach(comment => {
                tempStar += comment.rating_value;
              });
              sumStar += tempStar;
            }
          });
          this.instructorReview = sumReview;
          sumReview === 0
            ? (this.instructorAVGStar = 0)
            : (this.instructorAVGStar = Math.floor(sumStar / sumReview));
        }
      }
    },
    addToCart() {
      this.$store
        .dispatch("userAddToCart", this.guestCourseDetailObject.course_id)
        .then(response => {
          let icon = "";
          response.data.RequestSuccess ? (icon = "success") : (icon = "error");
          this.$swal({
            icon: icon,
            title: response.data.msg
          });
        });
    }
  },
  computed: {
    ...mapGetters({
      guestCourseDetailObject: "guestCourseDetailObject",
      guestCourseDetailLoading: "guestCourseDetailLoading",
      historyCourseList: "historyCourseList",
      userCourseListCartLoading: "userCourseListCartLoading"
    })
  }
};
</script>

<style lang="scss" scoped>
.my-align {
  text-align: justify;
}

.history-course-container {
  position: relative;
  margin-top: 22rem;
  height: 85%;
  .history-1 {
    position: sticky;
    top: 0.5rem;
    .history-2 {
      position: relative;
      margin-left: 2.8rem;
      width: 75%;
      border: 1px solid silver;
      max-height: 35rem;
      overflow-y: auto;
    }
  }
}

.hight-ligh-text-comment {
  color: yellowgreen;
  background-color: yellow;
}

.miniContent {
  height: 10rem;
  overflow: hidden;
}

.recommend-container {
  margin: 2rem 0;
  width: 100%;
  .reccommend-item {
    padding: 0 1rem;
    position: relative;
    border-bottom: 1px solid silver;
    cursor: pointer;
    &:hover {
      background-color: #c2deff;
    }
  }
}
.active {
  opacity: 1;
}

.unactive {
  opacity: 0.5;
}

.review-container {
  margin: 1rem 0;
  width: 100%;
  padding: 1rem;
}
.ratingHover {
  opacity: 0.35;
}
#content-container {
  margin: 2rem 0;
  background: #f9f9f9;
  width: 100%;
  border: 1px solid silver;
  padding: 1rem;
  .row {
    padding-top: -0.5rem;
    .col-6 {
      margin-top: 1rem;
    }
  }
}
#introduce-container {
  margin: 2rem 0;
  width: 100%;
  .row {
    .col-3 {
      img {
        border-radius: 50%;
        width: 100px;
      }
    }
  }
}
#description-container {
  margin: 1rem 0;
  width: 100%;
  p {
    font-size: 12pt;
  }
  h2 {
    margin-top: 2rem;
  }
}

.my-chapter-title {
  margin: 1rem;
  padding: 0.2rem;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    background-color: whitesmoke;
  }
}
.content-lesson-item {
  margin-left: -1rem;

  .havePreview {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 0.5rem 0.5rem;
    padding-left: 3rem;
    display: grid;
    grid-template-columns: 5% 75% 15%;
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
    .lesson-title {
      margin-top: -0.2rem;
      color: #3084eb;
      font-weight: 400;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .noPreview {
    position: relative;
    font-size: 14px;
    padding: 0.5rem 0.5rem;
    padding-left: 3rem;
    display: grid;
    grid-template-columns: 5% 85% 10%;
    .lesson-title {
      margin-top: -0.2rem;
      word-break: keep-all;
    }
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
  }
}

.my-card-container {
  position: absolute;
  z-index: 3;
  right: 5rem;
  top: 5rem;
  background-color: white;
  width: 20rem;
  border: solid 0.5px rgb(194, 187, 186);
  border-radius: 5px;
  img {
    border: none;
    border-radius: 3px;
    width: 100%;
    height: 12rem;
  }
  button {
    width: 100%;
    margin-bottom: 0.5rem;
    height: 3rem;
  }
}

// span:hover {
//   display: block;
//   background-color: yellow;
// }
#DetailSubject {
  text-align: left;
  margin-left: 10%;
  width: 50%;
  padding: 2rem;
}

#DetailSubject h3 {
  margin-bottom: 1rem;
  color: #f7f8f8;
  font-family: open sans, helvetica neue, Helvetica, Arial, sans-serif;
}
#DetailSubject h2 {
  color: #f7f8f8;
  font-size: 14pt;
  height: 1rem;
  font-family: open sans, helvetica neue, Helvetica, Arial, sans-serif;
}

body {
  padding: 2rem 0rem;
}

.like {
  font-size: 1.5rem;
}

button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
.checked {
  color: orange;
}
#icon-heart-unactive {
  color: #3291a6;
}
#icon-heart {
  color: red;
  &:hover {
    color: #3291a6;
  }
}
</style>