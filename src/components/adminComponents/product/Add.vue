<template>
  <div class="barContent">
    <b-container class="productsList">
      <b-form @submit.prevent="onclickSubmit">
        <b-form-group id="input-group-0" label="Category:" label-for="input-0">
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
            v-model="infoProduct.image"
            @change="handleUpload($event)"
          ></b-form-file>
        </b-form-group>

        <b-form-group label="Image url:">
          <b-form-textarea
            placeholder="Link product image"
            v-model="infoProduct.image_url"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import Product from "../../../api/admin/product.js";
export default {
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
    };
  },
  methods: {
    async getListCategory() {
      const getListCategory = await Product.listCategory();
      this.options = getListCategory;
      this.options.unshift({
        id: 0,
        name: "Danh Muc San Pham",
      });
      console.log(getListCategory);
    },
    async onclickSubmit() {
      let check = 0;
      const formData = new FormData();
      formData.append("category", this.infoProduct.category);
      formData.append("name", this.infoProduct.name);
      formData.append("description", this.infoProduct.description);
      formData.append("price", this.infoProduct.price);
      formData.append("quantity", this.infoProduct.quantity);
      if (this.infoProduct.image) {
        formData.append("image", this.infoProduct.image);
        check += 1;
      }
      if (this.infoProduct.image_url) {
        formData.append("image_url", this.infoProduct.image_url);
        check += 1;
      }
      if (check == 0) {
        alert("Bạn chưa truyền vào hình ảnh sản phẩm");
        return;
      }
      console.log(formData);
      await Product.addProduct(formData);
      this.$router.push("/admin");
    },
    handleUpload(event) {
      console.log(event);
      console.log(event.target.files[0]);
      this.image = event.target.files[0];
    },
  },
  mounted() {
    this.getListCategory();
  },
};
</script>

<style>
.barControl {
  width: 22%;
  position: fixed;
}
.home {
  display: flex;
  width: 100%;
}
.barContent {
  margin-left: 22%;
  width: 100%;
  background: whitesmoke;
}
.inputSearch {
  color: hsla(0, 0%, 100%, 0.9);
  background-color: transparent;
  border-width: 0px;
  border: none;
  outline: none;
  padding: 2px;
  margin: 5px;
}
.searchContainer {
  border: 1px white solid;
  border-radius: 20px;
  width: 235px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}
.searchButton {
  margin-right: 10px;
}
.searchPosition {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: 14px;
  right: 35px;
}
.imageContainer {
  width: 280px;
  height: 280px;
  background-size: contain;
  background-repeat: no-repeat;
}
.underbackground {
  width: 100%;
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
  height: 400px;
  position: fixed;
  margin-top: -100px;
}
.searchStyle {
  width: 100%;
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
  height: 100px;
}
</style>