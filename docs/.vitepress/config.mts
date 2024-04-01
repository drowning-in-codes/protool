import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "protools",
  description: "tools which I learn and use",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "Web框架",
        items: [
          { text: "Node", link: "/node_web" },
          { text: "Python", link: "/python_web" },
        ],
      },
    ],
    nav: [
      {
        text: "Web框架",
        items: [
          { text: "Node", link: "/node_web" },
          { text: "Python", link: "/python_web" },
        ],
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright ©${new Date().getFullYear()}.Made with ❤ <a href="https://sekyoro.top">Sekyoro</a>`,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/drowning-in-codes" },
    ],
  },
});
