import $ from 'jquery'

const fadeout = () => {
  $('#fadeout-button').click(() => {
    $('#hoge').fadeToggle()
  })
}

export default fadeout
