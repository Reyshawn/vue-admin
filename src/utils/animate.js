let rID = null

function animate (duration, fn) {
  // If there has been an animation, then stop.
  if (rID) return

  const start = performance.now()

  let progress = 0 // between 0 and 1, +/-

  function stopAni () {
    cancelAnimationFrame(rID)
    rID = null
  };
  function tick (now) {
    if (progress >= 1) {
      stopAni()
      fn(1)
      return
    }

    const elapsed = now - start
    progress = elapsed / duration

    // callback
    fn(progress) // number between 0 and 1

    rID = requestAnimationFrame(tick) // every 16.6666667 ms
  }
  tick(start)
}

function easing (progress) {
  return (1 - Math.cos(progress * Math.PI)) / 2
}

const animationDefaults = {
  duration: 1000,
  easing
}

animate.fromTo = ({
  from,
  to,
  easing,
  duration
}, fn) => {
  easing = easing || animationDefaults.easing
  duration = duration || animationDefaults.duration

  const delta = +to - +from

  return animate(duration, progress => fn(from + easing(progress) * delta))
}

export default animate
