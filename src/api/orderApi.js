import Vue from 'vue'
export default {
  order: (value) =>
    Vue.axios
      .post('http://127.0.0.1:8000/order/', value)
      .then((response) => {
        return response.data
      }).catch(() => {
        return "errro"
      })
}