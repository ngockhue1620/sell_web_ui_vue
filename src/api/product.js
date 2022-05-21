import baseApi from './base'

const productDetail = (id) => baseApi.baseApi({
  method: 'get',
  url: `product/${id}`
})

const searchInput = (key, page) => baseApi.baseApi({
  method: 'get',
  url: `product?keyword=${key}&?page${page}`
})

export default {
  productDetail,
  searchInput
}