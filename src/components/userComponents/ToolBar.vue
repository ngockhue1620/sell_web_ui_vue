<template>
  <div class="card controlBar" :style="windowHeight">
    <ul>
      <li>
        <h3><router-link to="/">Ngoc Khue Shop</router-link></h3>
      </li>
      <li>
        <div>
          <b-avatar
            href="javascript:;"
            size="lg"
            src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/team-4.jpg"
          ></b-avatar>
          <b>Khue Dao</b>
        </div>
      </li>
      <li>
        <router-link to="/cart"
          ><span>
            <b-icon icon="cart"></b-icon>
          </span>
          Gio Hang
          <span
            ><b-badge variant="danger">{{ totalProductInCart }}</b-badge></span
          ></router-link
        >
      </li>
      <li>
        <span><b-icon icon="journals"></b-icon></span>
        Dang xu ly
        <span><b-badge variant="danger">24</b-badge></span>
      </li>
      <li>
        <span><b-icon icon="stopwatch"></b-icon></span>Lich su mua hang
        <b-badge variant="danger">24</b-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    windowHeight() {
      return {
        height: `${window.innerHeight}px`,
      };
    },
    ...mapGetters(["totalProductInCart"]),
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin-left: -10px;
}
li {
  padding: 10px;
  width: 100%;
}
.controlBar {
  width: 100%;
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
}
</style>