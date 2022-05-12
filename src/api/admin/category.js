import baseApi from '../base'

const addCategory = (data) => baseApi.baseApi({
  method: 'post',
  url: `category/`,
  data: data,
  contentType: "multipart/form-data",
})
const editCategory = (data, id) => baseApi.baseApi({
  method: 'patch',
  url: `category/${id}/`,
  data: data,
  contentType: "multipart/form-data"
})
export default {
  addCategory,
  editCategory
}