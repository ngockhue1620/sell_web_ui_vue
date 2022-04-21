import Vue from 'vue'
export default {
  getProduct: () =>
    Vue.axios
      .get('http://127.0.0.1:8000/product/')
      .then((response) => {
        return response.data
      }).catch(() => {
        return "errro"
      })

}