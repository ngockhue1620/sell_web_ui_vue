<template>
  <div class="barContent">
    <b-container class="addCategory">
        <b-form @submit="onclickSubmit">
            <b-form-group label="Name:">
            <b-form-input
                placeholder="Enter name product"
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
                placeholder="Link product image"
                v-model="infoCategory.image_url"
            ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>  
    </b-container>
  </div>
</template>

<script>
import category from '../../../api/admin/category.js'
export default {
    data() {
        return {
        infoCategory: {
            name: "",
            image: null,
            image_url: "",
        },
        };
    },
    methods: {
        async onclickSubmit() {
        // const formData = new FormData();
        // formData.append("name", this.infoCategory.name);
        // formData.append("image", this.infoCategory.image);
        // formData.append("image_url", this.infoCategory.image_url);
        // await category.addCategory(formData);
        // console.log(formData);
        await category.addCategory(this.infoCategory)
        console.log(this.infoCategory)
    },
        handleUpload(event) {
        console.log(event);
        console.log(event.target.files[0]);
        this.image = event.target.files[0];
    },
  }

}
</script>

<style>

</style>