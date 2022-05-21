<template>
  <div class="barContent">
    <strong>Số lượng người dùng: {{ rows }}</strong>
    <b-table
      id="my-table"
      striped
      hover
      :items="listUsers"
      :fields="fields"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="9"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import User from "../../../api/admin/user.js";
export default {
  data() {
    return {
      listUsers: [],
      currentpage: 1,
      rows: 1,
      fields: [
        {
          key: "username",
          label: "Tài Khoản",
          sortable: true,
        },
        {
          key: "fullname",
          label: "Tên Người Dùng",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    async fetchUser() {
      const data = await User.loadUser(this.currentpage);
      this.listUsers = data.results;
      this.rows = data.count;
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style>
</style>