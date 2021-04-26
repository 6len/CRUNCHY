module.exports = {
    siteMetadata: {
        title: "Crunchy",
    },
    plugins: [
        `gatsby-plugin-material-ui`,
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /svg/
                }
            }
        }
    ],
};
