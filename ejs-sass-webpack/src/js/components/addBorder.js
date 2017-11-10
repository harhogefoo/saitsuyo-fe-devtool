import $ from 'jquery'

const addBorder = () => {
  $('#change-css-button').click(() => {
    $('#hoge').css('border', '3px solid red')
  })
}

export default addBorder
