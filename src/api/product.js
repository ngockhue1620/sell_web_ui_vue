import baseApi from './base'

const productDetail = (id) => baseApi.baseApi({
  method: 'get',
  url: `product/${id}`
})

export default {
  productDetail
}