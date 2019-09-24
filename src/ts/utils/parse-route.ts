function createMatch(isExact, path, url, params) {
  return {
    isExact,
    path,
    url,
    params,
  }
}

function trimTrailingSlash(url) {
  return url.replace(/^\/|\/$/g, '')
}

function decodeParam(val) {
  try {
    return decodeURIComponent(val)
  } catch (e) {
    return val
  }
}

export function parseRoute(path, url, options) {
  if (path === url || !path) {
    return createMatch(path === url, path, url, {})
  }

  let exact = options && options.exact
  let paths = trimTrailingSlash(path).split('/')
  let urls = trimTrailingSlash(url).split('/')
  let params = {}

  if (paths.length > urls.length || (exact && paths.length < urls.length)) {
    return
  }

  for (let i = 0, len = paths.length, urll = ''; i < len; i++) {
    if (':' === paths[i][0]) {
      params[paths[i].slice(1)] = urls[i] = decodeParam(urls[i])
    } else if (paths[i] !== urls[i]) {
      return
    }
    urll += urls[i] + '/'
  }

  return createMatch(false, path, url, params)
}
