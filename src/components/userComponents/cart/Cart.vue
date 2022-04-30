<template>
  <div class="barContent">
    <b-container>
      <b-row class="productRow">
        <b-col> </b-col>
        <b-col> Ten San Pham </b-col>
        <b-col>Gia</b-col>
        <b-col>So luong mua</b-col>
        <b-col>Thanh Tien</b-col>
        <b-col></b-col>
      </b-row>
      <CartItem
        v-for="product in productInCart"
        :key="product.id"
        :product="product"
      /><b-row class="productRow">
        <b-col> </b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>Tong Tien</b-col>
        <b-col>{{ totalMoney }}</b-col>
        <b-col
          ><span @click="remove({ type: 'all' })"
            ><b-icon icon="trash"></b-icon></span
        ></b-col>
      </b-row>
      <b-button variant="success" v-b-modal.order_info>Thanh Toan</b-button>
    </b-container>
    <b-modal id="order_info" title="Thông tin đơn hàng" :hide-footer="true">
      <b-form @submit.prevent="pay" v-if="productInCart.length > 0">
        <b-form-group label="Ghi chú cho đơn hàng:">
          <b-form-input placeholder="ghi chú" v-model="note"></b-form-input>
        </b-form-group>

        <b-form-group label="Địa chỉ nhận hàng:">
          <b-form-input
            placeholder="Địa chỉ"
            required
            v-model="address"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Điện thoại người nhận:">
          <b-form-input type="number" v-model="phone" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Đặt hàng</b-button>
      </b-form>
      <p v-else>Bạn chưa chọn sản phẩm nào</p>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartItem from "./CartItem.vue";
import OrderApi from "../../../api/orderApi";
export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters(["productInCart", "totalMoney"]),
  },
  data() {
    return {
      note: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    ...mapActions(["remove"]),
    async pay() {
      if (
        (!parseInt(this.phone) && this.phone.length == 10) ||
        this.phone.length == 11
      ) {
        alert("Điện thoại phải là chữ sô");
        return;
      }
      const value = {
        note: this.note,
        address: this.address,
        phone: this.phone,
        total: this.totalMoney,
        order_detail: this.productInCart,
      };
      const result = await OrderApi.order(value);
      console.log(result);
      if (result) {
        console.log(result);
        this.remove({ type: "all" });
        this.$bvModal.hide("order_info");
      }
    },
  },
};
</script>

<style>
.barContent {
  margin-left: 22%;
  width: 100%;
  background: whitesmoke;
}
.productRow {
  margin: 1rem;
  border: 3px solid white;
}
</style>