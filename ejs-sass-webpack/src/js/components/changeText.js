import $ from 'jquery'

const changeText = () => {
  $('#change-text-button').click(() => {
    $('#hoge').text('changed!')
  })
}

export default changeText
