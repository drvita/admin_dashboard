const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts');

module.exports = withNextIntl({});