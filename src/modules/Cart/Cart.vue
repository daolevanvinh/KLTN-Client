<template>
  <div style="margin-bottom: 3rem">
    <div id="Top" class="col-12">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-3">
              <h5>
                <i class="fas fa-home"></i>/ Shopping Cart
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <!--Body-->
        <div class="container1">
          <div class="row" id="body" v-if="userCourseListCartLoading">
            <v-responsive class="mx-left mb-12" max-width="700">
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="boilerplate"
                :type="type"
                :tile="tile"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="boilerplate"
                :type="type"
                :tile="tile"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="boilerplate"
                :type="type"
                :tile="tile"
                class="mx-auto"
              ></v-skeleton-loader>
            </v-responsive>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!userCourseListCartLoading && userCourseListCartList.length == 0"
      class="text-center"
    >
      <div style="margin-left: -2rem">
        <i class="fas fa-shopping-cart" style="font-size: 10rem"></i>
      </div>
      <div style="margin-top: 3rem">
        <router-link
          type="button"
          :to="{name: 'search-page'}"
          class="btn btn-danger btn-lg"
          style="color: white;"
        >Go to shopping</router-link>
      </div>
    </div>
    <div
      class="my-container"
      v-if="!userCourseListCartLoading && userCourseListCartList.length > 0"
    >
      <div style="font-size: 18px"><b style="font-size: 20px">{{userCourseListCartList.length}}</b>&nbsp;in Cart List</div>
      <div class="row">
        <div class="col-9">
          <div class="course-item" v-for="(course,index) in userCourseListCartList" :key="index">
            <div class="row">
              <div class="col-2">
                <router-link :to="{name: 'course-detail-page', params: {id: course.course_id}}">
                  <img :src="imageURL+'/'+course.course_id+'/'+course.course_id+'.png'" />
                </router-link>
              </div>
              <div class="col-6">
                <div>
                  <router-link :to="{name: 'course-detail-page', params: {id: course.course_id}}">
                    <b>{{course.name}}</b>
                  </router-link>
                </div>
                <div>By&nbsp;{{course.instructor.name}}</div>
              </div>
              <div class="col-2 offset-2">
                <b
                  style="color: red;"
                >{{course.price_tier.priceTier.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</b>
              </div>
            </div>
            <a @click="deleteCart(course.course_id)" class="my-link" href="#">delete</a>
          </div>
        </div>
        <div class="col-3" style="padding-left: 1.5rem;">
          <div style="font-size: 18px">Total:</div>
          <div style="margin: 1rem 0">
            <h2 style="color:red;">{{totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</h2>
          </div>
          <div>
            <v-btn
              height="3rem"
              width="100%"
              style="background-color:#ec5252;color:white"
              :href="apiURL + '/user/payment?token='+token"
              target="_blank"
            >Payment</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Recommend from "../../components/RecommendItem/RecommendItem";
import { mapGetters } from "vuex";
import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.all";
import apiConfig from "../../API/api.json";
export default {
  data() {
    return {
      imageURL: apiConfig.imageURL,
      tempCourseList: [],
      boilerplate: false,
      tile: false,
      type: "list-item-avatar-three-line",
      types: [],
      totalPrice: 0,
      apiURL: apiConfig.apiURL,
      token: localStorage.token
    };
  },
  created() {
    this.$store.commit("ShowHeaderUser");
    this.$store.commit("ShowFooterUser");
    this.$store.dispatch("userGetCart").then(() => {
      this.calculateTotalPrice();
    });
  },

  methods: {
    deleteCart(course_id) {
      this.$store.dispatch("userDeleteCart", course_id);
    },
    calculateTotalPrice() {
      this.totalPrice = 0;
      this.userCourseListCartList.forEach(course => {
        this.totalPrice += course.price_tier.priceTier;
      });
    }
  },
  computed: {
    ...mapGetters({
      userCourseListCartList: "userCourseListCartList",
      userCourseListCartLoading: "userCourseListCartLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
.my-container {
  width: 86%;
  margin: 1rem 7%;
}
a {
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
    color: black;
  }
}

.my-link {
  position: absolute;
  top: 0.85rem;
  right: 10rem;
  width: 3rem;
  height: 1.5rem;
  z-index: 3;
  text-align: center;
  color: #007791;
  :hover {
    text-decoration: underline;
  }
}
.course-item {
  position: relative;
  .row {
    border: 1px solid silver;
    :first-child {
      border-bottom: none;
    }
    :last-child {
      border-bottom: none;
    }
    .col-2 {
      img {
        width: 100%;
        height: 4rem;
      }
    }
  }
}

#Top {
  background-color: #505763;
  width: 100%;
  .row {
    .col-3 {
      text-align: left;
      margin-left: 10%;
      width: 100%;
      color: whitesmoke;
    }
  }
}
.container1 {
  text-align: left;
  margin-left: 12%;
  width: 100%;
  #body {
    width: 100%;
    .col-8 {
      text-align: left;
      margin-left: 1.5%;
      width: 100%;
      #rowCart {
        border: solid 0.2px rgb(247, 248, 250);
        #option {
          color: rgb(51, 102, 255);
          font-size: 10pt;
          a {
            font-size: 10pt;
          }
          a:hover {
            color: rgb(5, 5, 20);
          }
        }
        #price {
          margin-left: 5%;
          text-align: right;
          font-size: 10pt;
          #realPrice {
            font-weight: bold;
          }
        }
      }
    }
    #totalCart {
      margin-left: 3%;

      .title {
        border-bottom: 1px solid whitesmoke;
        border-bottom-width: 100%;
        padding-bottom: 5%;
      }
      #buttonCheckout {
        width: 100%;
        color: white;
        background-color: rgb(236, 82, 82);
      }
      #inputCoupon {
        padding-top: 5%;

        #labelCoupon {
          button {
            color: red;
          }
        }
      }
    }
  }
}
</style>