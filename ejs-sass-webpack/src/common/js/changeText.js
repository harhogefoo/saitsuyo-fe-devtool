import $ from 'jquery'

let isAdd = false
const changeText = () => {
  $('.req-change-text').click(() => {
    console.log("oukasareteru")
    if (isAdd) {
      $('.res-change-text').text('sample')
    } else {
      $('.res-change-text').text('changed!')
    }
    isAdd = !isAdd
  })
}

export default changeText
