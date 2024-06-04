import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "protools",
  description: "tools which I learn and use",
  head: [['link', { rel: 'icon',type:'image/png',href: '/favicon.png' }],
  ['link', { rel: 'icon',href: '/favicon.ico' }],
  ],
 
  themeConfig: {
   logo: '/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
	  lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
	},
    sidebar: [
      {
        text: "Web框架",
        items: [
          { text: "Node", link: "/node_web" },
          { text: "Python", link: "/python_web" },
          { text: "Go", link: "/go_web" },
        ],
      },
	    {
        text: "计算机图形学",
        items: [
          { text: "学习路线", link: "cg/overview" },
          { text: "3D Computer Graphics Primer: Ray-Tracing as an Example", link: "cg/part1" },
		  { text: "Overview of the Ray-Tracing Rendering Technique", link: "cg/Overview of the Ray-Tracing Rendering Technique" },
		 
        ],
      },
    ],
    nav: [
      {
        text: "Web框架",
        items: [
          { text: "Node", link: "/node_web" },
          { text: "Python", link: "/python_web" },
          { text: "Go", link: "/go_web" },
		  
        ],
      },
	  {
        text: "计算机图形学",
        items: [
          { text: "学习路线", link: "cg/overview" },
          { text: "介绍", link: "cg/part1" },
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
