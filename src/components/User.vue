<template>
  <div>
    <div class="home">
      <div class="barControl">
        <ToolBar />
      </div>
      <router-view />
    </div>
    <div class="footer">
      <div style="width: 30%"></div>
      <div style="width: 100%">
        <div class="d-flex justify-content-between">
          <div class="margin_item">
            <p class="margin_item"><strong>Author</strong>: Ngoc Khue</p>
            <p class="margin_item"><strong>Class</strong>: 18CNTT4</p>
          </div>

          <div class="margin_item">
            <p class="margin_item">Báo Cáo Thực Tập</p>
            <p class="margin_item">Django and VueJS</p>
          </div>
          <div class="margin_item">
            <img
              class="margin_item"
              style="width: 50px"
              src="https://images.viblo.asia/0ef80266-6081-48df-8fa0-9ae00adb7e8e.jpg"
              alt=""
            />
            <br />
            <img
              class="margin_item"
              style="width: 50px"
              src="https://vuejs.org/images/logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../api/home.js";
import ToolBar from "./userComponents/ToolBar";
// import Colors from "../defaultValue/colors.js";
import { mapActions } from "vuex";
export default {
  components: {
    ToolBar,
  },
  data() {
    return {
      listProduct: [],
    };
  },
  methods: {
    ...mapActions(["saveProduct"]),
    async fetchProduct() {
      const result = await Home.getProduct();
      console.log(result);
      this.saveProduct(result);
    },
  },
  mounted() {
    // this.fetchProduct();
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
.footer {
  margin-top: 200px;
  display: flex;
  height: 100px;
}
.margin_item {
  margin: 5px;
}
</style>