<template>
  <div>
    <v-tab-item value="annouce-tab">
      <v-data-table
        :items-per-page="5"
        :headers="header"
        :items="stuAnnouceList"
        :loading="stuAnnouceLoading"
      >
        <template v-slot:item.text="data">
          <div class="my-annouce"><div v-html="(data.item.text)"></div></div>
        </template>
        <template v-slot:item.name="data">{{formatString(data.item.name)}}</template>
        <template v-slot:item.action="data">
          <router-link
            :to="{name: 'lesson-page', params: {id: data.item.course_id}, query: {annouce: data.item.annouce_id}}"
          >Detail</router-link>
        </template>
      </v-data-table>
    </v-tab-item>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import laravelEchoServer from "../../../laravel-echo-server.json";
import axios from "axios";
export default {
  data() {
    return {
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ],
      text: "",
      echoCredentials: {
        appId: laravelEchoServer.clients[0].appId, //  appId in laravel-echo-server.json
        key: laravelEchoServer.clients[0].key // key in laravel-echo-server.json
      },
      id: 0,
      header: [
        { value: "name", text: "Course Name", width: "15%" },
        { value: "text", text: "Content", width: "45%" },
        { value: "updated_at", text: "At Time", width: "20%" },
        { value: "action", text: "", width: "20%" }
      ]
    };
  },
  created() {
    // this.$store.dispatch("userGetAnnouce");
  },
  methods: {
    sendAnnouce() {
      this.$store
        .dispatch("userSendAnnouce", { text: this.text, course_id: this.id })
        .then(() => {
          this.text = "";
        });
    },
    getUsersOnline() {
      axios
        .get(
          `${window.location.protocol}//${window.location.hostname}:6001/apps/${this.echoCredentials.appId}/channels/laravel_database_chatroom?auth_key=${this.echoCredentials.key}`
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(e => console.log(e));
    },
    formatString(string) {
      if (string.length > 30) return string.slice(0, 30) + "...";
      else return string;
    }
  },
  computed: {
    ...mapGetters({
      stuAnnouceList: "stuAnnouceList",
      stuAnnouceLoading: "stuAnnouceLoading",
      userUserInfo: "userUserInfo"
    })
  }
};
</script>
<style lang="scss" scoped>
a {
  padding-top: 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}
.active-class {
  color: #79589f !important;
  border-bottom: #79589f !important;
  background: whitesmoke !important;
}
.row {
  position: relative;
  width: 100%;
  .col-9 {
    padding: 0;
    .text-box-container {
      background-color: whitesmoke;
      width: 98%;
      height: 75%;
      max-height: 75%;
      border: 1px solid #ece8e8;
    }
    .input-box {
      border: 1px solid #ece8e8;
      border-top: none;
      width: 98%;
      height: 25%;
    }
  }
  .list-container {
    border: 1px solid #ece8e8;
    border-radius: 5px;
    padding: 0.5rem 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 37rem;
    padding: 0;
    .item {
      opacity: 0.8;
      cursor: pointer;
      width: 99%;
      margin-right: 1%;
      &:hover {
        opacity: 1;
        background-color: #ece8e8;
      }
      .row {
        height: 4rem;
        .col-4 {
          img {
            margin-left: 20%;
            width: 80%;
            height: 2.5rem;
            border-radius: 50%;
            background-color: black;
          }
        }
        .col-8 {
          padding-left: 0;
        }
      }
    }
  }
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 100px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5000px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.peopleMsg {
  padding-left: 1rem;
  width: 65%;
  background-color: skyblue;
  margin: 0.5rem 0;
  text-align: left;
  display: grid;
  grid-template-columns: 20% 80%;
}

.myMSG {
  padding-right: 1rem;
  margin: 0.5rem 0;
  text-align: right;
}


.my-annouce {
  max-height: 1rem !important;
  overflow: hidden;
}
</style>