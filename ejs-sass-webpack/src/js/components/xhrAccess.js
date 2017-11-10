import $ from 'jquery'

const xhrAccess = () => {
  $.ajaxPrefilter((options, originalOptions, jqXHR) => {
    let token
    if (!options.crossDomain) {
      token = $('#token').val()
      if (token) {
        return jqXHR.setRequestHeader('X-XSRF-Token', token)
      }
    }
    return null
  })
  function cheer() {
    const cheerPost = $.post('/registXhr', '')
    cheerPost.done((result) => {
      alert(result)
    })
  }
  $('#xhrSubmit').click(() => { cheer() })
}

export default xhrAccess
