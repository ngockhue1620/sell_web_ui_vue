<template>
  <div class="home">
    <div class="barControl">
      <ToolBar />
    </div>
    <router-view />
  </div>
</template>

<script>
import ToolBar from "./adminComponents/ToolBar.vue";
export default {
  components: {
    ToolBar,
  },
};
</script>

<style>
</style>