import baseApi from '../base'

const loadUser = (data) => baseApi.baseApi({
  method: 'get',
  url: `user/list`,
  data: data,
})
export default {
  loadUser
}