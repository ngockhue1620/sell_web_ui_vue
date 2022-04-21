import baseApi from './base'
export default {
  order: (data) => baseApi.baseApi({
    method: 'post',
    url: `order/`,
    data: data
  }),

  orderStatus: (stauts) => baseApi.baseApi({
    method: 'get',
    url: `order?status=${stauts}`
  }),

  orderDetail: (id) => baseApi.baseApi({
    method: 'get',
    url: `order/detail/${id}`
  })
}