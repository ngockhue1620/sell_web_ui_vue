import baseApi from '../base'

const listCategory = () => baseApi.baseApi({
  method: 'get',
  url: `category/`,
})

const addProduct = (data) => baseApi.baseApi({
  method: 'post',
  url: `product/`,
  data: data,
  contentType: "multipart/form-data"
})

const editProduct = (data, id) => baseApi.baseApi({
  method: 'patch',
  url: `product/${id}/`,
  data: data,
  contentType: "multipart/form-data"
})

const deleteProduct = (id) => baseApi.baseApi({
  method: 'delete',
  url: `product/${id}/`
})

// const deleteCategory = (id) => baseApi.baseApi({
//   method: 'put',
//   url: `category/${id}/`
// })

export default {
  listCategory,
  addProduct,
  editProduct,
  deleteProduct,
  // deleteCategory
}