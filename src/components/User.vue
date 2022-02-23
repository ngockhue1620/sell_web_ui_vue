<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Trang chu</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link to="/">Trang chu</router-link></b-nav-item>
      </b-navbar-nav>
      
    </b-collapse>
  </b-navbar>
  <div>
    <div>
  <b-card no-body class="overflow-hidden" style="max-width: 540px;" v-for="item in listProduct" :key="item.id">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="item.image" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Horizontal Card">
          <b-card-text>
            {{item.name}}
          </b-card-text>
          <b-card-text>
            {{item.descripton}}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
  </div>
</div>
</template>

<script>
import Home from '../api/home.js';
export default {
  data(){
    return {
      listProduct: []
    }
  },
  methods: {
    async fetchProduct(){
      const result = await Home.getProduct()
      console.log(result)
      this.listProduct = result
    }
  },
  mounted(){
    this.fetchProduct()
  }
}
</script>

<style>

</style>