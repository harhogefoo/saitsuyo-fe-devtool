import $ from 'jquery'

const fadeout = () => {
  $('.req-fadeout').click(() => {
    $('.res-fadeout').fadeToggle()
  })
}

export default fadeout
