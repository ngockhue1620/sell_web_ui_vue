<template>
  <div class="barContent">
    <b-container class="productsList">
      <b-row>
        <b-col cols="4" v-for="item in listProduct" :key="item.id">
          <b-container>
            <b-row>
              <b-card
                :title="item.name"
                :img-src="item | handleImageUrl"
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

                <div class="d-flex justify-content-between">
                  <router-link
                    class="btn btn-primary"
                    :to="`admin/product/${item.id}`"
                    >Chi Tiet</router-link
                  >
                  <b-button
                    v-b-modal.edit
                    @click="getdata(item)"
                    variant="primary"
                    >Sửa</b-button
                  >

                  <b-button
                    v-b-modal.delete
                    @click="getId(item)"
                    variant="primary"
                    >Xóa</b-button
                  >
                </div>
              </b-card>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <div class="d-flex justify-content-end">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="9"
        aria-controls="my-table"
      ></b-pagination>
    </div>
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
        >Chấp Nhận</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import Home from "../../../api/home.js";
import Product from "../../../api/admin/product.js";
import Edit from "../../../components/adminComponents/product/Edit.vue";
import constances from "../../../constance/const";
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
      currentPage: 1,
      rows: 1,
    };
  },
  filters: {
    handleImageUrl(product) {
      let product_url = product.image ? product.image : product.image_url;
      if (
        product_url &&
        !product_url.startsWith("http") &&
        product_url.startsWith("/images")
      ) {
        product_url = constances.URL + product_url;
      }
      return product_url;
    },
  },
  watch: {
    currentPage() {
      this.fetchProduct();
    },
  },
  methods: {
    async fetchProduct() {
      const data = await Home.getProduct(this.currentPage);
      this.listProduct = data.results;
      this.rows = data.count;
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