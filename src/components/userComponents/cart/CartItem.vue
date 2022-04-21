<template>
  <b-row class="productRow">
    <b-col>
      <img
        :src="product.image ? product.image : product.image_url"
        class="cartImage"
      />
    </b-col>
    <b-col>
      {{ product.name }}
    </b-col>
    <b-col>{{ product.price }}</b-col>
    <b-col><input v-model="quantity" type="number" min="1" /></b-col>
    <b-col>{{ parseInt(product.price) * quantity }}</b-col>
    <b-col
      ><span @click="isDelete"><b-icon icon="trash"></b-icon></span
    ></b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    product: {
      type: [Object],
      default: () => {},
    },
  },
  data() {
    return {
      quantity: this.product.quantity,
    };
  },
  methods: {
    ...mapActions(["addToCart", "remove"]),
    addProductToCart(item, q) {
      const value = {
        product: item,
        quantity: parseInt(q),
      };
      this.addToCart(value);
    },
    isDelete() {
      this.remove({
        type: "item",
        id: this.product.id,
      });
    },
  },
  watch: {
    quantity(newValue, oldValue) {
      console.log(newValue, oldValue);
      let q = newValue - oldValue;
      this.addProductToCart(this.product, q);
    },
  },
  mounted() {
    // this.quantity = this.product.quantity;
  },
};
</script>

<style>
.cartImage {
  width: 100px;
  height: 100px;
}
</style>