<template>
  <div class="barContent">
    <b-container class="productsList">
      <b-row>
        <b-col cols="4" v-for="item in listProduct" :key="item.id">
          <b-container>
            <b-row>
              <b-card
                :title="item.name"
                :img-src="item.image ? item.image : item.image_url"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2"
                img-width="280"
                img-height="280"
              >
                <b-card-text>
                  {{ item.description }}
                </b-card-text>

                <div>
                  <router-link :to="`admin/product/${item.id}`"
                    >Chi Tiet</router-link
                  >
                  <b-button v-b-modal.edit @click="getdata(item)">Edit</b-button>

                  <b-button v-b-modal.delete @click="getId(item)">xoa</b-button>
                </div>
              </b-card>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="edit"
      title="BootstrapVue"
      @show="turnOnEdit"
      @hide="turnOffEdit"
      :hide-footer="true"
      size="xl"
    >
      <Edit v-if="isEDit && infoProduct != {}" :product="infoProduct" />
    </b-modal>
    <b-modal id="delete" title="BootstrapVue" :hide-footer="true">
      <p class="my-4">Bạn có chắc chắn xóa?</p>
      <b-button class="mt-3" block @click="acceptDelete(idProduct)"
        >Accept</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import Home from "../../../api/home.js";
import Product from "../../../api/admin/product.js";
import Edit from "../../../components/adminComponents/product/Edit.vue";
export default {
  components: {
    Edit,
  },
  data() {
    return {
      listProduct: [],
      isEDit: false,
      infoProduct: {},
      idProduct: null,
    };
  },
  methods: {
    async fetchProduct() {
      const result = await Home.getProduct();
      console.log(result);
      this.listProduct = result;
    },
    turnOnEdit() {
      this.isEDit = true;
    },
    turnOffEdit() {
      this.isEDit = false;
    },
    getdata(product) {
      this.infoProduct = product;
      console.log(this.infoProduct);
    },
    getId(product) {
      this.idProduct = product.id;
      console.log(this.idProduct);
    },
    acceptDelete() {
      Product.deleteProduct(this.idProduct);
      this.$bvModal.hide("delete");
      let index = this.listProduct.findIndex(
        (item) => item.id === this.idProduct
      );
      this.listProduct.splice(index, 1);
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>

<style>
.barControl {
  width: 22%;
  position: fixed;
}
.home {
  display: flex;
  width: 100%;
}
.barContent {
  margin-left: 22%;
  width: 100%;
  background: whitesmoke;
}
.inputSearch {
  color: hsla(0, 0%, 100%, 0.9);
  background-color: transparent;
  border-width: 0px;
  border: none;
  outline: none;
  padding: 2px;
  margin: 5px;
}
.searchContainer {
  border: 1px white solid;
  border-radius: 20px;
  width: 235px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}
.searchButton {
  margin-right: 10px;
}
.searchPosition {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: 14px;
  right: 35px;
}
.imageContainer {
  width: 280px;
  height: 280px;
  background-size: contain;
  background-repeat: no-repeat;
}
.underbackground {
  width: 100%;
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
  height: 400px;
  position: fixed;
  margin-top: -100px;
}
.searchStyle {
  width: 100%;
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
  height: 100px;
}
</style>