function showError(data, isSuccess) {
  if (data.message) {
    alert(data.message)
  } else if (data.detail) {
    alert(data.detail)
  } else if (data.username) {
    alert("Tên Đăng Nhập Bị Trùng")
  } else if (isSuccess) {
    // alert("thất bại")
  }

}

export default {
  showError
}