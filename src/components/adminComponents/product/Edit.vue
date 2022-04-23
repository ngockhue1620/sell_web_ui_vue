<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <b-container class="productsList">
          <b-form>
            <b-form-group
              id="input-group-0"
              label="Category:"
              label-for="input-0"
            >
              <b-form-select
                v-model="infoProduct.category"
                :options="options"
                value-field="id"
                text-field="name"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Name:">
              <b-form-input
                placeholder="Enter name product"
                required
                v-model="infoProduct.name"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Description:">
              <b-form-input
                placeholder="Enter description"
                required
                v-model="infoProduct.description"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Price:">
              <b-form-input
                type="number"
                v-model="infoProduct.price"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Quantity:">
              <b-form-input
                type="number"
                v-model="infoProduct.quantity"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Image:" label-cols-sm="2">
              <b-form-file
                v-model="image"
                @change="handleUpload($event)"
              ></b-form-file>
            </b-form-group>

            <b-form-group label="Image url:">
              <b-form-textarea
                placeholder="Link product image"
                v-model="image_url"
              ></b-form-textarea>
            </b-form-group>

            <b-button
              type="submit"
              class="mt-3"
              block
              @click="submitModal(infoProduct)"
              >Submit</b-button
            >
          </b-form>
        </b-container>
      </b-col>
      <b-col cols="6">
        <b-container>
          <b-row>
            <b-card
              :title="infoProduct.name"
              :img-src="handleImageUrl"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
              img-width="280"
              img-height="280"
            >
              <b-card-text>
                {{ infoProduct.description }}
              </b-card-text>
            </b-card>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Product from "../../../api/admin/product.js";
export default {
  props: {
    product: {
      type: [Object],
      default: () => {},
    },
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
        image_url: "",
      },
      image: null,
      image_url: null,
    };
  },
  computed: {
    handleImageUrl() {
      if (this.image === null && this.image_url === null) {
        return this.infoProduct.image
          ? this.infoProduct.image
          : this.infoProduct.image_url;
      }
      return this.image ? this.image : this.image_url;
    },
  },
  methods: {
    async getListCategory() {
      const getListCategory = await Product.listCategory();
      this.options = getListCategory;
      console.log(getListCategory);
    },

    submitModal() {
      const formData = new FormData();
      formData.append("category", this.infoProduct.category);
      formData.append("name", this.infoProduct.name);
      formData.append("description", this.infoProduct.description);
      formData.append("price", this.infoProduct.price);
      formData.append("quantity", this.infoProduct.quantity);
      if (this.image) {
        formData.append("image", this.image);
      }
      if (this.image_url) {
        formData.append("image_url", this.image_url);
      }
      Product.editProduct(formData, this.product.id);
      this.$bvModal.hide("edit");
    },
    handleUpload(event) {
      console.log(event);
      console.log(event.target.files[0]);
      this.image = event.target.files[0];
    },
  },
  mounted() {
    this.infoProduct = this.product;
    this.getListCategory();
  },
};
</script>

<style>
</style>