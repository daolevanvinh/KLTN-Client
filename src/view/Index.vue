<template>
  <div style="position: relative;">
    <Header v-if="!hideHeader" :show="showHeader"></Header>
    <router-view></router-view>
    <AutoAnswer v-if="!guestHideAutoAnswer && false"></AutoAnswer>
    <Footer v-if="!hideFooter"></Footer>
    <!-- <b-embed type="iframe" aspect="16by9" src="#" id="testVideo" allowfullscreen></b-embed> -->
    <!-- <videoPlayer :options="videoOptions" :configs="{ hls: true }"></videoPlayer> -->
  </div>
</template>
<script>
// import Hls from "hls.js";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AutoAnswer from "../components/AutoAnswer/AutoAnswer";
import apiConfig from "../API/api.json";
import { mapGetters } from "vuex";
import { CommonService } from "../service/common.service.js";
// import { videoPlayer } from "vue-vjs-hls";
var commonService = new CommonService();
export default {
  components: { Header, AutoAnswer, Footer },
  data() {
    return {
      showHeader: null,
      // videoOptions: {
      //   source: {
      //     type: "application/x-mpegURL",
      //     src: "http://goodlearning.com/uploads/179/179.m3u8",
      //     withCredentials: false
      //   },
      //   live: true
      // }
    };
  },
  computed: {
    ...mapGetters({
      hideHeader: "hideHeader",
      hideFooter: "hideFooter",
      guestHideAutoAnswer: "guestHideAutoAnswer"
    })
  },
  mounted() {
    this.checkLogin();
    // if (Hls.isSupported()) {
    //   var video = document.getElementById("testVideo");
    //   var hls = new Hls();
    //   hls.loadSource(
    //     "https://localhost/KLTN-Server/public/uploads/adaptive_steve.m3u8"
    //   );
    //   hls.attachMedia(video);
    //   hls.on(Hls.Events.MANIFEST_PARSED, function() {
    //     video.play();
    //   });
    // } else if (video.canPlayType("application/x-mpegURL")) {
    //   video.src =
    //     "https://localhost/KLTN-Server/public/uploads/adaptive_steve.m3u8";
    //   video.addEventListener("canplay", function() {
    //     video.play();
    //   });
    // }
  },
  methods: {
    checkLogin() {
      let vm = this;
      if (this.$route.query.token) {
        localStorage.token = this.$route.query.token;
        window.history.pushState({}, document.title, this.$route.path);
      }
      setTimeout(function() {
        if (localStorage.token) {
          vm.$store.dispatch("userInfo").then(response => {
            if (response.data.errorToken == true) {
              commonService.checkErrorToken(vm, response.data.msg);
            } else {
              localStorage.token = response.data.token;
            }
          });
        }
      }, 100);
    }
  },
  updated() {
    if (this.$route.name == "my-page") {
      this.showHeader = true;
    } else this.showHeader = null;
  }
};
</script>