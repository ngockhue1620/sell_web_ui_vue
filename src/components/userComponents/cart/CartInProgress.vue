<template>
  <div class="barContent">
    <InProgressItem v-for="item in cartProgress" :key="item.id" />
  </div>
</template>

<script>
import OrderApi from "../../../api/orderApi";
import InProgressItem from "./InProgressItem.vue";
export default {
  components: {
    InProgressItem,
  },
  data() {
    return {
      cartProgress: [],
    };
  },
  methods: {
    async getOrderInProgress() {
      const result = await OrderApi.orderInProgress();
      this.cartProgress = result;
    },
  },
  mounted() {
    this.getOrderInProgress();
  },
};
</script>

<style>
</style>