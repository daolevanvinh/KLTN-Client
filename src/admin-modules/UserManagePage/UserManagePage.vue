<template>
  <v-app>
    <v-skeleton-loader
      v-if="adminGetListUsersLoading == true"
      ref="skeleton"
      :boilerplate="boilerplate"
      :type="type"
      :tile="tile"
      width="100%"
      class="mx-auto"
    ></v-skeleton-loader>
    <v-data-table
      v-else
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Quản lý tài khoản</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Thêm mới</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field v-model="editedItem.admin_id" label="Tài khoản"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field v-model="editedItem.name" label="Họ tên"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.phone" label="Số điện thoại"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-flex xs12>
                        <v-select
                          v-model="editedItem.admintype_id"
                          :items="typeList"
                          item-text="text"
                          return-object
                          label="Chức vụ"
                        ></v-select>
                      </v-flex>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.address" label="Địa chỉ"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:item.disable="{ item }">
        <v-simple-checkbox v-model="item.active" @click="deleteItem(item)" disabled></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>

        <v-icon v-if="item.active" @click="deleteItem(item)">mdi-account-remove</v-icon>
        <v-icon v-else @click="activeItem(item)">mdi-account-check</v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.all";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Tài khoản",
        align: "start",
        sortable: false,
        value: "admin_id"
      },
      { text: "Họ và tên", value: "name", width: "20%" },
      { text: "Số điện thoại", value: "phone" },
      { text: "Địa chỉ", value: "address" },
      { text: "Ngày tham gia", value: "created_at" },
      { text: "Trạng thái hoạt động", value: "disable", sortable: true },
      { text: "Hành động", value: "actions", sortable: false }
    ],
    desserts: [],

    select: "Programming",
    items: [],

    typeList: [],

    //skeleton
    boilerplate: false,
    tile: false,
    type: "table",

    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    ...mapGetters({
      adminGetListUsersLoading: "adminGetListUsersLoading"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Chỉnh sửa";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      var vm = this;
      this.$store.dispatch("adminGetListUser").then(function(response) {
        //////console.log("dsadsfdg", response.data.list)
        //////console.log("type",response.data.type)
        vm.items = response.data.type;
        //////console.log("type of items",vm.items)
        //////console.log("tyoesad",vm.typeList)
        vm.desserts = response.data.list;
        vm.handleData();
        vm.handleDataComboBox();
      });
    },
    handleData() {
      for (let i = 0; i < this.desserts.length; i++) {
        if (this.desserts[i].disable == 0) {
          this.desserts[i].active = true;
        } else {
          this.desserts[i].active = false;
        }
      }
    },
    handleDataComboBox() {
      for (let i = 0; i < this.items.length; i++) {
        var text = this.items[i].type;
        var value = this.items[i].admin_type_id;
        this.typeList.push({ value: value, text: text });
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      // ////console.log("dsadkbk",this.items)
      // ////console.log("hung",this.typeList)
      // ////console.log("editedIndex", this.editedIndex)
      this.editedItem = Object.assign({}, item);
      // this.dialog = true;
      //////console.log("admintype_id",obj.admintype_id)
      this.dialog = true;
      // confirm("Are you sure you want to delete this item?") &&
      //   this.desserts.splice(index, 1);
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      // confirm("Are you sure you want to delete this item?") &&
      //   this.desserts.splice(index, 1);
      Swal.fire({
        title: "Bạn có chắc vô hiệu hóa tài khoản này ?",
        text: "Thao tác sẽ không thể hoàn lại!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vô hiệu hóa tài khoản này"
      }).then(result => {
        if (result.value) {
          Swal.fire("Đã vô hiệu hóa tài khoản !");
            var vm = this;
            this.$store
              .dispatch("adminDeleteUser", this.desserts[index].admin_id)
              .then(function(response) {
                vm.initialize();
                vm.close();
            });
        }
      });
    
    },
    activeItem(item) {
      const index = this.desserts.indexOf(item);
      ////console.log("ac", this.desserts[index].admin_id);
      var vm = this;
      this.$store
        .dispatch("adminActiveUser", this.desserts[index].admin_id)
        .then(function(response) {
          vm.initialize();
          vm.close();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } else {
      //   this.desserts.push(this.editedItem);
      // }
      // this.close();

      let objUpdate = {
        admin_id: this.editedItem.admin_id,
        name: this.editedItem.name,
        phone: this.editedItem.phone,
        address: this.editedItem.address,
        admintype_id: this.editedItem.admintype_id
      };

      let objInsert = {
        admin_id: this.editedItem.admin_id,
        name: this.editedItem.name,
        phone: this.editedItem.phone,
        address: this.editedItem.address,
        admintype_id: this.editedItem.admintype_id.value
      };
      if (this.editedIndex > -1) {
        ////console.log("vào edit");
        var vm = this;
        this.$store
          .dispatch("adminEditUser", objUpdate)
          .then(function(response) {
            vm.initialize();
            vm.close();
          });
      } else {
        ////console.log("vào insert");
        var vm = this;
        this.$store.dispatch("adminInsertUser", objInsert).then(response => {
          vm.initialize();
        });
      }
      this.close();
    }
  }
};
</script>