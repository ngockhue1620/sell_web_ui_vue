<template>
  <div class="barContent">
    <div class="d-flex justify-content-end">
      <b-button variant="primary" v-b-modal.add_cate>Thêm</b-button>
    </div>
    <b-container class="productsList">
      <b-row>
        <b-col cols="4" v-for="item in categories" :key="item.id">
          <b-container>
            <b-row>
              <b-card
                :title="item.name"
                :img-src="item.image ? item.image : item.image_url"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2"
                img-width="280"
                img-height="280"
              >
                <div>
                  <!-- <router-link :to="`admin/product/${item.id}`"
                    >Chi Tiet</router-link
                  >
                  <b-button v-b-modal.edit @click="getdata(item)"
                    >Edit</b-button
                  > -->

                  <b-button v-b-modal.delete @click="getId(item)">xoa</b-button>
                </div>
              </b-card>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="add_cate"
      @show="showModal"
      @hide="showModal"
      size="xl"
      :hide-footer="true"
    >
      <add-category
        v-if="show"
        :sync-after-create-category="syncAfterCreateCategory"
      >
      </add-category>
    </b-modal>
    <b-modal id="delete" title="BootstrapVue" :hide-footer="true">
      <p class="my-4">Bạn có chắc chắn xóa?</p>
      <b-button class="mt-3" block @click="acceptDelete(idCategory)"
        >Accept</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import AddCategory from "./AddCategory.vue";
import Product from "../../../api/admin/product.js";
export default {
  components: {
    "add-category": AddCategory,
  },
  data() {
    return {
      show: false,
      categories: [],
      idCategory: null,
    };
  },
  methods: {
    showModal() {
      this.show = !this.show;
    },
    async getListCategory() {
      const getListCategory = await Product.listCategory();
      this.categories = getListCategory;
    },
    syncAfterCreateCategory(data) {
      this.categories.push(data);
      this.$bvModal.hide("add_cate");
    },
    getId(category) {
      this.idCategory = category.id;
      console.log(this.idCategory);
    },
    acceptDelete() {
      Product.deleteCategory(this.idCategory);
      this.$bvModal.hide("delete");
      let index = this.categories.findIndex(
        (item) => item.id === this.idCategory
      );
      this.categories.splice(index, 1);
    },
  },
  mounted() {
    this.getListCategory();
  },
};
</script>

<style>
</style>