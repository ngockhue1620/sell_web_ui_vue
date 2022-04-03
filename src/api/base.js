import Vue from 'vue'
import handleErrors from '../utils/handleErrors'
import store from '../store/index'
const URL = 'http://127.0.0.1:8000/'

const baseApi = async (data) => {
  const options = {
    method: data.method,
    url: URL + data.url,
    data: data.data,
    headers: {
      Authorization: 'Bearer ' + store.getters.token
    }
  };

  return Vue.axios(options)
    .then((response) => {
      handleErrors.showError(response.data)
      console.log(response.data)
      return response.data
    }).catch((error) => {
      console.log(error)
      handleErrors.showError(error.response.data)
    })
}

export default {
  baseApi
}