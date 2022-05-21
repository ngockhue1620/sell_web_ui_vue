<template>
  <div>
    <div class="home">
      <div class="barControl">
        <ToolBar />
      </div>
      <router-view />
    </div>

    <div class="footer">
      <div style="width: 30%"></div>
      <div style="width: 100%">
        <div class="d-flex justify-content-between">
          <div class="margin_item">
            <p class="margin_item"><strong>Author</strong>: Ngoc Khue</p>
            <p class="margin_item"><strong>Class</strong>: 18CNTT4</p>
          </div>

          <div class="margin_item">
            <p class="margin_item">Báo Cáo Thực Tập</p>
            <p class="margin_item">Django and VueJS</p>
          </div>
          <div class="margin_item">
            <img
              class="margin_item"
              style="width: 50px"
              src="https://images.viblo.asia/0ef80266-6081-48df-8fa0-9ae00adb7e8e.jpg"
              alt=""
            />
            <br />
            <img
              class="margin_item"
              style="width: 50px"
              src="https://vuejs.org/images/logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
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