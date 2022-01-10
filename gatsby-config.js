const themeColor = "#3D476E";
const bgColor = "#2A3149";
const themeBgColor = "#2A3149";

const secondaryTheme = "";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `DscJobs Documentation`,
    description: `Official Documentation for the DscJobs API, Website and Discord Server`,
    author: `DscJobs`,
    siteUrl: `https://docs.dscjobs.org`,
    themeColor,
    msTileColor: "#3D476E",
    github: {
      owner: "DscJobs",
      name: "Docs",
      docsRoot: "docs/",
      branch: "main"
    },
    api: {
      restVersion: "REST v1",
      gatewayVersion: "Gateway v1"
    }
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/docs/`,
        name: "docs"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/data/`,
        name: "data"
      }
    },
    ...(process.env.GITHUB_TOKEN == null
      ? []
      : [
          {
            resolve: "gatsby-source-graphql",
            options: {
              typeName: "GitHub",
              fieldName: "github",
              url: "https://api.github.com/graphql",
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
              },
              fetchOptions: {}
            }
          }
        ]),
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-smartypants",
            options: {}
          },
          {
            resolve: "gatsby-remark-slug",
            options: {}
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {}
          },
          {
            resolve: "gatsby-remark-embed-snippet",
            options: {
              directory: `${__dirname}/docs/`
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1500,
              withWebp: true,
              backgroundColor: bgColor,
              linkImagesToOriginal: true
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {}
            }
          }
        ],
        // ! remove plugins when https://github.com/gatsbyjs/gatsby/issues/16242 gets merged
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1500,
              withWebp: true,
              backgroundColor: bgColor,
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-use-dark-mode`
  ]
};
