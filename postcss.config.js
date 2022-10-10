const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  safelist: ['theme--dark', 'theme--light', 'nav--active'],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
});

const cssnano = require('cssnano')({
  preset: 'default',
});

module.exports = {
  plugins: [...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss, cssnano] : [])],
};
