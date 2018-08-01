const LazyLoad = {
  lazyLoad: () => {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'))
    let active = false

    if (active === false) {
      active = true

      setTimeout(() => {
        lazyImages.forEach((lazyImage) => {
          const shouldLoad = (
            lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0
          ) && getComputedStyle(lazyImage).display !== 'none'
          if (shouldLoad) {
            lazyImage.src = lazyImage.dataset.src
            lazyImage.classList.remove('lazy')

            lazyImages = lazyImages.filter((image) => image !== lazyImage)

            if (lazyImages.length === 0) {
              // LazyLoad.stopLazyLoad()
            }
          }
        })

        active = false
      }, 200)
    }
  },
  startLazyLoad: () => {
    LazyLoad.lazyLoad()
    document.addEventListener('scroll', LazyLoad.lazyLoad)
    window.addEventListener('resize', LazyLoad.lazyLoad)
    window.addEventListener('orientationchange', LazyLoad.lazyLoad)
  },
  stopLazyLoad: () => {
    document.removeEventListener('scroll', LazyLoad.lazyLoad)
    window.removeEventListener('resize', LazyLoad.lazyLoad)
    window.removeEventListener('orientationchange', LazyLoad.lazyLoad)
  },
}

export default LazyLoad
