<template>
  <div>
    <h3>Our package list for your choose</h3>
    <v-data-table :headers="header" :items="userStorageList" :loading="userStorageLoading">
      <template v-slot:item.price="data">{{formatMoney(data.item.price)}}&nbsp;( / Mounth )</template>
      <template v-slot:item.action="data">
        <a @click="showDetail(data.item)">Buy</a>
      </template>
    </v-data-table>
    <v-dialog persistent v-model="dialog" width="600">
      <v-card style="padding: 1rem">
        <h3>{{Package.name}}</h3>
        <div>
          <span style="margin-right: 3rem">
            <b>Memory Space: {{Package.storage_size}}&nbsp;(GB)</b>
          </span>
          <span>
            <b>
              Price:
              <span style="color:red">{{formatMoney(Package.price)}}&nbsp;</span>
            </b>
          </span>
          <div style="margin-top: 1rem">
            <i>Note:</i>
            <div
              style="border: 1px solid silver;padding: 0.5rem 1rem;border-radius: 3px;margin-bottom: 1rem"
            >{{Package.note}}</div>
          </div>
          <div>
            <v-select label="Selected Mounth" :items="month" v-model="selectedMonth"></v-select>
          </div>
          <div>
            Total Price:&nbsp;
            <span style="color: red">
              <b>{{formatMoney(Package.price*selectedMonth)}}</b>
            </span>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <a id="payment-btn" target="_blank" :href="URLPayment"></a>
          <v-btn @click="createURL()" color="primary">Buy</v-btn>
          <v-btn @click="cancel()" style="color: white" color="red">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apiConfig from "../../API/api.json";
export default {
  data() {
    return {
      header: [
        { value: "name", text: "Package Name", width: "40%" },
        {
          value: "storage_size",
          text: "Storage size (Gb)",
          width: "25%"
        },
        { value: "price", text: "Price ($) / Mounth", width: "25%" },
        { value: "action", text: "Note", width: "10%" }
      ],
      dialog: false,
      Package: {},
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedMonth: 1,
      apiURL: apiConfig.apiURL,
      URLPayment: ""
    };
  },
  created() {
    this.$store.dispatch("userGetStoragePackge");
  },
  methods: {
    formatMoney(price) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });

      return formatter.format(price);
    },
    showDetail(storagePackage) {
      this.dialog = true;
      this.Package = storagePackage;
    },
    createURL() {
      let url = this.apiURL + "/user/storagePackage/payment?";
      url += "token=" + localStorage.token;
      url += "&storagePackage_id=" + this.Package.storagePackage_id;
      url += "&selectedMonth=" + this.selectedMonth;
      this.URLPayment = url;
      setTimeout(function() {
        document.getElementById("payment-btn").click();
      }, 200);
    },
    cancel() {
      this.dialog = false;
      this.Package = {};
      this.selectedMonth = 1;
      this.URLPayment = "";
    }
  },
  computed: {
    ...mapGetters({
      userStorageList: "userStorageList",
      userStorageLoading: "userStorageLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
</style>