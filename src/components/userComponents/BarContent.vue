<template>
  <div class="barContent">
    <div class="searchStyle">
      <div class="searchPosition">
        <div class="searchContainer">
          <input placeholder="search" class="inputSearch" />
          <span class="searchButton btn">
            <b-icon icon="search"></b-icon>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="underbackground"></div> -->
    <b-container class="productsList">
      <b-row>
        <b-col cols="4" v-for="item in listProducts" :key="item.id">
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
                  <b-button variant="primary" @click="addProductToCart(item)"
                    >Them Vao Gio Hang</b-button
                  >
                </div>
                <div>
                  <router-link :to="`product/${item.id}`">Chi Tiet</router-link>
                </div>
              </b-card>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["listProducts"]),
  },
  methods: {
    ...mapActions(["addToCart", "isLogin"]),
    addProductToCart(item) {
      if (!this.isLogin) {
        alert("You must login before");
        return;
      }
      const value = {
        product: item,
        quantity: 1,
      };
      this.addToCart(value);
    },
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