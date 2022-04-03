<template>
  <div class="barContent">
    <b-container>
      <InProgressItem
        v-for="(item, index) in cartProgress"
        :key="item.id"
        :order="item"
        :index="index"
        @showOrderDetail="showOrderDetail"
      />
    </b-container>
    <div>
      <b-modal
        id="order-detail"
        title="Chi Tiet Don Hang"
        :ok-only="true"
        size="xl"
      >
        <div>
          <div class="is_success" v-if="!isSuccess">
            <b-spinner variant="primary"></b-spinner>
          </div>
          <b-container v-else>
            <b-row class="productRow">
              <b-col>Hinh Anh</b-col>
              <b-col> Ten San Pham </b-col>
              <b-col>Gia</b-col>
              <b-col>So Luong</b-col>
              <b-col>Thanh Tien</b-col>
            </b-row>
            <b-row
              class="productRow"
              v-for="detail in orderDetail"
              :key="detail.id"
            >
              <b-col>
                <img
                  :src="
                    detail.product.image
                      ? detail.product.image
                      : detail.product.image_url
                  "
                  class="cartImage"
                />
              </b-col>
              <b-col>
                {{ detail.product.name }}
              </b-col>
              <b-col>{{ detail.price }}</b-col>
              <b-col>{{ detail.quantity }}</b-col>
              <b-col>{{ parseInt(detail.price) * detail.quantity }}</b-col>
            </b-row>
          </b-container>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import OrderApi from "../../../api/orderApi";
import InProgressItem from "./InProgressItem.vue";
import constance from "../../../constance/const.js";

export default {
  components: {
    InProgressItem,
  },
  data() {
    return {
      cartProgress: [],
      orderDetail: [],
      orderId: 0,
      isSuccess: false,
    };
  },
  methods: {
    async getOrderInProgress() {
      const result = await OrderApi.orderStatus(constance.STATUS.DONE);
      this.cartProgress = result;
    },
    async getOrderDetail() {
      const result = await OrderApi.orderDetail(this.orderId);
      this.orderDetail = result;
      console.log(this.orderDetail);
      this.isSuccess = true;
    },
    showOrderDetail(data) {
      this.isSuccess = false;
      this.orderId = data;
      this.getOrderDetail();
      this.$bvModal.show("order-detail");
    },
  },
  mounted() {
    this.getOrderInProgress();
  },
};
</script>

<style>
.is_success {
  display: flex;
  justify-content: center;
  align-self: center;
}
</style>