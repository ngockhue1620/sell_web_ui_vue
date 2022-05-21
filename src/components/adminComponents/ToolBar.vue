<template>
  <div class="card controlBar" :style="windowHeight">
    <b-list-group>
      <b-list-group-item>
        <h3><router-link to="/">Tạp Hóa Online</router-link></h3>
      </b-list-group-item>
      <b-list-group-item>
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

      <b-list-group-item>
        <router-link to="/admin" class="nav-link">
          Danh sach san pham
        </router-link>
      </b-list-group-item>
      <b-list-group-item>
        <router-link to="/admin/add-product" class="nav-link">
          Them san pham
        </router-link>
      </b-list-group-item>
      <b-list-group-item>
        <router-link to="/admin/manage-order" class="nav-link">
          Quan li don hang
        </router-link>
      </b-list-group-item>
      <b-list-group-item>
        <router-link to="/admin/success-order" class="nav-link">
          Đơn Hàng Đã Duyệt
        </router-link>
      </b-list-group-item>
      <b-list-group-item>
        <router-link to="/admin/category" class="nav-link">
          Them danh muc
        </router-link>
      </b-list-group-item>
      <b-list-group-item @click="logout">
        <p class="nav-link">Đăng Xuất</p></b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
    windowHeight() {
      return {
        height: `${window.innerHeight}px`,
      };
    },
  },
  methods: {
    ...mapActions(["loginOrLogout"]),
    logout() {
      this.loginOrLogout({
        type: "logout",
      });
      window.location.reload();
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