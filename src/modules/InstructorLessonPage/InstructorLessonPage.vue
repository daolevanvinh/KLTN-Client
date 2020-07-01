<template>
  <div>
    <h1>Your Lesson List</h1>
    <div style="margin-right: 1rem">
      <v-select
        :items="courseList"
        label="Select your course"
        v-model="courseSelected"
        @change="getLessons()"
      ></v-select>
      <div class="row">
        <div class="col-6">
          <v-text-field v-model="search" label="Search..."></v-text-field>
        </div>
        <div class="col-2 offset-4" style="padding-top: 1.5rem;text-align: right;padding-right:0">
          <v-btn
            color="primary"
            :disabled="courseSelected=='' || courseSelected == null"
            @click="actionDialog = true"
          >Add new Lesson</v-btn>
        </div>
      </div>
      <v-card class="mb-12" color="white" height="22rem">
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="userLessonList"
          height="25rem"
          :loading="userLessonLoading"
          :items-per-page="perPage"
          :page="currentPage"
          :search="search"
        >
          <template v-slot:item.control="data">
            <a href="#" style="margin-right: 1.5rem" @click="showDetail(data.item)">Watch Video</a>
            <a href="#" @click="deleteLesson(data.item)">Delete</a>
          </template>
          <template v-slot:no-results>
            <img
              style="margin-top:1rem"
              src="https://tiki.vn/desktop/img/account/tiki-not-found-pgae.png"
            />

            <h4 style="margin-top: 0.5rem">Empty List!</h4>
          </template>
          <template v-slot:no-data>
            <img
              style="margin-top:1rem"
              src="https://tiki.vn/desktop/img/account/tiki-not-found-pgae.png"
            />

            <h4 style="margin-top: 0.5rem">Empty List!</h4>
          </template>
          <template v-slot:item.description="data">{{formatShort(data.item.description)}}</template>
          <template v-slot:item.duration="data">{{formatHours(data.item.duration)}}</template>
        </v-data-table>
        <v-pagination
          circle
          v-model="currentPage"
          :length="(Math.ceil(userLessonList.length / perPage))"
        ></v-pagination>
      </v-card>
      <v-dialog persistent ref="dialog" v-model="dialogLessonDetail" max-width="1300">
        <v-card>
          <v-card-title class="headline">{{loadSelectedLesson.title}}</v-card-title>
          <hr />
          <div class="row" style="margin: 0">
            <div class="col-6" style="padding: 0;padding-left: 2rem">
              <div class="player-container">
                <b-embed
                  :src="videoURL + '/'+loadSelectedLesson.course_id +'/' +loadSelectedLesson.lesson_id+'.mp4'"
                  type="iframe"
                  aspect="16by9"
                  allowfullscreen
                ></b-embed>
                <!-- <VideoPlayer ref="video" :lesson="loadSelectedLesson" :options="videoOptions"></VideoPlayer> -->
              </div>
            </div>
            <div class="col-6" style="padding: 0;padding-left: 2rem">
              <div class="row" style="width: 90%;">
                <div class="col-4">
                  Lượt xem: {{loadSelectedLesson.views}}
                  <v-icon>mdi-eye</v-icon>
                </div>
                <div class="col-4">
                  Lượt bình luận: {{loadSelectedLesson.commentCount}}
                  <v-icon>mdi-chat</v-icon>
                </div>
                <div class="col-4">
                  <v-btn
                    @click="edit = true"
                    color="yellow darken-1"
                    v-if="!edit"
                    v-b-toggle.collapse-update-lesson
                  >Chỉnh sửa</v-btn>
                  <v-btn
                    v-if="edit"
                    @click="edit = false"
                    id="fix-button"
                    color="yellow darken-1"
                    v-b-toggle.collapse-update-lesson
                  >Hủy bỏ</v-btn>
                </div>
              </div>

              <b-collapse id="collapse-update-lesson" class="mt-2" style="width: 90%;">
                <v-text-field
                  v-model="updateLesson.title"
                  outlined
                  dense
                  @keydown="disableSaveUpdateButton = false"
                  label="Tiêu đề bài học"
                ></v-text-field>
                <v-textarea
                  style="margin-top :1rem"
                  v-model="updateLesson.description"
                  outlined
                  @keydown="disableSaveUpdateButton = false"
                  label="Mô tả bài học"
                  height="10rem"
                ></v-textarea>
                <v-file-input
                  id="videoUpdateInput"
                  ref="videoUpdateInput"
                  accept="video/*"
                  @change="setVideoUpdate($event); disableSaveUpdateButton = false"
                  chips
                  show-size
                  label="Video bài học"
                ></v-file-input>
              </b-collapse>
            </div>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              :disabled="disableSaveUpdateButton"
              text
              @click="fixLesson()"
            >Lưu</v-btn>
            <v-btn color="blue darken-1" text @click="closeVideoModal">Hủy</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <v-dialog v-model="actionDialog">
        <v-card width="1300" style="padding: 1rem">
          <div class="row">
            <div class="col-6">
              <v-select
                outlined
                v-model="chapterIdSelected"
                :items="chapterList"
                dense
                label="Select your chapter"
              ></v-select>
              <v-text-field
                outlined
                style="margin-top: 0.5rem"
                v-model="newLesson.title"
                dense
                label="Title"
              ></v-text-field>
              <v-textarea
                v-model="newLesson.description"
                style="margin-top: 0.5rem;max-height: 10rem"
                label="Description"
                outlined
              ></v-textarea>
            </div>
            <div class="col-6">
              <div style="text-align: right">
                <h3>Your Resourse</h3>
                <v-btn style="margin-right:0" color="primary" @click="addResourse()">More resouse?</v-btn>
              </div>
              <v-file-input
                id="videoInput"
                ref="videoInput"
                accept="video/*"
                @change="setVideo"
                chips
                show-size
                label="Video is require (Main video)"
              ></v-file-input>

              <div class="my-control-container">
                <div v-for="(item, index) in resourseList" :key="index">
                  <div class="row">
                    <div class="col-10">
                      <v-file-input
                        :id="'rs'+index"
                        :ref="'rs'+index"
                        chips
                        show-size
                        label="File is not optional"
                        @change="setResourse('rs'+index, item.id, $event)"
                      ></v-file-input>
                    </div>
                    <div class="col-2" style="padding-top: 1rem">
                      <v-icon @click="removeResourse(item)">mdi-close-outline</v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: right">
            <v-btn @click="addLesson" style="margin-right: 1rem" color="primary">Save</v-btn>
            <v-btn @click="refresh()" style="margin-right: 1rem" color="yellow">Refresh</v-btn>
            <v-btn @click="refresh();actionDialog = false" color="red">Cancel</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
