import $ from 'jquery'
import fadeout from '../utility/fadeout'
import changeText from '../utility/changeText'
import showAlert from '../utility/showAlert'
import showAlertOnClick from '../utility/showAlertOnClick'
import addBorder from '../utility/addBorder'

const xhrAccess = () => {
  function cheer() {
    $.ajax({
      url: '/',
      type: 'GET',
      success: (result) => {
        showAlert(result, () => { window.location.href = '/' }, () => { console.log('エラー発生') } )
      },
      error: (jqxhr, status, error) => {
        showAlert(error)
      },
    })
  }
  $('#xhrSubmit').click(() => { cheer() })
}

$(() => {
  showAlertOnClick()
  changeText()
  fadeout()
  addBorder()
  xhrAccess()
})
