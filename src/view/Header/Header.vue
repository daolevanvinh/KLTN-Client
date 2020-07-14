<template>
  <div v-if="loadStudent" class="my-container">
    <v-app id="header">
      <div class="page-container">
        <b-navbar toggleable="lg" type="light" variant="default">
          <b-navbar-brand :href="baseURL">
            <b-img rounded="circle" style="width: 4rem; height: 4rem" :src="goodLearning"></b-img>&nbsp;
            <span style="position: absolute;margin-top: 0.5rem;margin-left: 0.5rem">
              <div>
                <b>GoodLearning</b>
              </div>
              <div style="font-size: 9pt;">
                <i>
                  <b>Study Online</b>
                </i>
              </div>
            </span>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav id="navbarNav" class="ml-auto" style="margin-top: 0.5rem">
              <DropdownCategory></DropdownCategory>
              <v-autocomplete
                class="autoComplete"
                height="1rem"
                :search-input.sync="search"
                :loading="tempLoading || guestInfoSearchFromHeaderLoading"
                :items="searchList"
                hide-no-data
                hide-details
                flat
                label="Search..."
                dense
                outlined
                @keyup.enter="searchFunction()"
              >
                <template v-slot:progress>
                  <v-progress-linear absolute color="blue lighten-3" height="3" indeterminate></v-progress-linear>
                </template>
                <template v-slot:item="data">
                  <div @click="goTo(data.item)">
                    <b>
                      <v-icon v-if="data.item.type==0">mdi-account</v-icon>
                      <v-icon v-else>mdi-book</v-icon>
                      {{data.item.text}}
                    </b>
                  </div>
                </template>
              </v-autocomplete>
              <input
                v-if="false"
                v-model="search"
                class="form-control input-search"
                @keyup.enter="searchFunction()"
                placeholder="Search..."
                type="text"
              />
              <button v-if="false" @click="searchFunction()" class="btn btn-info btn-search">
                <i class="fa fa-search"></i>
              </button>
              <!-- <a
                v-if="!loadStateLogin && !userUserInfoLoading"
                href="google"
                class="btn normal-button"
              >Miễn phí</a>-->
              <router-link
                v-if="loadStateLogin && !userUserInfoLoading"
                :to="{name: 'instructor-page'}"
                class="btn normal-button"
              >Instructor</router-link>
              <div
                v-if="!userUserInfoLoading && loadStateLogin"
                style="border-left: 1px solid;margin-right: 1rem;"
              ></div>
              <HeaderMyCourseList v-if="loadStateLogin && !userUserInfoLoading"></HeaderMyCourseList>
              <HeaderCartList v-if="loadStateLogin && !userUserInfoLoading"></HeaderCartList>
              <HeaderLikeList v-if="loadStateLogin && !userUserInfoLoading"></HeaderLikeList>
              <HeaderAnnouceList v-if="loadStateLogin && !userUserInfoLoading"></HeaderAnnouceList>
              <HeaderUserButton
                :account="userUserInfo"
                v-if="loadStateLogin && !userUserInfoLoading"
              ></HeaderUserButton>

              <div v-if="!loadStateLogin && !userUserInfoLoading">
                <button
                  v-b-modal.login-modal
                  class="btn btn-outline-secondary"
                  style="margin-right: 1rem;"
                >Sign in</button>
                <button v-b-modal.singup-modal class="btn btn-danger">Sign up</button>
              </div>
              <v-skeleton-loader
                v-if="userUserInfoLoading"
                type="button"
                style="margin-top: 0.5rem"
              ></v-skeleton-loader>
              <div v-if="userUserInfoLoading" style="border-left: 1px solid;margin: 0 1rem;"></div>
              <v-skeleton-loader
                v-if="userUserInfoLoading"
                type="button"
                style="margin-top: 0.5rem;margin-right: 1rem"
              ></v-skeleton-loader>
              <v-skeleton-loader v-if="userUserInfoLoading" type="avatar"></v-skeleton-loader>
              <v-skeleton-loader v-if="userUserInfoLoading" type="avatar"></v-skeleton-loader>
              <v-skeleton-loader v-if="userUserInfoLoading" type="avatar"></v-skeleton-loader>
              <v-skeleton-loader v-if="userUserInfoLoading" type="avatar"></v-skeleton-loader>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </v-app>
    <Login_Modal></Login_Modal>
    <Singup_Modal></Singup_Modal>
  </div>
