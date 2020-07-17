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
        <div class="col-4 offset-2" style="padding-top: 1.5rem;text-align: right;padding-right:0">
          <v-btn @click="getLessons()" color="primary">Refresh</v-btn>
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
            <a
              :style=" data.item.video_processing==0 ? 'cursor: not-allowed;' : '' "
              href="#"
              style="margin-right: 1.5rem"
              @click="showDetail(data.item)"
            >Detail</a>
            <a :style=" data.item.video_processing==0 ? 'cursor: not-allowed;' : '' " href="#" @click="deleteLesson(data.item)">Delete</a>
          </template>
          <template v-slot:item.video_processing="data">
            <div v-if="data.item.video_processing == 1" style="color:green">Finished</div>
            <div v-else style="color: red">Video Processing</div>
          </template>
          <template v-slot:no-results>
            <Empty></Empty>
          </template>
          <template v-slot:no-data>
            <Empty></Empty>
          </template>
          <template
            v-slot:item.chapter.chapter_text="data"
          >{{formatShort(data.item.chapter.chapter_text)}}</template>
          <template v-slot:item.duration="data">{{formatHours(data.item.duration)}}</template>
          <template v-slot:loading>Loading...</template>
        </v-data-table>
        <v-pagination
          circle
          v-model="currentPage"
          :length="(Math.ceil(userLessonList.length / perPage))"
        ></v-pagination>
      </v-card>
    </div>
    <div>
      <v-dialog
        v-if="updateLesson != null && selectedLesson!=null"
        persistent
        ref="dialog"
        v-model="dialogLessonDetail"
        max-width="1300"
      >
        <v-card>
          <h3 style="border-bottom: 1px solid silver;padding: 1rem">{{loadSelectedLesson.title}}</h3>
          <v-tabs v-model="dialogTabUpdate">
            <v-tab :href="`#infoTab`">Infomation</v-tab>
            <v-tab :href="`#editTab`">Lesson</v-tab>
            <v-tab :href="`#chapterSettingUpdateTab`">Chapter Setting</v-tab>
          </v-tabs>
          <v-tabs-items style="padding: 1rem" v-model="dialogTabUpdate">
            <v-tab-item value="infoTab">
              <div class="row" style="margin: 0;margin-left: 0.5rem">
                <div class="col-6" style="padding: 0;">
                  <div class="player-container">
                    <!-- <b-embed
                      v-if="loadSelectedLesson!=null"
                      :src="videoURL + '/'+loadSelectedLesson.course_id +'/' +loadSelectedLesson.lesson_id+'.mp4'"
                      type="iframe"
                      aspect="16by9"
                      allowfullscreen
                    ></b-embed>-->
                    <videoPlayer
                      v-if="loadSelectedLesson!=null"
                      :options="videoOptions"
                      :configs="{ hls: true }"
                    ></videoPlayer>
                  </div>
                </div>
                <div class="col-6" style="padding: 0;padding-left: 2rem">
                  <div v-if="updateLesson != null && updateLesson.chapter != null">
                    <ul>
                      <li>
                        Chapter:
                        <b>{{updateLesson.chapter.chapter_text}}</b>
                      </li>
                      <li>
                        Title:
                        <b>{{updateLesson.title}}</b>
                      </li>
                      <li>List Resourse:</li>
                    </ul>
                    <v-data-table
                      style="margin-top: -1rem"
                      dense
                      fixed-header
                      :headers="[{value:'name', text:'FileName', width: '80%'}, {value: 'action', text: ''}]"
                      :items="updateLesson.json_info_resourse"
                      height="13rem"
                    >
                      <template v-slot:item.action="data">
                        <a
                          target="_blank"
                          :href="resourseURL+'/'+courseSelected
                          +'/'
                          +updateLesson.lesson_id
                          +'/'
                          +data.item.name"
                          :download="'Content-Disposition: attachment; filename='+data.item.name"
                        >Download</a>
                      </template>
                    </v-data-table>
                  </div>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item value="editTab">
              <div class="row" style="margin-top: -1rem" v-if="updateLesson!=null">
                <div class="col-6">
                  <div class="my-row-chapter">
                    <v-select
                      v-if="updateLesson.chapter!=null"
                      outlined
                      @change="disableSaveUpdateButton = false"
                      v-model="updateLesson.chapter.chapter_id"
                      :items="chapterList"
                      dense
                      label="Select your chapter"
                    ></v-select>
                    <div
                      style="text-align: center;padding-top: 0.5rem"
                      @click="dialogTabUpdate = `chapterSettingUpdateTab`"
                    >
                      <v-icon class="cog-icon">mdi-cog</v-icon>
                    </div>
                  </div>
                  <v-text-field
                    outlined
                    style="margin-top: 0.5rem"
                    v-model="updateLesson.title"
                    dense
                    @keyup="disableSaveUpdateButton = false"
                    label="Title"
                  ></v-text-field>
                  <v-textarea
                    v-model="updateLesson.description"
                    style="margin-top: 0.5rem;max-height: 10rem"
                    label="Description"
                    outlined
                    @keyup="disableSaveUpdateButton = false"
                  ></v-textarea>
                  <v-file-input
                    style="margin-top: -0.2rem"
                    accept="video/*"
                    @change="setVideoUpdate"
                    v-model="mainVideo"
                    chips
                    show-size
                    label="Video is require (Main video)"
                  ></v-file-input>
                  <v-checkbox
                    @change="disableSaveUpdateButton = false;"
                    v-model="updateLesson.havePreview"
                    style="margin-top: 0"
                  >
                    <template v-slot:label>
                      <div style="padding-top: 0.5rem">Is preview video?</div>
                    </template>
                  </v-checkbox>
                </div>
                <div class="col-6">
                  <div style="text-align: right">
                    <!-- <h3>Your Resourse</h3> -->
                    <v-btn
                      style="margin-right:0"
                      color="primary"
                      @click="updateResourse()"
                    >More resouses ?</v-btn>
                    <input
                      style="display: none"
                      type="file"
                      multiple
                      @change="setUpdateResourse"
                      id="updateResourseFile"
                    />
                  </div>

                  <div class="my-control-container">
                    <v-data-table
                      class="elevation-1"
                      style="margin-top: 0.5rem"
                      dense
                      height="16rem"
                      fixed-header
                      :search="searchTempForRSUpdate"
                      :headers="[{value:'file.name', text:'FileName', width: '80%'}, {value: 'action', text: ''}]"
                      :items="resourseUpdateList"
                      :custom-filter="myUpdateResourseFilter"
                    >
                      <template v-slot:no-results>
                        <h3 class="text-center">Empty List</h3>
                      </template>
                      <template v-slot:item.action="data">
                        <a href="#" @click="removeUpdateResourse(data.item)">Delete</a>
                      </template>
                      <template v-slot:item.file.name="data">
                        <div>{{data.item.file.name}}</div>
                      </template>
                    </v-data-table>
                  </div>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item value="chapterSettingUpdateTab">
              <div class="row" style="margin:0;padding:0;margin-top: -1rem">
                <div class="col-6" style="margin:0;padding:0;padding-top: 12px">
                  <v-text-field v-model="newChapter" outlined dense label="New Chapter"></v-text-field>
                </div>
                <div class="col-2">
                  <v-btn
                    style="height: 2.5rem"
                    :disabled="newChapter === ''"
                    @click="addChapter()"
                    color="primary"
                  >Add</v-btn>
                </div>
              </div>
              <v-data-table
                v-if="courseSelected != null"
                :headers="chapterHeader"
                :items="chapterList"
                height="14rem"
                fixed-header
                dense
              >
                <template v-slot:no-results>
                  <Empty></Empty>
                </template>
                <template v-slot:no-data>
                  <Empty></Empty>
                </template>
                <template v-slot:item.action="data">
                  <v-icon
                    @click="updateChapter(data.item, 0)"
                    style="cursor: pointer;margin-right: 0.5rem"
                    title="Up"
                  >mdi-arrow-up</v-icon>
                  <v-icon
                    @click="updateChapter(data.item, 1)"
                    style="cursor: pointer;margin-right: 0.5rem"
                    title="Down"
                  >mdi-arrow-down</v-icon>
                  <v-icon
                    @click="updateChapter(data.item)"
                    style="cursor: pointer;margin-right: 0.5rem"
                    title="Edit"
                  >mdi-pencil-box-multiple-outline</v-icon>
                  <v-icon
                    color="red"
                    style="cursor: pointer;"
                    @click="deleteChaper(data.item)"
                    title="Delete"
                  >mdi-delete-forever-outline</v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="dialogTabUpdate=='editTab'"
              :disabled="disableSaveUpdateButton"
              color="red"
              text
              @click="fixLesson()"
            >Save Update</v-btn>
            <v-btn color="primary" @click="closeVideoModal">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent v-if="newLesson != null" v-model="actionDialog" width="1300">
        <v-card width="1300" style="padding: 1rem">
          <v-tabs v-model="dialogTab">
            <v-tab :href="`#lessonTab`">Lesson</v-tab>
            <v-tab :href="`#chapterSetting`">Chapter Setting</v-tab>
            <v-tabs-items v-model="dialogTab">
              <v-tab-item value="lessonTab">
                <div class="row">
                  <div class="col-6">
                    <div class="my-row-chapter">
                      <v-select
                        outlined
                        v-model="chapterIdSelected"
                        :items="chapterList"
                        dense
                        label="Select your chapter"
                      ></v-select>
                      <div
                        style="text-align: center;padding-top: 0.5rem"
                        @click="dialogTab = `chapterSetting`"
                      >
                        <v-icon class="cog-icon">mdi-cog</v-icon>
                      </div>
                    </div>
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
                    <v-file-input
                      id="videoInput"
                      ref="videoInput"
                      accept="video/*"
                      @change="setVideo"
                      chips
                      show-size
                      v-model="mainVideo"
                      label="Video is require (Main video)"
                    ></v-file-input>
                    <v-checkbox v-model="newLesson.havePreview" style="margin-top: 0">
                      <template v-slot:label>
                        <div style="padding-top: 0.5rem">Is preview video?</div>
                      </template>
                    </v-checkbox>
                  </div>
                  <div class="col-6">
                    <div style="text-align: right">
                      <!-- <h3>Your Resourse</h3> -->
                      <v-btn
                        style="margin-right:0"
                        color="primary"
                        @click="addResourse()"
                      >More resouses ?</v-btn>
                      <input
                        @change="setResourse"
                        type="file"
                        multiple
                        id="resourseInput"
                        style="display:none"
                      />
                    </div>

                    <div style="margin-top: 1rem">
                      <v-data-table
                        class="elevation-1"
                        dense
                        height="16rem"
                        :search="searchTempForRSUpdate"
                        :headers="[{value:'file.name', text:'FileName', width: '80%'}, {value: 'action', text: ''}]"
                        :items="resourseList"
                        :custom-filter="myUpdateResourseFilter"
                      >
                        <template v-slot:no-results>
                          <h3 class="text-center">Empty List</h3>
                        </template>
                        <template v-slot:item.action="data">
                          <a href="#" @click="removeResourse(data.item)">Delete</a>
                        </template>
                        <template v-slot:item.file.name="data">
                          <div>{{data.item.file.name}}</div>
                        </template>
                      </v-data-table>
                    </div>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item value="chapterSetting">
                <div class="row" style="margin:0;padding:0;margin-top: 1rem">
                  <div class="col-6" style="margin:0;padding:0;padding-top: 12px">
                    <v-text-field v-model="newChapter" outlined dense label="New Chapter"></v-text-field>
                  </div>
                  <div class="col-2">
                    <v-btn
                      style="height: 2.5rem"
                      :disabled="newChapter === ''"
                      @click="addChapter()"
                      color="primary"
                    >Add</v-btn>
                  </div>
                </div>
                <v-data-table
                  v-if="courseSelected != null"
                  :headers="chapterHeader"
                  :items="chapterList"
                  height="17rem"
                  fixed-header
                  dense
                >
                  <template v-slot:no-results>
                    <Empty></Empty>
                  </template>
                  <template v-slot:no-data>
                    <Empty></Empty>
                  </template>
                  <template v-slot:item.action="data">
                    <v-icon
                      @click="updateChapter(data.item, 0)"
                      style="cursor: pointer;margin-right: 0.5rem"
                      title="Up"
                    >mdi-arrow-up</v-icon>
                    <v-icon
                      @click="updateChapter(data.item, 1)"
                      style="cursor: pointer;margin-right: 0.5rem"
                      title="Down"
                    >mdi-arrow-down</v-icon>
                    <v-icon
                      @click="updateChapter(data.item)"
                      style="cursor: pointer;margin-right: 0.5rem"
                      title="Edit"
                    >mdi-pencil-box-multiple-outline</v-icon>
                    <v-icon
                      style="cursor: pointer;"
                      @click="deleteChaper(data.item)"
                      title="Delete"
                      color="red"
                    >mdi-delete-forever-outline</v-icon>
                  </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
          <div style="text-align: right;margin-top: 1rem">
            <div v-if="dialogTab == 'lessonTab'">
              <v-btn @click="addLesson" style="margin-right: 1rem" color="primary">Save</v-btn>
              <v-btn @click="refresh()" style="margin-right: 1rem" color="yellow">Refresh</v-btn>
              <v-btn @click="refresh();actionDialog = false" style="margin:0" color="red">Cancel</v-btn>
            </div>
            <div v-else>
              <v-btn @click="refresh()" style="margin-right: 1rem" color="yellow">Refresh</v-btn>
              <v-btn @click="refresh();actionDialog = false" style="margin:0" color="red">Cancel</v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog persistent v-model="chapterLoading" width="200">
        <v-card style="padding: 1rem" width="200">In progressing...</v-card>
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
import { videoPlayer } from "vue-vjs-hls";
import Empty from "../../components/EmptyComponent/EmptyComponent";
export default {
  components: { Empty, videoPlayer },
  created() {
    this.$store.commit("user_lesson_empty_list");
    this.$store.dispatch("userGetInsCourse").then(() => {
      if (parseInt(this.$route.query.course_id)) {
        this.courseSelected = parseInt(this.$route.query.course_id);
        this.getLessons();
      }
      this.handleData();
    });
    if (!this.$route.query.course_id) {
      this.$store.commit("user_lesson_success", { list: [] });
    }
  },
  data() {
    return {
      mainVideo: null,
      chapterLoading: false,
      dialogTab: `lessonTab`,
      dialogTabUpdate: `infoTab`,
      courseSelected: "",
      items: [
        { value: "1", text: "Mới nhất" },
        { value: "2", text: "Cũ nhất" },
        { value: "3", text: "A-Z" },
        { value: "4", text: "Z-A" },
        { value: "5", text: "Miễn phí" },
        { value: "6", text: "Có phí" }
      ],
      videoOptions: {
        source: {
          type: "application/x-mpegURL",
          src: "",
          withCredentials: false
        },
        live: true
      },
      lessonList: [],
      headers: [
        { value: "title", text: "Title", width: "20%" },
        { value: "chapter.chapter_text", text: "Chapter", width: "25%" },
        { value: "duration", text: "Duration", width: "10%" },
        { value: "video_processing", text: "status", width: "10%" },
        { value: "updated_at", text: "Last updated", width: "20%" },
        { value: "control", text: "", width: "15%" }
      ],
      chapterHeader: [
        { value: "text", text: "Chapter", width: "80%" },
        { value: "action", text: "Control", width: "20%" }
      ],
      course: {
        lessons: []
      },
      newLesson: {
        title: "",
        description: "",
        videoInput: null,
        havePreview: 0
      },
      courseList: [],
      selectedLesson: {},
      dialogLessonDetail: false,
      currentPage: 1,
      perPage: 5,
      resourseURL: apiConfig.resourseURL,
      videoURL: apiConfig.videoURL,
      disableSaveUpdateButton: true,
      updateLesson: {
        havePreview: false
      },
      edit: false,
      actionDialog: false,
      search: "",
      resourseList: [],
      chapterList: [{ text: "Intro", value: 1 }],
      indexForResourseList: 0,
      chapterIdSelected: "",
      newChapter: "",
      action: 0,
      resourseUpdateList: [],
      searchTempForRSUpdate: "",
      uploadsURL: apiConfig.uploadsURL
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
    addResourse() {
      document.getElementById("resourseInput").click();
    },
    setResourse(e) {
      let tgt = e.target || window.event.srcElement;
      let files = tgt.files;
      let vm = this;
      if (FileReader && files && files.length) {
        for (let file of files) {
          this.resourseList.push({ file: file });
        }
      }
    },
    removeResourse(resourse) {
      let index = this.resourseList.indexOf(resourse);
      this.resourseList.splice(index, 1);
    },
    setVideoUpdate(e) {
      let tgt = e.target || window.event.srcElement;
      let files = tgt.files;
      let vm = this;
      if (FileReader && files && files.length) {
        vm.updateLesson.videoInput = files[0];
      }
      this.disableSaveUpdateButton = false;
      //console.log(vm.updateLesson.videoInput);
    },
    refresh() {
      this.newLesson = {
        title: "",
        description: ""
      };
      this.newChapter = "";
      this.dialogTab = "lessonTab";
      this.updateLesson = null;
      this.selectedLesson = null;
      this.chapterIdSelected = null;
      this.disableSaveUpdateButton = true;
      this.resourseList = [];
      this.resourseUpdateList = [];
      document.getElementById("");
      this.mainVideo = null;
      this.previewVideo = null;
      //document.getElementById("videoInput").value = "";
      //console.log(this.$refs.videoInput);
    },
    closeVideoModal() {
      this.dialogLessonDetail = false;
      this.updateLesson = null;
      this.dialogTabUpdate = "infoTab";
      //this.$refs.video.pause();
      this.selectedLesson = {};
      this.updateLesson = { havePreview: false };
      this.mainVideo = null;
      this.previewVideo = null;
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
        this.chapterLoading = true;
        let vm = this;
        this.$store
          .dispatch("userInsertLesson", this.newLesson)
          .then(response => {
            this.handleData();
            this.chapterLoading = false;
            let icon = "";
            response.data.RequestSuccess === true
              ? (icon = "success")
              : (icon = "error");
            this.$swal({
              icon: icon,
              title: response.data.msg
            });
            this.refresh();
            this.actionDialog = false;
          });
      } else {
        this.$swal({
          icon: "error",
          title: "There are missing something"
        });
      }
    },
    fixLesson() {
      if (
        this.updateLesson.chapter.chapter_id &&
        this.updateLesson.title != "" &&
        this.updateLesson.description != ""
      ) {
        this.updateLesson.course_id = this.courseSelected;
        this.chapterLoading = true;
        this.updateLesson.resourseList = this.resourseUpdateList;
        this.updateLesson.chapter_id = this.updateLesson.chapter.chapter_id;
        let vm = this;
        this.$store
          .dispatch("userUpdateLesson", this.updateLesson)
          .then(response => {
            this.chapterLoading = false;
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
              }
              this.refresh();
              this.dialogLessonDetail = false;
              this.dialogTabUpdate = "infoTab";
            });
          });
      } else {
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
      this.currentPage = 1;
      if (this.courseSelected != null) {
        for (let course of this.userCourseList) {
          if (course.course_id == this.courseSelected) {
            this.$store.dispatch("userGetInsLesson", this.courseSelected);
            this.chapterList = [];
            for (let item of JSON.parse(course.json_info_chapter)) {
              this.chapterList.push({
                value: item.value,
                text: item.text
              });
            }
            break;
          }
        }
      }
    },
    showDetail(lesson) {
      if (lesson.video_processing == 1) {
        this.selectedLesson = lesson;
        this.updateLesson = {
          lesson_id: lesson.lesson_id,
          title: lesson.title,
          description: lesson.description,
          chapter: lesson.chapter,
          course_id: lesson.course_id,
          json_info_resourse: lesson.json_info_resourse,
          havePreview: lesson.havePreview
        };
        this.resourseUpdateList = [];
        this.videoOptions.source.src =
          this.uploadsURL +
          "/" +
          lesson.lesson_id +
          "/" +
          lesson.lesson_id +
          ".m3u8";
        for (let rs of lesson.json_info_resourse) {
          this.resourseUpdateList.push({
            file: { name: rs.name },
            new: false,
            delete: false,
            name: rs.name
          });
        }
        console.log(this.resourseUpdateList);
        this.dialogLessonDetail = true;
        // this.videoOptions.sources = [
        //   {
        //     src:
        //       this.videoURL +
        //       "/" +
        //       lesson.course_id +
        //       "/" +
        //       lesson.title +
        //       ".mp4",
        //     type: "video/mp4"
        //   }
        // ];
        // //console.log(this.videoOptions)
        // this.dialogLessonDetail = true;
      }
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
      if(lesson.video_processing == 1) {
        this.$swal({
        icon: "question",
        title: "Are you sure want to Delete?",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.chapterLoading = true;
          this.$store
            .dispatch("userDeleteInsLesson", {
              lesson_id: lesson.lesson_id,
              course_id: this.courseSelected
            })
            .then(response => {
              this.chapterLoading = false;
              let icon = "";
              response.data.RequestSuccess === true
                ? (icon = "success")
                : (icon = "error");
              this.$swal({
                icon: icon,
                title: response.data.msg
              });
            });
        }
      });
      }
    },
    addChapter() {
      if (this.newChapter != "") {
        this.chapterLoading = true;
        this.$store
          .dispatch("userAddChapter", {
            text: this.newChapter,
            course_id: this.courseSelected
          })
          .then(response => {
            this.chapterLoading = false;
            if (response.data.RequestSuccess === true) {
              this.newChapter = "";
              this.handleForChapter(response.data.chapters, null);
            }
          });
      } else {
        this.$swal({
          icon: "error",
          title: "Chapter is not empty!"
        });
      }
    },
    handleForChapter(chapters, flag) {
      for (let course of this.userCourseList) {
        if (course.course_id == this.courseSelected) {
          course.json_info_chapter = JSON.stringify(chapters);
          if (flag == null) {
            let chapterList = [];
            for (let chapter of chapters) {
              chapterList.push({
                value: chapter.value,
                text: chapter.text
              });
            }
            this.chapterList = chapterList;
          }
        }
      }
    },
    updateChapter(chapter, type) {
      if (type != null) {
        for (let i = 0; i < this.chapterList.length; i++) {
          if (
            this.chapterList[i].value == chapter.value &&
            chapter.value != null
          ) {
            let error =
              (i == 0 && type == 0) ||
              (i == this.chapterList.length - 1 && type == 1);
            if (error === false) {
              this.chapterLoading = true;
              switch (type) {
                case 0:
                  let temp_up = this.chapterList[i - 1];
                  this.chapterList[i - 1] = chapter;
                  this.chapterList[i] = temp_up;
                  break;
                case 1:
                  let temp_down = this.chapterList[i + 1];
                  this.chapterList[i + 1] = chapter;
                  this.chapterList[i] = temp_down;
                  break;
              }
              this.handleForChapter(JSON.stringify(this.chapterList), 0);
              this.$store
                .dispatch("userUpdateChapter", {
                  json_info_chapter: JSON.stringify(this.chapterList),
                  course_id: this.courseSelected
                })
                .then(response => {
                  this.chapterList.push({});
                  this.chapterList.splice(this.chapterList.length - 1, 1);
                  this.chapterLoading = false;
                });
              break;
            }
          }
        }
      }
    },
    deleteChaper(chapter) {
      this.$swal({
        icon: "question",
        title: "Are you sure to delete?",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.chapterLoading = true;
          let tempList = this.chapterList.slice();
          let index = this.chapterList.indexOf(chapter);
          tempList.splice(index, 1);
          this.$store
            .dispatch("userDeleteChapter", {
              json_info_chapter: JSON.stringify(tempList),
              course_id: this.courseSelected
            })
            .then(response => {
              this.chapterList.push({});
              this.chapterList = tempList.slice();
              this.chapterLoading = false;
            });
        }
      });
    },
    updateResourse() {
      document.getElementById("updateResourseFile").click();
    },
    setUpdateResourse(e) {
      let tgt = e.target || window.event.srcElement;
      let files = tgt.files;
      let vm = this;
      if (FileReader && files && files.length) {
        for (let file of files) {
          this.disableSaveUpdateButton = false;
          if (this.checkExistResouse(this.resourseUpdateList, file)) {
            this.resourseUpdateList.push({ file: file, new: true });
          } else {
            this.$swal({
              icon: "error",
              title: "File " + file.name + " already exist!!!"
            });
          }
        }
      }
    },
    removeUpdateResourse(resourse) {
      if (resourse.new === false) {
        resourse.delete = true;
        this.searchTempForRSUpdate += "1";
      } else {
        let index = this.resourseUpdateList.indexOf(resourse);
        this.resourseUpdateList.splice(index, 1);
      }
      this.disableSaveUpdateButton = false;
    },
    myUpdateResourseFilter(value, search, item) {
      return item.new === true || (item.new === false && item.delete === false);
    },
    checkExistResouse(list, resourse) {
      for (let item of list) {
        let rs =
          (item.file != null && item.file.name == resourse.name) ||
          item.name == resourse.name;
        if (rs == true) return false;
      }
      return true;
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

.my-row-chapter {
  display: grid;
  grid-template-columns: 90% 10%;
  .cog-icon {
    cursor: pointer;
  }
}
</style>