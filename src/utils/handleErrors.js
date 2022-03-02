function showError(data) {
  if (data.message) {
    alert(data.message)
  } else if (data.detail) {
    alert(data.detail)
  }
}

export default {
  showError
}