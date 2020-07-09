<template>
  <v-tab-item :value="'msg-tab'">
    <v-data-table
      :headers="header"
      :items="userHistoryTransactionList"
      :loading="userHistoryTransactionLoading"
    >
      <template v-slot:item.vnp_Amount="data">{{formatMoney(data.item.vnp_Amount)}}</template>
      <template v-slot:item.coursetList="data">
        <ul>
          <li
            style="margin: 0.5rem 0"
            v-for="(course, index) in JSON.parse(data.item.currentInfo)"
            :key="index"
          >{{course.name}}</li>
        </ul>
      </template>
    </v-data-table>
  </v-tab-item>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      header: [
        { text: "Time", value: "updated_at", width: "17%" },
        { text: "Total Price", value: "vnp_Amount", width: "13%" },
        { text: "Course List", value: "coursetList", width: "30%" },
        { text: "Card Type", value: "vnp_CardType", width: "10%" },
        { text: "Transaction ID", value: "vnp_BankTranNo", width: "15%" },
        { text: "Bank ID", value: "vnp_BankCode", width: "15%" }
      ]
    };
  },
  created() {
    this.$store.dispatch("userHistoryTransaction");
  },
  methods: {
    formatMoney(amount) {
      return parseInt(amount).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND"
      });
    }
  },
  computed: {
    ...mapGetters({
      userHistoryTransactionList: "userHistoryTransactionList",
      userHistoryTransactionLoading: "userHistoryTransactionLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
</style>