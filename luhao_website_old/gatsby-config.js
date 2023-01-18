module.exports = {
  pathPrefix: `/test_official_web`,
  siteMetadata: {
    title: `陸豪科技有限公司`,
    description: `本公司為一家專業製造電子遊戲機公司。創立於1998年，自傳統產業一路改革創新至今。軟件.硬體至成品均為公司經營範圍。公司並跨足2岸3地，專研遊戲機產業本著穩健的步伐，開創新的遊戲空間。所生產的機器曾多次上電視綜藝節目撥出，常常榮登全台最流行的遊戲機。歡迎對網路及遊戲有熱誠的夥伴，一起結合遊戲及網路世界，開創歡樂的兒童樂園。`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}