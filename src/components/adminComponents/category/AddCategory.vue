<template>
  <b-container class="addCategory">
    <b-form @submit="onclickSubmit">
      <b-form-group label="Name:">
        <b-form-input
          placeholder="Enter name category"
          required
          v-model="infoCategory.name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Image:" label-cols-sm="2">
        <b-form-file
          v-model="infoCategory.image"
          @change="handleUpload($event)"
        ></b-form-file>
      </b-form-group>

      <b-form-group label="Image url:">
        <b-form-textarea
          placeholder="Link category image"
          v-model="infoCategory.image_url"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="IsActive:">
        <b-form-input
          placeholder="Enter isactive category"
          required
          v-model="infoCategory.isactive"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import category from "../../../api/admin/category.js";
export default {
  props: {
    syncAfterCreateCategory: {
      type: [Function],
      default: () => {},
    },
  },
  data() {
    return {
      infoCategory: {
        name: "",
        image: null,
        image_url: null,
        isactive: null
      },
    };
  },
  methods: {
    async onclickSubmit() {
      if (
        this.infoCategory.image == null &&
        this.infoCategory.image_url == null
      ) {
        alert("Hình ảnh danh muc không được để trống");
        return;
      }
      const formData = new FormData();
      formData.append("name", this.infoCategory.name);
      // formData.append("image", this.infoCategory.image);
      // formData.append("image_url", this.infoCategory.image_url);
      // formData.append("isactive", this.infoCategory.isactive);
      if (this.infoCategory.image) {
        formData.append("image", this.infoCategory.image);
      }
      if (this.infoCategory.image_url) {
        formData.append("image_url", this.infoCategory.image_url);
      }
      const result = await category.addCategory(formData);
      console.log(result);
      this.syncAfterCreateCategory(result);
    },
    handleUpload(event) {
      console.log(event);
      console.log(event.target.files[0]);
      this.infoCategory.image = event.target.files[0];
    },
  },
};
</script>

<style>
</style>