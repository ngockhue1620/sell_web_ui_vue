import Vue from 'vue'
import handleErrors from '../utils/handleErrors'
import baseApi from './base'
import constance from '../constance/const'
const URL = constance.URL

const updateUser = (data) => baseApi.baseApi({
  method: 'post',
  url: `user/update_password/`,
  data: data
})

export default {
  login: (value) =>
    Vue.axios
      .post(`${URL}user/login/`, value)
      .then((response) => {
        handleErrors.showError(response.data)
        return response.data
      }).catch((error) => {
        handleErrors.showError(error.response.data)
      }),
  signUp: (value) => Vue.axios
    .post(`${URL}user/`, value)
    .then((response) => {
      handleErrors.showError(response.data)
      return response.data
    }).catch((error) => {
      handleErrors.showError(error.response.data)
    }),

  updateUser
}