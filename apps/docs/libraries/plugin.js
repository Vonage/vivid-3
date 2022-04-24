
const defaultPreprocessors = {
  html: code => code
}

function defaultWrap(demo, code) {
  return '<div class="markdown-demo">' + demo + '</div>' + code
}

// should fork https://github.com/ktsn/markdown-it-demo-renderer
module.exports = function plugin(md, params = {}) {
  const defaultRenderer = md.renderer.rules.fence
  const wrap = params.wrap || defaultWrap
  const preprocessors = {
    ...defaultPreprocessors,
    ...(params.preprocessors || {})
  }

  md.renderer.rules.fence = function demoRenderer(
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const token = tokens[idx]
    const preprocess = preprocessors[token.info.trim()]

    if (!preprocess) {
      return defaultRenderer(tokens, idx, options, env, self)
    }

    const demo = preprocess(token.content)

    return wrap(demo, defaultRenderer(tokens, idx, options, env, self))
  }
}
