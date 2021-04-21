// Filters
const dateFilter = require('./src/filters/date-filter.js');

module.exports = (config) => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);

  // gulp's handling this now
  // config.addPassthroughCopy('./src/img/');
  // config.addPassthroughCopy('./src/fonts/');

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
