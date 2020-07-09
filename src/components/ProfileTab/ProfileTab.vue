<template>
  <div>
    <v-tab-item class="profile-container" value="profile-tab">
      <v-btn @click="save()" color="red darken-1" style="color:white;margin-bottom: 1rem">Save</v-btn>
      <VueEditor v-model="content"></VueEditor>
      <!-- <div class="ql-editor">
        <div v-html="content"></div>
      </div>-->
    </v-tab-item>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
  mounted() {
    this.content = this.account.profile;
  },
  components: { VueEditor },
  props: ["account"],
  watch: {
    account(newVal) {
      this.account = newVal;
    }
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    save() {
      this.$swal.showLoading()
      this.$store.dispatch("userEditProfile", this.content).then(response => {
        let icon = "";
        response.data.RequestSuccess ? (icon = "success") : (icon = "error");
        this.$swal({
          icon: icon,
          title: response.data.msg
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.profile-container {
  width: 100%;
  padding-right: 1rem;
  padding-bottom: 6.5rem;
  height: 30rem;
  word-break: break-all;
}
</style>