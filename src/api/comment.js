import baseApi from './base'

const postComment = (data) => baseApi.baseApi({
  method: 'post',
  url: `comment/`,
  data: data
})

export default {
  postComment
}