import $ from 'jquery'

const showAlert = () => {
  $('.req-show-alert').click(() => {
    if (!window.confirm('本当に？')) {
      window.location.href = '/'
    } else {
      window.location.href = '/'
    }
  })
}

export default showAlert
