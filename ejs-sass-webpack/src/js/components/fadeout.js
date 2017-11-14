import $ from 'jquery'

const fadeout = () => {
  $('.fadeout').click(() => {
    $('.hoge').fadeToggle()
  })
}

export default fadeout
