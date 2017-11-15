
const showAlert = (message, ok = () => {}, ng = () => {}) => {
  if (!window.confirm(message)) {
    ng()
  } else {
    ok()
  }
}

export default showAlert
