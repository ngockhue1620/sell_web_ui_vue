<template>
  <div class="barContent">
    <div class="searchStyle">
      <div class="searchPosition">
        <div class="searchContainer">
          <input
            placeholder="Tìm Kiếm"
            class="inputSearch"
            v-model="searchInput"
            @keyup.enter="search"
          />
          <span class="searchButton btn" @click="search">
            <b-icon icon="search"></b-icon>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="underbackground"></div> -->
    <b-container class="productsList">
      <b-row style="margin-top: 3px">
        <b-col cols="4" v-for="item in listProducts" :key="item.id">
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
                <!-- <div class="flex-container">
                  <div class="button-hover">
                    <b-button variant="primary" size="sm" @click="addProductToCart(item)"
                      >Them Vao Gio Hang</b-button
                    >
                  </div>
                  <div class="div-chi-tiet">
                    <router-link class="btn btn-primary btn-sm" :to="`product/${item.id}`">Chi Tiet</router-link>
                  </div>
                </div> -->
                <div class="d-flex justify-content-between">
                  <b-button
                    class="width-button"
                    variant="primary"
                    @click="addProductToCart(item)"
                    >Mua Hang</b-button
                  >
                  <router-link
                    class="btn btn-primary width-button"
                    :to="`product/${item.id}`"
                    >Chi Tiet</router-link
                  >
                </div>
              </b-card>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <div class="d-flex justify-content-center" v-if="listProducts.length > 0">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import searchInputAPI from "../../api/product.js";
import constances from "../../constance/const";
import Home from "../../api/home";
export default {
  data() {
    return {
      searchInput: "",
      currentPage: 1,
      rows: 1,
      perPage: 9,
    };
  },
  computed: {
    windowHeight() {
      return {
        height: `${window.innerHeight}px`,
      };
    },
    ...mapGetters(["listProducts", "isLogin"]),
  },
  watch: {
    currentPage() {
      this.fetchProduct();
    },
  },
  methods: {
    ...mapActions(["addToCart", "saveProduct"]),
    async fetchProduct() {
      const data = await Home.getProduct(this.currentPage);
      this.rows = data.count;
      this.saveProduct(data.results);
    },
    addProductToCart(item) {
      if (!this.isLogin || this.isLogin == null) {
        alert("Bạn phải đăng nhập trước khi mua hàng");
        return;
      }

      const value = {
        product: item,
        quantity: 1,
      };
      this.addToCart(value);
    },
    async search() {
      const data = await searchInputAPI.searchInput(
        this.searchInput,
        this.currentPage
      );
      this.saveProduct(data.results);
      this.rows = data.count;
    },
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

.flex-container {
  display: flex;
  /* background-color: DodgerBlue; */
}
.div-chi-tiet {
  margin-left: auto;
}
.card:hover {
  box-shadow: 0 10px 10px 10px rgba(121, 117, 117, 0.2);
}
.button-hover:hover {
  box-shadow: 4px 4px 4px 4px rgba(60, 122, 238, 0.2);
}
.width-button {
  width: 100%;
  margin: 5px;
}
.searchContainer:hover {
  box-shadow: 4px 4px 4px 4px rgba(60, 122, 238, 0.2);
}
</style>