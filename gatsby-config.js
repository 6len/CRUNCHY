module.exports = {
  siteMetadata: {
    title: "Crunchy",
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-polyfill-io`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
};
