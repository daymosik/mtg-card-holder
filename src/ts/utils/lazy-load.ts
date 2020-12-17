const LazyLoad = {
  lazyLoad: (): void => {
    let lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll('img.lazy'))
    let active = false

    const handleImage = (lazyImage: HTMLImageElement) => {
      const shouldLoad =
        lazyImage.getBoundingClientRect().top <= window.innerHeight &&
        lazyImage.getBoundingClientRect().bottom >= 0 &&
        getComputedStyle(lazyImage).display !== 'none'
      if (shouldLoad) {
        lazyImage.src = lazyImage.dataset.src || ''
        lazyImage.classList.remove('lazy')
        lazyImages = lazyImages.filter((image) => image !== lazyImage)

        if (lazyImages.length === 0) {
          // LazyLoad.stopLazyLoad()
        }
      }
    }

    if (!active) {
      active = true
      setTimeout(() => {
        lazyImages.forEach(handleImage)
        active = false
      }, 200)
    }
  },
  startLazyLoad: (): void => {
    LazyLoad.lazyLoad()
    document.addEventListener('scroll', LazyLoad.lazyLoad)
    window.addEventListener('resize', LazyLoad.lazyLoad)
    window.addEventListener('orientationchange', LazyLoad.lazyLoad)
  },
  stopLazyLoad: (): void => {
    document.removeEventListener('scroll', LazyLoad.lazyLoad)
    window.removeEventListener('resize', LazyLoad.lazyLoad)
    window.removeEventListener('orientationchange', LazyLoad.lazyLoad)
  },
}

export default LazyLoad