//import UTF8 from "../../assets/UTF8.json"
import "../../../node_modules/vue-core-video-player/dist/vue-core-video-player.umd.js";
import apiConfig from "../../API/api.json";
// import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
export default {
  //components: { VideoPlayer },
  created() {
    this.$store.dispatch("userGetInsCourse").then(() => {
      if (this.$route.course_id != "") {
        this.courseSelected = this.$route.query.course_id;
        this.getLessons();
      }
      this.handleData();
    });
  },
  data() {
    return {
      courseSelected: "",
      items: [
        { value: "1", text: "Mới nhất" },
        { value: "2", text: "Cũ nhất" },
        { value: "3", text: "A-Z" },
        { value: "4", text: "Z-A" },
        { value: "5", text: "Miễn phí" },
        { value: "6", text: "Có phí" }
      ],
      lessonList: [],
      headers: [
        { value: "title", text: "Title", width: "20%" },
        { value: "description", text: "Description", width: "25%" },
        { value: "duration", text: "Duration", width: "15%" },
        { value: "updated_at", text: "Last update", width: "20%" },
        { value: "control", text: "", width: "20%" }
      ],
      course: {
        lessons: []
      },
      newLesson: {
        title: "",
        description: "",
        videoInput: null
      },
      courseList: [],
      selectedLesson: {},
      dialogLessonDetail: false,
      currentPage: 1,
      perPage: 5,
      videoURL: apiConfig.videoURL,
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: []
      },
      disableSaveUpdateButton: true,
      updateLesson: {},
      edit: false,
      actionDialog: false,
      search: "",
      resourseList: [],
      chapterList: [{ text: "Intro", value: 1 }],
      indexForResourseList: 0,
      chapterIdSelected: ""
    };
  },
  methods: {
    setVideo(e) {
      let tgt = e.target || window.event.srcElement;
      let files = tgt.files;
      let vm = this;
      if (FileReader && files && files.length) {
        vm.newLesson.videoInput = files[0];
      }
    },
    setResourse(dom_id, rs_id, e) {
      let tgt = e.target || window.event.srcElement;
      let files = tgt.files;
      let vm = this;
      if (FileReader && files && files.length) {
        for (let item of this.resourseList) {
          if (item.id == rs_id) {
            item.file = files[0];
          }
        }
      }
    },
    setVideoUpdate(e) {
      let tgt = e.target || window.event.srcElement;
      let files = tgt.files;
      let vm = this;
      if (FileReader && files && files.length) {
        vm.updateLesson.videoInput = files[0];
      }
      //console.log(vm.updateLesson.videoInput);
    },
    refresh() {
      this.newLesson = {
        title: "",
        description: ""
      };
      //document.getElementById("videoInput").value = "";
      //console.log(this.$refs.videoInput);
    },
    closeVideoModal() {
      this.dialogLessonDetail = false;
      //this.$refs.video.pause();
      if (this.edit == true) {
        document.getElementById("fix-button").click();
        this.edit = false;
      }
      this.selectedLesson = {};
    },
    addLesson() {
      if (
        this.newLesson.title != "" &&
        this.newLesson.description != "" &&
        this.newLesson.videoInput != null &&
        this.newLesson.videoInput != "" &&
        this.newLesson.videoInput != {} &&
        this.chapterIdSelected != "" &&
        this.chapterIdSelected != null
      ) {
        this.newLesson.course_id = this.courseSelected;
        this.newLesson.chapter_id = this.chapterIdSelected;
        this.newLesson.resourseList = this.resourseList;
        this.$swal.showLoading();
        let vm = this;
        this.$store
          .dispatch("userInsertLesson", this.newLesson)
          .then(response => {
            this.handleData();
            let icon = "";
            response.data.RequestSuccess === true
              ? (icon = "success")
              : (icon = "error");
            this.$swal({
              icon: icon,
              title: response.data.msg
            });
          });
        this.refresh();
      } else {
        this.$swal({
          icon: "error",
          title: "There are missing something"
        });
      }
    },
    fixLesson() {
      if (
        this.updateLesson.title != "" &&
        this.updateLesson.description != "" &&
        this.updateLesson.videoInput != null &&
        this.updateLesson.videoInput != "" &&
        this.updateLesson.videoInput != {}
      ) {
        this.updateLesson.course_id = this.courseSelected;
        this.$swal.showLoading();
        let vm = this;
        this.$store
          .dispatch("userUpdateLesson", this.updateLesson)
          .then(response => {
            this.handleData();
            let icon = "";
            response.data.RequestSuccess === true
              ? (icon = "success")
              : (icon = "error");
            this.$swal({
              icon: icon,
              title: response.data.msg
            }).then(() => {
              if (response.data.RequestSuccess === true) {
                vm.dialogLessonDetail = false;
                document.getElementById("fix-button").click();
              }
            });
          });
        this.refresh();
      } else {
        //console.log(this.updateLesson);
        this.$swal({
          icon: "error",
          title: "There are missing something"
        });
      }
    },
    handleData() {
      for (let i = 0; i < this.userCourseList.length; i++) {
        this.courseList.push({
          value: this.userCourseList[i].course_id,
          text: this.userCourseList[i].name
        });
      }
    },
    getLessons() {
      this.$store.dispatch("userGetInsLesson", this.courseSelected);
      this.currentPage = 1;
    },
    showDetail(lesson) {
      this.selectedLesson = lesson;
      this.updateLesson = {
        lesson_id: lesson.lesson_id,
        title: lesson.title,
        description: lesson.description
      };

      this.videoOptions.sources = [
        {
          src:
            this.videoURL +
            "/" +
            lesson.course_id +
            "/" +
            lesson.title +
            ".mp4",
          type: "video/mp4"
        }
      ];
      //console.log(this.videoOptions)
      this.dialogLessonDetail = true;
    },
    formatHours(duration) {
      let hours = Math.floor(duration / 3600);
      let minutes = Math.floor((duration - hours * 3600) / 60);
      let seconds = duration - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
    formatShort(string) {
      if (string.length > 30) return string.slice(0, 30) + "...";
      else return string;
    },
    deleteLesson(lesson) {
      console.log(lesson);
    },
    addResourse() {
      this.resourseList.push({ id: this.indexForResourseList, file: null });
      this.indexForResourseList++;
    },
    removeResourse(resourse) {
      let index = this.resourseList.indexOf(resourse);
      this.resourseList.splice(index, 1);
    }
  },
  computed: {
    ...mapGetters({
      userCourseList: "userCourseList",
      userCourseLoading: "userCourseLoading",
      userLessonList: "userLessonList",
      userLessonLoading: "userLessonLoading"
    }),
    loadLessonList() {
      return this.course.lessons;
    },
    loadSelectedLesson() {
      return this.selectedLesson;
    }
  }
};
</script>
<style lang="scss" scoped>
button,
input {
  margin-right: 1rem;
  &:focus {
    outline: 0px !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }
}
.btn-search {
  position: absolute;
  top: 0.75rem;
  height: 2.5rem;
  right: 0rem;
}
.input-search {
  height: 2.5rem;
  padding-right: 3.5rem;
}
.my-select {
  margin: 0;
  margin-top: -0.4rem;
  width: 80%;
}

.my-control-container {
  max-height: 20rem !important;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>