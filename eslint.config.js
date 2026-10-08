const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                BUILD: 'readonly',
                RUNS_URL: 'readonly',
            },
        },
    },
    {
        files: ['webpack.config.babel.js', 'eslint.config.js', 'postcss.config.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
    },
]
