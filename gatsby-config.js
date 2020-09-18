const apiKey = process.env.CYPRESS
  ? process.env.CYPRESS_API_KEY
  : process.env.MVC_FIREBASE_API_KEY
const domain = process.env.CYPRESS
  ? process.env.CYPRESS_DOMAIN
  : process.env.MVC_FIREBASE_DOMAIN

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/room/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")]
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Source Sans Pro"],
          urls: ["/src/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey,
          authDomain: `${domain}.firebaseapp.com`,
          databaseURL: `https://${domain}.firebaseio.com`,
          projectId: `${domain}`,
          storageBucket: `${domain}.appspot.com`,
        },
      },
    },
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimum-viable-ceremonies`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    }
  ],
}
