
const cracoLessResourcesLoader = require('craco-plugin-style-resources-loader');
const path = require('path');
const CracoLessPlugin  = require('craco-less');
const CracoAntDesignPlugin = require('craco-antd')
const CracoAlias = require("craco-alias")

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@link-color": "#1DA57A",
              "@border-radius-base": "2px"
            },
            javascriptEnabled: true
          }
        }
      }
    },
    {
      plugin: CracoAntDesignPlugin,
    },
    {
      plugin: cracoLessResourcesLoader,
      options: {
          patterns: path.join(__dirname, 'public/styles/main.less'),
          /* 
              Please enter supported CSS processor type
              1. if u use css processor，please type css string
              2. if u use less processor，please type less string
              3. if u use sass or scss processor，please type sass or scss string，Choose one of the two
              4. if u use stylus processor，please type stylus string
          */
          styleType: 'less'
      }
    },
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@": "./src",
          "@api": "./src/api",

        }
      }
    }

  ],
}