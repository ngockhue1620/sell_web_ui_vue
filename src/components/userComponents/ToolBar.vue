<template>
  <div class="card controlBar" :style="windowHeight">
    <ul >
      <li>
        <h3>Ngoc Khue Shop</h3>
      </li>
      <li>
        <div>
          <b-avatar href="javascript:;" size="lg" src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/team-4.jpg"></b-avatar>
          <b>Khue Dao</b>
        </div>
      </li>
      <li>Gio Hang</li>      
      <li>Don hang chua hoan thanh </li>
      <li>Lich su mua hang</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    windowHeight(){
      return { 
        height : `${window.innerHeight}px`
      }
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
  li {
    padding: 10px;
  }
  .controlBar {
    width: 100%;
  }
</style>