<template>
  <div class="account-page" style="margin: 5rem">
    fghfgh
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { CommonService } from "../../service/common.service.js";
var commonService = new CommonService();
export default {
  created() {
    if (localStorage.adminToken) {
      this.$store.dispatch("adminInfo").then(response => {
        if (response.data.errorToken == true) {
          commonService.checkErrorTokenAdmin(this, response.data.msg);
        } else {
          localStorage.adminToken = response.data.token;
        }
      });
    }
  },
  data() {
    return {};
  },
  methods: {
    goTab(flag) {
      this.$store.commit("changeTab", flag);
    }
  },
  computed: {
    ...mapGetters({
      mypageTab: "mypageTab",
      adminAdminInfo: "adminAdminInfo",
      adminAdminInfoLoading: "adminAdminInfoLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}
.my-active-class {
  color: #79589f !important;
  border-bottom: #79589f !important;
  background: whitesmoke !important;
}
.account-page {
  .my-tabs {
    padding: 1rem;
    .tab-container {
      height: 100%;
      width: 14rem;
      padding: 1rem 0.5rem;
      border: 1px solid #ece8e8;
      border-radius: 5px;
      .v-tab {
        border-radius: 10px;
      }
    }
    .list-item {
      position: relative;
      border-radius: 5px;
      margin-left: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 1rem;
      border: 1px solid #ece8e8;
    }
  }
}
</style>