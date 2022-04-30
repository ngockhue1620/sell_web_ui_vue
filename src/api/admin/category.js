import baseApi from '../base'

const addCategory = (data) => baseApi.baseApi({
    method: 'post',
    url: `category/`,
    data: data
  })
export default {
    addCategory
  }