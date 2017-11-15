import $ from 'jquery'

let isAdd = false
const addBorder = () => {
  $('.req-add-border').click(() => {
    if (isAdd) {
      $('.res-add-border').css('border', 'none')
    } else {
      $('.res-add-border').css('border', '3px solid red')
    }
    isAdd = !isAdd
  })
}

export default addBorder
