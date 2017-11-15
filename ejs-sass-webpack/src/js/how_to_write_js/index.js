import $ from 'jquery'
import fadeout from '../utility/fadeout'
import changeText from '../utility/changeText'
import showAlert from '../utility/showAlert'
import addBorder from '../utility/addBorder'
import xhrAccess from '../utility/xhrAccess'

$(() => {
  showAlert()
  changeText()
  fadeout()
  addBorder()
  xhrAccess()
})
