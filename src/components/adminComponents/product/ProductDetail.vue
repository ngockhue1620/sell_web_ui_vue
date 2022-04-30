<template>
  <div class="barContent">
    <div class="d-flex">
      <b-card>
        <img
          :src="product.image ? product.image : product.image_url"
          style="max-width: 20rem"
        />
      </b-card>
      <div>
        <p><strong>Ten San Pham:</strong> {{ product.name }}</p>
        <p><strong>Mo ta:</strong>{{ product.description }}</p>
        <p><strong>Gia:</strong>{{ product.price }}</p>
        <p><strong>So luong con:</strong>{{ product.quantity }}</p>
      </div>
    </div>
    <div>
      <b-button variant="primary" @click="addProductToCart()"
        >Them Vao Gio Hang</b-button
      >
    </div>
    <div>
      <div><strong>Binh Luan:</strong></div>
      <b-container v-if="product.comments">
        <Comment :comments="product.comments" />
      </b-container>
      <div>
        <form @submit.prevent="onSubmitComment">
          <b-form-input
            v-model="comment"
            placeholder="Viet Binh luan"
          ></b-form-input>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import productApi from "../../../api/product.js";
import Comment from "../../userComponents/product/Commen.vue";
import commentApi from "../../../api/comment.js";
import { mapGetters } from "vuex";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      product: {},
      comment: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async getProductById() {
      const result = await productApi.productDetail(this.$route.params.id);
      this.product = result;
    },
    ...mapActions(["addToCart", "isLogin"]),
    addProductToCart() {
      if (!this.isLogin) {
        alert("You must login before");
        return;
      }
      const value = {
        product: this.product,
        quantity: 1,
      };
      this.addToCart(value);
    },
    async onSubmitComment() {
      const result = await commentApi.postComment({
        product: this.$route.params.id,
        comment: this.comment,
      });
      if (result) {
        this.product.comments.push({
          comment: this.comment,
          user: this.user,
        });
      }

      this.comment = "";
    },
  },
  mounted() {
    this.getProductById();
  },
};
</script>

<style>
.barContent {
  margin-left: 22%;
  width: 100%;
  background: whitesmoke;
}
.productRow {
  margin: 1rem;
  border: 3px solid white;
}
</style>