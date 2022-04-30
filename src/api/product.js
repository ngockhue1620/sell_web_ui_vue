import baseApi from './base'

const productDetail = (id) => baseApi.baseApi({
  method: 'get',
  url: `product/${id}`
})

const searchInput = (key) =>baseApi.baseApi({
  method: 'get',
  url: `product?keyword=${key}`
})

export default {
  productDetail,
  searchInput
}