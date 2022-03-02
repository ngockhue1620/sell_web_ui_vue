<template>
  <div class="card controlBar" :style="windowHeight">
    <ul v-if="isLogin">
      <li>
        <h3><router-link to="/">Ngoc Khue Shop</router-link></h3>
      </li>
      <li>
        <div>
          <b-avatar
            href="javascript:;"
            size="lg"
            :src="
              user.avatar
                ? user.avatr
                : 'https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/team-4.jpg'
            "
          ></b-avatar>
          <b>{{ user.fullname }}</b>
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
    <div v-else>
      <b-container>
        <h3><router-link to="/">Ngoc Khue Shop</router-link></h3>
        <b-form @submit.prevent="login">
          <b-form-group
            id="input-group-1"
            label="Tai Khoan"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.username"
              type="text"
              placeholder="Tai Khoan"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Mat Khau" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              placeholder="Mat Khau"
              type="password"
              required
            ></b-form-input>
          </b-form-group>
          <div class="buttonLogin">
            <b-button type="submit" variant="primary">Dang Ky</b-button>
            <b-button type="submit" variant="success">Dang Nhap</b-button>
          </div>
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserApi from "../../api/userApi";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    windowHeight() {
      return {
        height: `${window.innerHeight}px`,
      };
    },
    ...mapGetters(["totalProductInCart", "isLogin", "user"]),
  },
  methods: {
    ...mapActions(["loginOrLogout"]),
    async login() {
      const result = await UserApi.login(this.form);
      this.loginOrLogout({
        type: "login",
        user: result.user,
        token: result.token,
      });
    },
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
  /* background: linear-gradient(87deg, #2dce89, #2dcecc) !important; */
}
.buttonLogin {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>