<template>
  <div class="barContent">
    <b-container>
      <ShowOrder
        v-for="(item, index) in listOrder"
        :key="item.id"
        :order="item"
        :index="index"
        @showOrderDetail="showOrderDetail"
        @approveOrder="approveOrder"
      />
    </b-container>
    <b-modal
      id="order-detail"
      title="Chi Tiet Don Hang"
      :ok-only="true"
      size="xl"
      @hide="clearOrderDetail"
    >
      <div>
        <b-container v-if="order">
          <b-row class="productRow">
            <b-col>Ma San Pham</b-col>
            <b-col>Hinh Anh</b-col>
            <b-col> Ten San Pham </b-col>
            <b-col>Gia</b-col>
            <b-col>So Luong mua</b-col>
            <b-col>Thanh Tien</b-col>
          </b-row>
          <b-row
            class="productRow"
            v-for="detail in order.order_detail"
            :key="detail.id"
          >
            <b-col>{{ detail.id }}</b-col>
            <b-col>
              <img
                :src="
                  detail.product.image
                    ? detail.product.image.startsWith('http')
                      ? detail.product.image
                      : `http://127.0.0.1:8000${detail.product.image}`
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

          <b-row v-if="order.invalid_order.status">
            <b-alert show variant="warning">{{
              order.invalid_order.status
            }}</b-alert>
            <strong>
              Số lượng còn thực tế:
              {{ order.invalid_order.product.real_quantity }}
            </strong>
          </b-row>
        </b-container>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ShowOrder from "../order/ShowOrder.vue";
import OrderApi from "../../../api/admin/order.js";
import constance from "../../../constance/const.js";
export default {
  components: {
    ShowOrder,
  },
  data() {
    return {
      listOrder: [],
      order: false,
      statusDetail: [],
      orderId: 0,
      isSuccess: false,
    };
  },
  methods: {
    async getOrderInProgress() {
      const result = await OrderApi.orderStatus(constance.STATUS.INPROGRESS);
      this.listOrder = result;
    },
    async getOrderDetail() {
      const result = await OrderApi.orderDetail(this.orderId);
      this.orderDetail = result;
      console.log(this.orderDetail);
      this.isSuccess = true;
    },
    showOrderDetail(data) {
      this.isSuccess = true;
      this.order = data;
      console.log(data);
      this.$bvModal.show("order-detail");
    },
    async approveOrder(data) {
      this.isSuccess = false;
      this.statusDetail = await OrderApi.approveOrder(data);
      console.log(this.statusDetail);
      let index = this.listOrder.findIndex((item) => item.id === this.orderId);
      this.listOrder.splice(index, 1);
    },
    clearOrderDetail() {
      this.order = false;
    },
  },
  computed: {
    handleImageUrl() {
      let product_url = this.product.image
        ? this.product.image
        : this.product.image_url;
      if (product_url && !product_url.startsWith("http")) {
        product_url = "http://127.0.0.1:8000" + product_url;
      }
      return product_url;
    },
  },
  mounted() {
    this.getOrderInProgress();
  },
};
</script>

<style>
</style>