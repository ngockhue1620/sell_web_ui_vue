import Vue from 'vue'
import handleErrors from '../utils/handleErrors'
import baseApi from './base'
const updateUser = (data) => baseApi.baseApi({
  method: 'post',
  url: `user/update_password/`,
  data: data
})

export default {
  login: (value) =>
    Vue.axios
      .post('http://127.0.0.1:8000/user/login/', value)
      .then((response) => {
        handleErrors.showError(response.data)
        return response.data
      }).catch((error) => {
        handleErrors.showError(error.response.data)
      }),
  signUp: (value) => Vue.axios
    .post('http://127.0.0.1:8000/user/', value)
    .then((response) => {
      handleErrors.showError(response.data)
      return response.data
    }).catch((error) => {
      handleErrors.showError(error.response.data)
    }),

  updateUser
}