<template>
  <b-container>
    <div class="login_form" :style="windowHeight">
      <form @submit.prevent="handleForm">
        <b-form-input v-model="user" placeholder="Tai khoan"></b-form-input>
        <b-form-input
          v-model="password"
          placeholder="Mat Khau"
          type="password"
        ></b-form-input>
        <b-button type="submit">Dang nhap</b-button>
      </form>
    </div>
  </b-container>
</template>

<script>
import UserApi from "../../api/userApi";
import { mapActions } from "vuex";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      user: "",
      password: "",
    };
  },
  computed: {
    windowHeight() {
      return {
        height: `${window.innerHeight}px`,
      };
    },
  },
  methods: {
    ...mapActions(["loginOrLogout"]),
    async handleForm() {
      const result = await UserApi.login({
        username: this.user,
        password: this.password,
      });
      if (!result) return;
      this.loginOrLogout({
        type: "login",
        user: result.user,
        token: result.token,
      });
      const is_admin = jwt_decode(result.token);

      if (is_admin.admin) {
        this.$router.push("/admin");
      } else {
        alert("Have some Error");
      }
    },
  },
};
</script>

<style>
.login_form {
  display: flex;
  justify-content: center;
  align-self: center;
}
</style>