<template>
  <b-card>
    <div class="container">
      <b-row>
        <b-col>Don {{ index + 1 }}</b-col>
        <b-col>Trang Thai: {{ handleStatus }}</b-col>
      </b-row>
      <b-row>
        <b-col>Dai chi: {{ order.address }}</b-col>
        <b-col>SDT: {{ order.phone }}</b-col>
      </b-row>
      <b-row>
        <b-col>ghi chu: {{ order.note ? order.note : "Khong Co" }}</b-col>
        <b-col>Tong Tine: {{ order.total }}</b-col>
      </b-row>
      <p>Ngay Tao: {{ handleTime }}</p>
      <div class="d-flex justify-content-end">
        <b-button variant="primary" @click="showOrderDetail()"
          >Chi tiet</b-button
        >
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    handleTime() {
      const splitTime = this.order?.created_at?.split("T");
      const convertTime = splitTime["0"] + " " + splitTime[1].split(".")[0];
      return convertTime;
    },
    handleStatus() {
      if (this.order?.status === 1) {
        return "Dang Xu ly";
      }
      return "Dang Hoang Thanh";
    },
  },
  methods: {
    showOrderDetail() {
      this.$emit("showOrderDetail", this.order.id);
    },
  },
};
</script>

<style>
</style>