<template>
  <div>
    <v-data-table
        hide-default-footer
      :headers="header"
      :items="JSON.parse(userCurrentVideoLesson.json_info_resourse)"
    >
      <template v-slot:item.action="data">
        <a
          :href="resourseURL+'/'+userCurrentVideoLesson.course_id+'/'+userCurrentVideoLesson.lesson_id+'/'+data.item.name"
          target="_blank"
        >download</a>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apiConfig from "../../API/api.json";
export default {
  data() {
    return {
      header: [
        { value: "name", text: "FileName", width: "90%" },
        { value: "action", text: "", width: "10%" }
      ],
      resourseURL: apiConfig.resourseURL
    };
  },
  computed: {
    ...mapGetters({
      userCurrentVideoLesson: "userCurrentVideoLesson"
    })
  }
};
</script>