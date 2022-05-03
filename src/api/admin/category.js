import baseApi from '../base'

const addCategory = (data) => baseApi.baseApi({
  method: 'post',
  url: `category/`,
  data: data,
  contentType: "multipart/form-data",
})
export default {
  addCategory
}