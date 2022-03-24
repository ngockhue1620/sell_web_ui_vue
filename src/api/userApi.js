import Vue from 'vue'
import handleErrors from '../utils/handleErrors'
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
}