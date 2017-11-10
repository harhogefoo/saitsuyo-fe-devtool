import $ from 'jquery'
import fadeout from './components/fadeout'
import changeText from './components/changeText'
import showAlert from './components/showAlert'
import addBorder from './components/addBorder'
import xhrAccess from './components/xhrAccess'

$(() => {
  showAlert()
  changeText()
  fadeout()
  addBorder()
  xhrAccess()
})
