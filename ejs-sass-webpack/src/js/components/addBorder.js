import $ from 'jquery'

let isAdd = false
const addBorder = () => {
  $('.change-css').click(() => {
    if (isAdd) {
      $('.hoge').css('border', 'none')
    } else {
      $('.hoge').css('border', '3px solid red')
    }
    isAdd = !isAdd
  })
}

export default addBorder
