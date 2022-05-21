<template>
  <b-card>
    <b-row>
      <b-col
        v-if="order.invalid_order"
        cols="1"
        :class="order.invalid_order.status ? 'error_order' : 'ok_order'"
      ></b-col>
      <b-col>
        <b-row>
          <b-col>Đơn {{ index + 1 }}</b-col>
          <b-col>Trạng thái: {{ handleStatus }}</b-col>
        </b-row>
        <b-row>
          <b-col>Địa chỉ: {{ order.address }}</b-col>
          <b-col>SDT: {{ order.phone }}</b-col>
        </b-row>
        <b-row>
          <b-col>Ghi chú: {{ order.note ? order.note : "Khong Co" }}</b-col>
          <b-col>Tổng tiền: {{ order.total }}</b-col>
        </b-row>
        <p>Ngay Tao: {{ handleTime }}</p>
        <div class="d-flex justify-content-end">
          <b-button
            class="margin_item"
            variant="info"
            @click="showOrderDetail()"
            >Chi tiết</b-button
          >
          <b-button
            class="margin_item"
            variant="primary"
            @click="approveOrder()"
          >
            Duyet
          </b-button>
        </div>
      </b-col>
    </b-row>
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
      this.$emit("showOrderDetail", this.order);
    },
    approveOrder() {
      console.log(this.order);
      this.$emit("approveOrder", this.order.id);
    },
  },
};
</script>

<style>
.error_order {
  max-width: 10px !important;
  background: red;
}
.ok_order {
  max-width: 10px !important;
  background: green;
}
.margin_item {
  margin: 5px;
}
</style>