<template>
  <div>
    <h3>Storage Space</h3>
    <div class="row">
      <div class="col-3">
        <div v-if="!userStorageUserLoading" id="used-chart"></div>
        <v-skeleton-loader v-else type="image"></v-skeleton-loader>
      </div>
      <div class="col-3">
        <div id="free-chart" v-if="!userStorageUserLoading"></div>
        <v-skeleton-loader v-else type="image"></v-skeleton-loader>
      </div>
      <div class="col-3" :id="userStorageUserLoading ? '' : 'package-content'">
        <div v-if="userStorageUserList[0] !=null && !userStorageUserLoading">
          <ul style="margin-top: 1.5rem;margin-left: 1rem">
            <li>
              <div>Package Name: {{JSON.parse(userStorageUserList[0].json_storagePackage).name}}</div>
            </li>
            <li>
              <div>Free Space: {{JSON.parse(userStorageUserList[0].json_storagePackage).storage_size - (userStorageUserList[0].used_space / (1024*1024*1024)).toFixed(2)}}</div>
            </li>
            <li>
              <div>Used Space: {{(userStorageUserList[0].used_space / (1024*1024*1024)).toFixed(2)}}(Gb)</div>
            </li>
            <li>
              <div>Start: {{userStorageUserList[0].created_at}}</div>
            </li>
            <li>
              <div>Month: {{userStorageUserList[0].noMonth}}</div>
            </li>
          </ul>
        </div>
        <v-skeleton-loader v-if="userStorageUserLoading" type="image"></v-skeleton-loader>
      </div>
    </div>
    <h3 style="margin-top: 1rem">Your Business</h3>
    <v-select
      @change="handleData()"
      :loading="userStorageUserLoading"
      :items="tempCourseList"
      v-model="selectedCourse"
    ></v-select>
    <div class="row">
      <div class="col-9">
        <v-data-table height="30rem" :headers="header" :items="tempList">
          <template v-slot:item.price="data">{{formatMoney(data.item.price)}}</template>
          <template v-slot:loading>Loading...</template>
        </v-data-table>
      </div>
      <div class="col-3">
        <div v-if="!userStorageUserLoading">
          <h4>Total Coin:</h4>
          <h3 style="color:red">{{formatMoney(totalPrice)}}</h3>
        </div>
        <div v-else>
          <v-skeleton-loader type="text"></v-skeleton-loader>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apiConfig from "../../API/api.json";
import ApexCharts from "apexcharts";
export default {
  data() {
    return {
      optionsUsedSpace: {
        chart: {
          width: 250,
          height: 200,
          type: "radialBar",
          color: "#3BFAFA"
        },
        series: [70],
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
              color: "#3BFAFA"
            },
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#FFFFFF",
                fontSize: "18px"
              },
              value: {
                color: "#FFFFFF",
                fontSize: "30px",
                show: true
              }
            }
          },
          pie: {
            donut: {
              color: "#3BFAFA"
            }
          }
        },
        markers: {
          colors: ["#FFFFFF", "#3BFAFA"]
        },
        stroke: {
          lineCap: "round",
          colors: "#3BFAFA"
        },
        fill: {
          colors: ["#FFFFFF", "#3BFAFA"]
        },
        labels: ["Used Space"]
      },
      optionsFreeSpace: {
        chart: {
          width: 250,
          height: 200,
          type: "radialBar",
          color: "#3BFAFA"
        },
        series: [70],
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
              color: "#3BFAFA"
            },
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#FFFFFF",
                fontSize: "18px"
              },
              value: {
                color: "#FFFFFF",
                fontSize: "30px",
                show: true
              }
            }
          },
          pie: {
            donut: {
              color: "#3BFAFA"
            }
          }
        },
        markers: {
          colors: ["#FFFFFF", "#3BFAFA"]
        },
        stroke: {
          lineCap: "round",
          colors: "#3BFAFA"
        },
        fill: {
          colors: ["#FFFFFF", "#3BFAFA"]
        },
        labels: ["Free Space"]
      },
      header: [
        {
          value: "name",
          text: "Course Name",
          width: "15%"
        },
        {
          value: "price",
          text: "Price",
          width: "15%"
        },
        {
          value: "at",
          text: "At Time",
          width: "15%"
        }
      ],
      dialog: false,
      Package: {},
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedMonth: 1,
      apiURL: apiConfig.apiURL,
      URLPayment: "",
      tempList: [],
      selectedCourse: -1,
      tempCourseList: [],
      totalPrice: 0
    };
  },
  created() {
    this.$store.dispatch("userGetStorageUser").then(() => {
      this.tempCourseList.push({ value: -1, text: "All" });
      for (let course of this.userStorageUserCourseList) {
        this.tempCourseList.push({
          value: course.course_id,
          text: course.name
        });
      }

      this.optionsUsedSpace.series[0] = (
        ((this.userStorageUserList[0].used_space / (1024 * 1024 * 1024)) *
          100) /
        JSON.parse(this.userStorageUserList[0].json_storagePackage).storage_size
      ).toFixed(2);

      ///
      this.optionsFreeSpace.series[0] = (100 - this.optionsUsedSpace.series[0]).toFixed(2);

      let chart = new ApexCharts(
        document.querySelector("#used-chart"),
        this.optionsUsedSpace
      );
      let freechart = new ApexCharts(
        document.querySelector("#free-chart"),
        this.optionsFreeSpace
      );
      chart.render();
      freechart.render();
      // this.selectedCourse = this.userStorageUserCourseList[0].course_id
      this.handleData();
    });
  },
  methods: {
    formatMoney(price) {
      return price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND"
      });
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
    },
    handleData() {
      this.tempList = [];
      this.totalPrice = 0;
      for (let course of this.userStorageUserCourseList) {
        for (let bill of this.userStorageUserBillList) {
          let infos = JSON.parse(bill.currentInfo);
          for (let info of infos) {
            let flag_1 =
              info.course_id == course.course_id &&
              course.course_id == this.selectedCourse &&
              this.selectedCourse != -1;
            let flag_2 =
              info.course_id == course.course_id && this.selectedCourse === -1;
            if (flag_1 || flag_2) {
              this.tempList.push({
                name: course.name,
                price: info.priceTier,
                at: info.course_updated
              });
              this.totalPrice += info.priceTier;
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      userStorageUserList: "userStorageUserList",
      userStorageUserLoading: "userStorageUserLoading",
      userStorageUserCourseList: "userStorageUserCourseList",
      userStorageUserBillList: "userStorageUserBillList"
    })
  }
};
</script>
<style lang="scss" scoped>
#used-chart {
  background-color: #098393;
  border-radius: 5px;
  padding-left: 1rem;
  color: white !important;
}

#free-chart {
  background-color: #f75027;
  border-radius: 5px;
  padding-left: 1rem;
  color: white !important;
}

#package-content {
  background-color: #f3cc4a;
  margin: 0.8rem;
  color: black;
  font-weight: 600;
  border-radius: 5px;
  ul {
    li {
      margin: 0.25rem 0;
    }
  }
}
</style>