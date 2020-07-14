<template>
  <div>
    <InfoTab :account="admin" :accountLoading="false"></InfoTab>
  </div>
</template>
<script>
import InfoTab from "../../components/AdminTab/AdminTab";
import { mapGetters } from "vuex";
import { CommonService } from "../../service/common.service.js";
var commonService = new CommonService();
export default {
  components: { InfoTab },
  created() {
    this.$store.dispatch("adminInfo").then(res => {
      this.admin = res.data.admin
    });
  },
  data() {
    return {
      admin: {}
    };
  },
  methods: {},
  computed: {
    ...mapGetters({
      mypageTab: "mypageTab",
      adminAdminInfo: "adminAdminInfo",
      adminAdminInfoLoading: "adminAdminInfoLoading"
    })
  }
};
</script>