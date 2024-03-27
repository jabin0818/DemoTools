const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const CracoLessPlugin = require('craco-less')
module.exports = {
    webpack: {
        alias: {
            // @映射src路径
            '@': resolve('src'),
            'components': resolve('src/components')
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
        }
    ]
}