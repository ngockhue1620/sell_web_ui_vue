<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <b-container class="productsList">
          <b-form>
            <b-form-group label="Name:">
        <b-form-input
          placeholder="Enter category product"
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
      

            <b-button
              type="submit"
              class="mt-3"
              block
              @click="submitModal(infoCategory)"
              >Submit</b-button
            >
          </b-form>
        </b-container>
      </b-col>
      <b-col cols="6">
        <b-container>
          <b-row>
            <b-card
              :title="infoCategory.name"
              :img-src="handleImageUrl"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
              img-width="280"
              img-height="280"
            >
            </b-card>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Category from "../../../api/admin/category.js";
export default {
    props: {
    category: {
      type: [Object],
      default: () => {},
    },
  },
  data() {
    return {
      value: 0,
      options: [],
      infoCategory: {
        name: "",
        image: null,
        image_url: null,
      },
      image: null,
      image_url: null,
    };
  },
  computed: {
    handleImageUrl() {
      if (this.image === null && this.image_url === null) {
        return this.infoCategory.image
          ? this.infoCategory.image
          : this.infoCategory.image_url;
      }
      return this.image ? this.image : this.image_url;
    },
  },
  methods: {
    submitModal() {
      const formData = new FormData();
      formData.append("name", this.infoCategory.name);
      if (this.image) {
        formData.append("image", this.image);
      }
      if (this.image_url) {
        formData.append("image_url", this.image_url);
      }
      
      console.log(this.category.id)
      Category.editCategory(formData, this.category.id);
      this.$bvModal.hide("edit");
    },
    handleUpload(event) {
      console.log(event);
      console.log(event.target.files[0]);
      this.image = event.target.files[0];
    },
  },
  mounted() {
    this.infoCategory = this.category;
  },
}
</script>

<style>

</style>