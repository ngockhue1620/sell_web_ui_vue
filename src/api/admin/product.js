import baseApi from '../base'

const listCategory = () => baseApi.baseApi({
  method: 'get',
  url: `category/`,
})

const addProduct = (data) => baseApi.baseApi({
    method: 'post',
    url: `product/`,
    data: data
})

const editProduct = (data,id) => baseApi.baseApi({
  method: 'put',
  url: `product/${id}/`,
  data: data
})

const deleteProduct = (id) => baseApi.baseApi({
  method: 'delete',
  url: `product/${id}/`
})

export default {
  listCategory,
  addProduct,
  editProduct,
  deleteProduct
}