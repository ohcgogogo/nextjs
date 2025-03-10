module.exports = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
        defaultLocale: 'default',
        locales: ['default', 'ko', 'en'],
        localeDetection: false,
    },
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : '/locales',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};