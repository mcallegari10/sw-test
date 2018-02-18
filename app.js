if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/sw-test' }).then(reg => {
    if (reg.installing) {
      console.log('Service worker installing')
    } else if (reg.active) {
      console.log('Service worker active')
    }
  }).catch(err => {
    console.log(`Registration failed! ${err}`)
  })
}
