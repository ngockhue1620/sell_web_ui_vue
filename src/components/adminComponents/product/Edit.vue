<template>
  <b-container class="productsList">
    <b-form>
    
    <b-form-group id="input-group-0" label="Category:" label-for="input-0">
      <b-form-select v-model="infoProduct.category" :options="options" value-field="id" text-field="name"></b-form-select>
    </b-form-group>
    
    <b-form-group
      label="Name:"
    >
      <b-form-input
        placeholder="Enter name product"
        required
        v-model="infoProduct.name"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Description:" >
      <b-form-input
        placeholder="Enter description"
        required
        v-model="infoProduct.description"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Price:" >
      <b-form-input type="number" v-model="infoProduct.price"></b-form-input>
    </b-form-group>

    <b-form-group label="Quantity:" >
      <b-form-input type="number" v-model="infoProduct.quantity"></b-form-input>
    </b-form-group>

    <b-form-group label="Image:" label-cols-sm="2">
      <b-form-file v-model="infoProduct.image"></b-form-file>
    </b-form-group>

    <b-form-group label="Image url:" >
      <b-form-textarea
        placeholder="Link product image"
        v-model="infoProduct.image_url"
      ></b-form-textarea>
    </b-form-group>

    <b-button type="submit" class="mt-3" block @click="submitModal(infoProduct)">Submit</b-button>
  </b-form>
 
  </b-container>
</template>

<script>
import Product from "../../../api/admin/product.js"
export default {
  props: {
    product: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
      return {
        value: 0,
        options: [],
        infoProduct: {
          category: 0,
          name: "",
          description: "",
          price: null,
          quantity: null,
          image: null,
          image_url: ""
        }
      }
    },
  methods:{
      async getListCategory(){
        const getListCategory = await Product.listCategory();
        this.options = getListCategory
        console.log(getListCategory)
      },

      submitModal(){
        Product.editProduct(this.infoProduct,this.product.id);
        this.$bvModal.hide('edit');
      }
  },
  mounted(){
    this.infoProduct = this.product
    this.getListCategory()
  }
}
</script>

<style>
</style>