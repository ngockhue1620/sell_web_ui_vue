import Vue from 'vue'
import handleErrors from '../utils/handleErrors'
import store from '../store/index'

export default {
  order: (value) =>
    Vue.axios
      .post('http://127.0.0.1:8000/order/', value, {
        headers: {
          Authorization: 'Bearer ' + store.getters.token
        }
      })
      .then((response) => {
        handleErrors.showError(response.data)
        console.log(response.data)
        return response.data
      }).catch((error) => {
        console.log(error)
        handleErrors.showError(error.response.data)
      }),
  orderInProgress: () =>
    Vue.axios
      .get('http://127.0.0.1:8000/order/', {
        headers: {
          Authorization: 'Bearer ' + store.getters.token
        }
      })
      .then((response) => {
        handleErrors.showError(response.data)
        console.log(response.data)
        return response.data
      }).catch((error) => {
        console.log(error)
        handleErrors.showError(error.response.data)
      }),

  orderDetail: (id) =>
    Vue.axios
      .get(`http://127.0.0.1:8000/order/detail/${id}`, {
        headers: {
          Authorization: 'Bearer ' + store.getters.token
        }
      })
      .then((response) => {
        handleErrors.showError(response.data)
        return response.data
      }).catch((error) => {
        console.log(error)
        handleErrors.showError(error.response.data)
      }),
}