import Vue from 'vue'
import handleErrors from '../utils/handleErrors'
import store from '../store/index'
var token = store.getters.token
export default {
  order: (value) =>
    Vue.axios
      .post('http://127.0.0.1:8000/order/', value, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((response) => {
        handleErrors.showError({ 'message': 'Order success' })
        return response.data
      }).catch((error) => {
        console.log(error)
        handleErrors.showError(error.response.data)
      })
}