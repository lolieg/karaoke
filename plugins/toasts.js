export default ({ app }, inject) => {
  const toasts = {
    toastDanger(message, buefy) {
      buefy.toast.open({
        message,
        position: 'is-top',
        type: 'is-danger',
        queue: false,
      })
    },
    toastSuccess(message, buefy) {
      buefy.toast.open({
        message,
        position: 'is-top',
        type: 'is-success',
        queue: false,
      })
    },
  }
  inject('toasts', toasts)
}
