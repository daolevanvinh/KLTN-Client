<template>
  <div>
    <div v-if="empty" class="text-center my-empty-container">
      <img src="https://tiki.vn/desktop/img/account/tiki-not-found-pgae.png" />
      <h3>Hiện không có thông báo nào!</h3>
    </div>
    <div v-else style="margin-top: 1rem">
      <div v-if="!stuAnnouceByCourseLoading">
        <div v-for="(annouce,index) in stuAnnouceByCourseList" :key="index">
          <div v-if="index < limit" class="annouce-item" :id="annouce.annouce_id">
            <div class="annouce-date">
              <i>{{annouce.updated_at}}</i>
            </div>
            <div class="ql-editor">
              <div v-html="annouce.text"></div>
            </div>
          </div>
        </div>

        <v-app>
          <div v-if="limit!=stuAnnouceByCourseList.length" class="text-center">
            <v-btn
              style="width: 8rem"
              @click="limit = stuAnnouceByCourseList.length"
              color="primary"
            >Xem thêm</v-btn>
          </div>
        </v-app>
      </div>
      <div v-if="stuAnnouceByCourseLoading" class="text-center">
        <v-progress-circular indeterminate size="60" style="margin-top: 1rem"></v-progress-circular>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      empty: false,
      limit: 4
    };
  },
  created() {
    this.$store
      .dispatch("studentGetAnnouceByCourse", this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      stuAnnouceByCourseList: "stuAnnouceByCourseList",
      stuAnnouceByCourseLoading: "stuAnnouceByCourseLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
.my-empty-container {
  padding: 1rem 0 1rem 1rem;
}
.announce-container {
  padding: 1rem 0 1rem 1rem;
}
.annouce-item {
  padding: 1rem;
  padding-top: 2.5rem;
  position: relative;
  border-bottom: 1px solid silver;
  .annouce-date {
    position: absolute;
    top: 0rem;
    right: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  &:last-child {
    margin-bottom: 1rem;
  }
}
.ql-editor {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 1rem;
  max-height: auto;
}
</style>