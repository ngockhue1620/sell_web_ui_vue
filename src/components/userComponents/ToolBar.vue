<template>
  <div class="controlBar background-gray" :style="windowHeight">
    <b-list-group v-if="isLogin">
      <b-list-group-item class="turnOff-border margin-2px background-gray">
        <h3 style="text-align: center; font-size: 35px;"><router-link style="text-decoration: none;" to="/">Ngoc Khue Shop</router-link></h3>
      </b-list-group-item>
      <b-list-group-item class="turnOff-border margin-2px background-gray" @click="showUserModal">
        <div>
          <b-avatar
            href="javascript:;"
            size="lg"
            :src="
              user.avatar
                ? user.avatar
                : 'https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/team-4.jpg'
            "
          ></b-avatar>
          <b>{{ user.fullname }}</b>
        </div>
      </b-list-group-item>
      <b-list-group-item class="margin-2px hover-list-group-item background-gray">
        <router-link to="/cart" class="nav-link"
          ><span>
            <b-icon icon="cart"></b-icon>
          </span>
          Gio Hang
          {{ " " + totalProductInCart }}
        </router-link>
      </b-list-group-item>
      <b-list-group-item class="margin-2px hover-list-group-item background-gray">
        <router-link to="/order-in-progress" class="nav-link">
          <span><b-icon icon="journals"></b-icon></span>
          Dang xu ly
        </router-link>
      </b-list-group-item>
      <b-list-group-item class="margin-2px hover-list-group-item background-gray">
        <router-link to="/order-history" class="nav-link">
          <span><b-icon icon="stopwatch"></b-icon></span>Lich su mua hang
        </router-link>
      </b-list-group-item>
    </b-list-group>
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
    <b-modal
      id="user"
      size="xl"
      v-if="isLogin"
      title="Thông tin cá nhân"
      @show="isShowModal"
      @hide="isShowModal"
      :hide-footer="true"
    >
      <b-container>
        <User v-if="showUserModal" />
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserApi from "../../api/userApi";
import User from "../userComponents/user/User.vue";
export default {
  components: {
    User,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        fullname: "",
      },
      isLoginForm: true,
      showUserInfo: false,
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

    showUserModal() {
      this.$bvModal.show("user");
    },

    isShowModal() {
      this.showUserInfo = !this.showUserInfo;
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
.margin-2px {
  margin: 4px;
}
.turnOff-border {
  border: 0px;
}
.hover-list-group-item:hover {
  box-shadow: 0 2px 2px 2px rgba(121, 117, 117, 0.2);
}
/* .background-gray {
  background: grey;
} */
.background-gray {
    background: #e9ecef;
}
</style>