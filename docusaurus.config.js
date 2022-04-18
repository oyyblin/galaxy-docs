// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Project Galaxy Docs",
  tagline:
    "Here you'll find guides, resources, and references you can use to onboard and build with Project Galaxy",
  url: "https://docs.galaxy.eco",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "ProjectGalaxyHQ",
  projectName: "galaxy-docs",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          path: "doc-overview",
          id: "default",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          editUrl: "https://github.com/ProjectGalaxyHQ/galaxy-docs/blob/main",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "297286110",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // SEO
      image: "static/img/meta-bg.jpg",
      metadata: [
        { name: "title", content: "Project Galaxy Docs" },
        {
          name: "description",
          content:
            "Here you'll find guides, resources, and references you can use to onboard and build with Project Galaxy.",
        },
        { name: "language", content: "English" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@ProjectGalaxyHQ" },
        { name: "twitter:creator", content: "@oyyblin" },
        {
          property: "og:url",
          content: "https://docs.galaxy.eco/",
        },
        {
          property: "og:title",
          content: "Project Galaxy Docs",
        },
        {
          property: "og:description",
          content:
            "Here you'll find guides, resources, and references you can use to onboard and build with Project Galaxy.",
        },
        {
          property: "og:image",
          content: "static/img/meta-bg.jpg",
        },
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   content: "wow",
      // },
      navbar: {
        logo: {
          src: "img/logo-light-vert.png",
          srcDark: "img/logo-dark-vert.png",
        },
        items: [
          {
            type: "doc",
            docId: "into-the-galaxy/overview",
            label: "Overview",
            position: "left",
          },
          {
            type: "doc",
            docId: "getting-started/introduction",
            docsPluginId: "developer",
            label: "Developer",
            position: "left",
          },
          {
            type: "doc",
            docId: "dashboard-tutorial/introduction",
            docsPluginId: "guides",
            label: "Guides",
            position: "left",
          },
          {
            type: "doc",
            docId: "introduction",
            docsPluginId: "governance",
            label: "Governance",
            position: "left",
          },
          {
            href: "https://galaxy.eco",
            label: "App",
            position: "right",
          },
          {
            href: "https://to.galaxy.eco/support",
            label: "Contact Support",
            position: "right",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Governance",
            items: [
              {
                label: "Forum",
                href: "https://forum.galaxy.eco/",
              },
              {
                label: "Proposals",
                href: "governance/",
              },
              {
                label: "Vote",
                href: "https://vote.galaxy.eco/",
              },
            ],
          },
          {
            title: "Developer",
            items: [
              {
                label: "Github",
                href: "https://github.com/ProjectGalaxyHQ",
              },
              {
                label: "Developer Docs",
                to: "developer/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/projectgalaxy",
              },
              {
                label: "Twitter",
                href:
                  "https://twitter.com/intent/follow?screen_name=ProjectGalaxyHQ",
              },
              {
                label: "Telegram",
                href: "https://t.me/ProjectGalaxyHQ",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Docs",
                href: "/",
              },
              {
                label: "Guides",
                href: "https://docs.galaxy.eco/guide",
              },
              {
                label: "Blog",
                href: "https://blog.galaxy.eco/",
              },
              {
                label: "Newsletter",
                href: "http://newsletter.galaxy.eco/",
              },
            ],
          },
          {
            title: "About Us",
            items: [
              {
                label: "App",
                href: "https://galaxy.eco/",
              },
              {
                label: "Brand Assets",
                href: "https://to.galaxy.eco/brand",
              },
              {
                label: "Contact Support",
                href: "https://to.galaxy.eco/support",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Project Galaxy`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // docusaurus-plugin-image-zoom
      zoom: {
        selector: ".markdown :not(em) > img",
        config: {
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
        },
      },
    }),

  plugins: [
    [
      "@edno/docusaurus2-graphql-doc-generator",
      {
        schema: "https://graphigo.prd.galaxy.eco/query",
        // docs will be generated under rootPath/baseURL
        rootPath: "./doc-developer/4-graphql-api",
        baseURL: "references",
        // needed because we use 4-graphql-api with alias graphql-api
        linkRoot: "../..",
        loaders: {
          UrlLoader: "@graphql-tools/url-loader",
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "developer",
        path: "doc-developer",
        routeBasePath: "developer",
        sidebarPath: require.resolve("./sidebars.js"),
        sidebarCollapsible: true,
        editUrl: "https://github.com/ProjectGalaxyHQ/galaxy-docs/blob/main",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "guides",
        path: "doc-guides",
        routeBasePath: "guide",
        sidebarPath: require.resolve("./sidebars.js"),
        sidebarCollapsible: true,
        editUrl: "https://github.com/ProjectGalaxyHQ/galaxy-docs/blob/main",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "governance",
        path: "doc-governance",
        routeBasePath: "governance",
        sidebarPath: require.resolve("./sidebars.js"),
        sidebarCollapsible: true,
        editUrl: "https://github.com/ProjectGalaxyHQ/galaxy-docs/blob/main",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        indexDocs: true,
        indexBlog: false,
        hashed: true,
        docsRouteBasePath: "/",
        docsDir: "doc-developer",
      },
    ],
  ],
};

module.exports = config;
