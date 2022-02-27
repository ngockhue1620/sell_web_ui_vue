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
      <b-button variant="success" @click="pay">Thanh Toan</b-button>
    </b-container>
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
  methods: {
    ...mapActions(["remove"]),
    async pay() {
      const value = {
        note: "ok",
        address: "ton duc thang",
        phone: "23232323",
        total: this.totalMoney,
        order_detail: this.productInCart,
      };
      const result = await OrderApi.order(value);
      console.log(result);
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