if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/sw-example' }).then(reg => {
    console.log(`Registration complete! ${reg.scope}`)
  }).catch(err => {
    console.log(`Registration failed! ${err}`)
  })
}
