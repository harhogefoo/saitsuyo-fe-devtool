import $ from 'jquery'

let isAdd = false
const changeText = () => {
  $('.change-text').click(() => {
    if (isAdd) {
      $('.hoge').text('sample')
    } else {
      $('.hoge').text('changed!')
    }
    isAdd = !isAdd
  })
}

export default changeText
