<template>
  <b-container>
    <form @submit.prevent="updateInfo">
      <div class="avatar">
        <b-avatar
          size="lg"
          :src="
            userInfo.avatar
              ? userInfo.avatar
              : 'https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/team-4.jpg'
          "
        ></b-avatar>
        <span v-b-modal.edit_user_avatar
          ><b-icon icon="pencil-square" variant="warning"></b-icon
        ></span>
        <b-modal id="edit_user_avatar" :hide-footer="true">
          <b-form-group label="Đường link của ảnh:">
            <b-form-input type="text" v-model="newAvatar"></b-form-input>
          </b-form-group>
          <div>
            <b-button @click="getChangeAvatarValue">Ok</b-button>
          </div>
        </b-modal>
      </div>
      <b-form-group label="Ten:">
        <b-form-input
          disabled
          type="text"
          v-model="userInfo.fullname"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Tai Khoan:">
        <b-form-input
          disabled
          placeholder="Enter name product"
          required
          v-model="userInfo.username"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Mat Khau củ:">
        <b-form-input
          placeholder="Enter description"
          required
          :disabled="!isEdit"
          v-model="userInfo.old_password"
        ></b-form-input>
        <span class="edit_password" @click="editPassword"
          ><b-icon icon="pencil-square" variant="warning"></b-icon
        ></span>
      </b-form-group>

      <b-form-group label="Mat Khau mới:" v-if="isEdit">
        <b-form-input
          placeholder="Enter description"
          required
          v-model="userInfo.new_password"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Xác nhận Khau mới:" v-if="isEdit">
        <b-form-input
          placeholder="Enter description"
          required
          v-model="userInfo.re_check_new_password"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-between" style="margin: 1rem">
        <b-button variant="success" type="submit">Cập nhập</b-button>
        <b-button @click="logout" variant="danger">Đăng xuất</b-button>
      </div>
    </form>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserApi from "../../../api/userApi";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        old_password: "",
        fullname: "",
        avatar: null,
        re_check_new_password: "",
        new_password: "",
      },
      newAvatar: "",
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["changeDataUser", "loginOrLogout"]),
    async updateInfo() {
      const result = await UserApi.updateUser(this.userInfo);
      if (result) {
        this.changeDataUser(result.user);
        window.location.reload();
      }
    },
    editPassword() {
      this.isEdit = !this.isEdit;
    },
    getChangeAvatarValue() {
      // console.log(this.newAvatar);
      if (this.newAvatar != "") {
        this.userInfo.avatar = this.newAvatar;
        this.$bvModal.hide("edit_user_avatar");
        this.newAvatar = "";
      }
    },
    logout() {
      this.loginOrLogout({
        type: "logout",
      });
      window.location.reload();
    },
  },
  mounted() {
    this.userInfo.avatar = String(this.user.avatar);
    this.userInfo.fullname = String(this.user.fullname);
    this.userInfo.username = String(this.user.username);
  },
};
</script>

<style>
.edit_password {
  display: flex;
  justify-content: flex-end;
}
.avatar {
  display: flex;
  justify-content: center;
}
</style>