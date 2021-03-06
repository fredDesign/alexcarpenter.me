const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false,
})

module.exports = {
  Figure: function({ src, alt = '', caption = '', ratio = '16/9', border = false }) {
    return `<figure class="u-extend">
              <div${border ? ` class="u-bordered"` : ''} style="--aspect-ratio: ${ratio};">
                <img src="${src}" alt="${alt}" />
              </div>
              ${caption ? `<figcaption>${caption}</figcaption>` : ''}
            </figure>`
  },

  Note: function({
    label = 'Note',
    text = '',
    type = 'default',
    labelHidden = false,
    link
  }) {
    return `<div class="c-note c-note--${type}">
              <p><span class="c-note__label${labelHidden ? ' u-hidden-visually' : ''}">${label}: </span>${text}${link ? `<br><a href="${link.url}">${link.text}</a>${link.external ? ' <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="var(--color-gray)" d="M66 8H48V0h32v32h-8V14L38 48l-6-6L66 8zm6 40h8v32H0V0h32v8H8v64h64V48z"/></svg>' : ''}` : ''}</p>
            </div>`
  },

  Stats: function({ items = [] }) {
    return `<dl class="c-stats">
            ${items.map((item) => `
              <dt class="c-stats__title">${item.title}</dt>
              <dd class="c-stats__description">${item.description}</dd>
            `).join('')}
            </dl>`;
  },

  Video: function({
    url = '',
    ratio = '16/9',
    controls = true,
    autoPlay = false,
    loop = false,
    caption = ''
  }) {
    return `<figure class="c-video">
              <div style="--aspect-ratio: ${ratio};">
                <video${controls ? ' controls' : ''}${autoPlay ? ' autoPlay' : ''}${loop ? ' loop' : ''}>
                  <source src="${url}" type="video/mp4">
                  <p>Your browser doesn't support HTML5 video. Here is a <a href="${url}">link to the video</a> instead.</p>
                </video>
              </div>
              ${controls ? '' : `<button class="c-video__pause js-pause-video"><span class="u-hidden-visually">Pause video</span></button>`}
              ${caption ? `<figcaption class="c-video__caption">${caption}</figcaption>` : ''}
            </figure>`
  },

  Youtube: function(id) {
    return `<div style="--aspect-ratio: 16/9;">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>`
  },

  Link: function({
    url = '',
    text = '',
    type = 'default',
    external = false,
    size = ''
  }) {
    `<a href="${url}" ${external ? `rel="external"` : ''} class="c-link c-link--${type} ${size ? `c-link--${size}` : ''}"><span>${text}${external ? '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="var(--color-gray)" d="M66 8H48V0h32v32h-8V14L38 48l-6-6L66 8zm6 40h8v32H0V0h32v8H8v64h64V48z"/></svg>' : ''}</span></a>`
  },

  Quote: function({ text, cite }) {
    return `<figure class="c-quote">
              <blockquote class="c-quote__text">
                <p>${markdown.renderInline(text)}</p>
              </blockquote>
              ${cite ? `<figcaption class="c-quote__cite">${markdown.renderInline(cite)}</figcaption>` : ''}
            </figure>`
  }
}
