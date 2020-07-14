<template>
  <div>
    <v-app>
      <v-card style="padding: 1rem">
        <h5>Package list for business</h5>
        <div class="row">
          <div class="col-6">
            <v-text-field label="Search..." v-model="search"></v-text-field>
          </div>
          <div class="col-2 offset-4">
            <v-btn
              style="float: right"
              color="primary"
              @click="dialog = true;setDefault"
            >New Package</v-btn>
          </div>
        </div>
        <v-data-table
          :headers="header"
          :items="adminStoragePackageList"
          :loading="adminStoragePackageLoading"
          :search="search"
        >
          <template v-slot:item.action="data">
            <a
              style="margin-right: 1rem"
              @click="dialog=true;insert=false;Package= { storagePackage_id: data.item.storagePackage_id, name: data.item.name, storage_size: data.item.storage_size, price: data.item.price, note: data.item.note }"
            >Edit</a>
            <a @click="deletePackage(data.item)">Delete</a>
          </template>
        </v-data-table>
      </v-card>
      <v-dialog persistent v-model="dialog" width="400">
        <v-card>
          <div style="padding: 1rem;border-bottom: 1px solid silver">
            <h3>
              <div v-if="insert">Create New Package</div>
              <div v-else>Update {{Package.name}}</div>
            </h3>
          </div>
          <div style="padding: 1rem">
            <v-text-field v-model="Package.name" label="Package Name"></v-text-field>
            <v-text-field
              suffix="GB"
              type="number"
              v-model="Package.storage_size"
              label="Package Size"
            ></v-text-field>
            <v-text-field suffix="$" type="number" v-model="Package.price" label="Package Price"></v-text-field>
            <v-textarea label="Note" style="margin-top: 0.5rem" outlined v-model="Package.note"></v-textarea>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="insert" color="primary" @click="insertPackage()">Create</v-btn>
            <v-btn v-if="!insert" color="primary" @click="updatePackage()">Save</v-btn>
            <v-btn color="red" @click="dialog=false;setDefault()">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      insert: true,
      search: "",
      header: [
        { value: "storagePackage_id", text: "Package ID", width: "10%" },
        { value: "name", text: "Package Name", width: "25%" },
        { value: "storage_size", text: "Storage Size (Gb)", width: "15%" },
        { value: "price", text: "Price ($)", width: "15%" },
        { value: "updated_at", text: "Last Update", width: "20%" },
        { value: "action", text: "" }
      ],
      Package: {}
    };
  },
  created() {
    this.setDefault();
    this.$store.dispatch("adminGetStoragePackage");
  },
  methods: {
    setDefault() {
      this.Package = {
        name: "",
        price: 0,
        storage_size: 0
      };
      this.insert = true;
      this.dialog = false;
    },
    insertPackage() {
      if (
        this.Package.name != "" ||
        this.Package.price != null ||
        this.Package.storage_size != ""
      ) {
        this.$swal.showLoading();
        this.$store
          .dispatch("adminInsertStoragePackage", this.Package)
          .then(response => {
            let icon = "";
            response.data.RequestSuccess === true
              ? (icon = "success")
              : (icon = "error");
            this.$swal({
              icon: icon,
              title: response.data.msg
            });
            if (response.data.RequestSuccess === true) {
              this.dialog = false;
            }
          });
      } else {
        this.$swal({
          icon: "error",
          title: "There are missing something!"
        });
      }
    },
    updatePackage() {
      if (
        this.Package.name != "" &&
        this.Package.price != null &&
        this.Package.storage_size != "" &&
        this.Package.note != ""
      ) {
        this.$swal.showLoading();
        this.$store
          .dispatch("adminUpdateStoragePackage", this.Package)
          .then(response => {
            let icon = "";
            response.data.RequestSuccess === true
              ? (icon = "success")
              : (icon = "error");
            this.$swal({
              icon: icon,
              title: response.data.msg
            });
            if (response.data.RequestSuccess === true) {
              this.dialog = false;
            }
          });
      } else {
        this.$swal({
          icon: "error",
          title: "There are missing something!"
        });
      }
    },
    deletePackage(item) {
      this.$swal.showLoading();
      this.$store
        .dispatch("adminDeleteStoragePackage", {
          storagePackage_id: item.storagePackage_id
        })
        .then(response => {
          let icon = "";
          response.data.RequestSuccess === true
            ? (icon = "success")
            : (icon = "error");
          this.$swal({
            icon: icon,
            title: response.data.msg
          });
        });
    }
  },
  computed: {
    ...mapGetters({
      adminStoragePackageList: "adminStoragePackageList",
      adminStoragePackageLoading: "adminStoragePackageLoading"
    })
  }
};
</script>
<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>