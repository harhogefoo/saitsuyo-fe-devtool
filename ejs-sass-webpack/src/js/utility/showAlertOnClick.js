import $ from 'jquery'
import showAlert from './showAlert'

const showAlertOnClick = () => {
  $('.req-show-alert').click(() => {
    showAlert('本当に？')
  })
}

export default showAlertOnClick
