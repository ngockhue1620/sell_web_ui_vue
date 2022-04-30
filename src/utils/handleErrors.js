function showError(data, isSuccess) {
  if (data.message) {
    alert(data.message)
  } else if (data.detail) {
    alert(data.detail)
  } else if (isSuccess) {
    // alert("thành công")
  } else {
    // alert("thất bại")
  }

}

export default {
  showError
}