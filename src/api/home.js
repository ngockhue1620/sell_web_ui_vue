import baseApi from './base'
export default {
  getProduct: (page) => baseApi.baseApi({
    method: 'get',
    url: `product?page=${page}`,
  }),
}