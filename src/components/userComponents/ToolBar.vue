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
        <router-link to="/cart-in-progress">
          <span><b-icon icon="journals"></b-icon></span>
          Dang xu ly
          <span class="bg-badge"><b-badge variant="danger">24</b-badge></span>
        </router-link>
      </li>
      <li>
        <span><b-icon icon="stopwatch"></b-icon></span>Lich su mua hang
        <span class="bg-badge"><b-badge variant="danger">24</b-badge></span>
      </li>
    </ul>
    <div v-else>
      <b-container>
        <h3><router-link to="/">Ngoc Khue Shop</router-link></h3>
        <b-form @submit.prevent="handleForm()">
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
          <b-form-group
            id="input-group-2"
            label="Ten Hien Thi"
            label-for="input-2"
          >
            <b-form-input
              v-if="!isLoginForm"
              id="input-3"
              v-model="form.fullname"
              placeholder="Ten Hien Thi"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <div class="buttonLogin">
            <span type="submit" variant="primary" @click="isFormSignUp">{{
              isLoginForm ? "Dang ky" : "Dang Nhap"
            }}</span>
            <b-button type="submit" variant="success" value="2">{{
              !isLoginForm ? "Dang ky" : "Dang Nhap"
            }}</b-button>
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
        fullname: "",
      },
      isLoginForm: true,
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
    isFormSignUp() {
      this.isLoginForm = !this.isLoginForm;
      console.log(this.isLoginForm);
    },

    async handleForm() {
      if (this.isLoginForm) {
        const result = await UserApi.login(this.form);
        if (!result) return;
        this.loginOrLogout({
          type: "login",
          user: result.user,
          token: result.token,
        });
      } else {
        await UserApi.signUp(this.form);
      }
    },
    async signUp() {
      await UserApi.signUp(this.form);
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
.bg-badge {
  background: "#0d6efd";
}
</style>