</template>
<script>
import DropdownCategory from "../../components/Dropdown_Category/Dropdown_Category";
import Login_Modal from "../../components/Login_Modal/Login_Modal";
import Singup_Modal from "../../components/SignUp_Modal/SignUp_Modal";
//import ItemOfList from "../../components/ItemOfList/ItemOfList";
import HeaderLikeList from "../../components/HeaderLikeList/HeaderLikeList";
import HeaderCartList from "../../components/HeaderCartList/HeaderCartList";
import HeaderMyCourseList from "../../components/HeaderMyCourseList/HeaderMyCourseList";
import HeaderAnnouceList from "../../components/HeaderAnnouceList/HeaderAnnouceList";
import HeaderUserButton from "../../components/HeaderUserButton/HeaderUserButton";
import apiConfig from "../../API/api.json";
import goodLearning from "../../assets/goodlearning.jpg";
import { mapGetters } from "vuex";
export default {
  components: {
    DropdownCategory,
    Login_Modal,
    Singup_Modal,
    HeaderLikeList,
    HeaderCartList,
    HeaderMyCourseList,
    HeaderAnnouceList,
    HeaderUserButton
  },
  data() {
    return {
      goodLearning: goodLearning,
      isLogin: false,
      isStudent: true,
      baseURL: apiConfig.baseURL,
      baseImage: apiConfig.imageURL,
      search: "",
      tempSearch: "",
      tempLoading: false,
      searchList: []
    };
  },
  props: ["show"],
  watch: {
    show(newVal) {
      if (newVal != null) {
        this.isStudent = newVal;
      }
    },
    search(newVal) {
      if (newVal != null) this.searchKeyword(newVal);
    }
  },
  methods: {
    goTo(item) {
      this.search = "";
      this.tempLoading = false;
      //console.log(item);
      let name = "";
      if (item.type == 0) {
        name = "profile-view-page";
      } else {
        name = "course-detail-page";
      }

      if (this.$route.name == name) {
        if (item.type == 0 && this.$route.params.app_id != item.value) {
          this.$router.replace({ params: { app_id: item.value } });
        } else {
          if (item.type != 0 && this.$route.params.id != item.value)
            this.$router.replace({ params: { id: item.value } });
        }
      } else {
        if (item.type == 0)
          this.$router.push({ name: name, params: { app_id: item.value } });
        else {
          this.$router.push({ name: name, params: { id: item.value } });
        }
      }
    },
    searchFunction() {
      if (this.$route.name != "search-page") {
        this.$router.push({
          name: "search-page",
          query: { search: this.search }
        });
      } else {
        this.$router.replace({ query: { search: "" } });
        setTimeout(() => {
          this.$router.replace({ query: { search: this.search } });
        }, 100);
        this.$store.commit("guest_set_search", this.search);
        document.getElementById("search-button-for-vuex").click();
      }
    },
    searchKeyword(search) {
      this.tempSearch = search;
      this.tempLoading = true;
      setTimeout(() => {
        if (this.tempSearch == search && search != "") {
          ////console.log("searching for", search);
          this.tempSearch = null;
          this.$store
            .dispatch("guestGetInfoSearchFromHeader", search)
            .then(response => {
              this.tempLoading = false;
              this.handleData();
            });
        }
      }, 2000);
    },
    handleData() {
      this.searchList = [];
      for (let item of this.guestInfoSearchFromHeaderList) {
        this.searchList.push({
          text: item.text,
          value: item.value,
          type: item.type
        });
      }
      ////console.log(this.guestInfoSearchFromHeaderList);
    },
    ahihi(data) {
      //console.log(data);
    }
  },
  created() {
    this.$store.dispatch("userGetCourseLike");
    if (JSON.stringify(this.userUserInfo) !== JSON.stringify({}))
      this.isLogin = true;
    else this.isLogin = false;
  },
  updated() {
    if (JSON.stringify(this.userUserInfo) !== JSON.stringify({}))
      this.isLogin = true;
    else this.isLogin = false;
  },
  computed: {
    ...mapGetters({
      userUserInfo: "userUserInfo",
      userUserInfoLoading: "userUserInfoLoading",
      userCourseLikeList: "userCourseLikeList",
      userCourseLikeLoading: "userCourseLikeLoading",
      guestInfoSearchFromHeaderList: "guestInfoSearchFromHeaderList",
      guestInfoSearchFromHeaderLoading: "guestInfoSearchFromHeaderLoading"
    }),
    loadStateLogin() {
      return this.isLogin;
    },
    loadStudent() {
      return this.isStudent;
    }
  }
};
</script>
<style lang="scss" scoped>
.loading-container {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
.circle-button-lg {
  border-radius: 50%;
}
.circle-button {
  border-radius: 20px;
}
button,
a {
  margin-right: 1rem;
  &:focus {
    outline: 0px !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }
}
.normal-button:hover {
  background-color: #ece8e8;
}
.normal-button {
  height: 2.5rem;
  color: black;
}
#header {
  color: black;
  height: 5.5rem;
  font-family: "Quicksand";
  border-bottom: 3px solid #e2dbcb;
}
.btn-search {
  height: 2.5rem;
  border-radius: 0 5px 5px 0;
}
.input-search {
  width: 20rem;
  height: 2.5rem;
  border-radius: 5px 0 0 5px;
  &:focus {
    outline: 0px !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }
}
.input-search:-moz-placeholder {
  text-align: left;
}
::-webkit-input-placeholder {
  text-align: left;
}
.my-group-icon {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  .dropdown {
    .btn:hover .dropdown-menu {
      display: block;
    }
  }
}
// .my-container {
//   position: sticky;
//   top: 0;
//   z-index: 5;
// }
.autoComplete {
  font-size: 16px !important;
  margin-right: 5rem !important;
  width: 20rem !important;
  border: none !important;
}
</style>