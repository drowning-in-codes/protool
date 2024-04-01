// docs/.vitepress/config.mts
import { defineConfig } from "file:///F:/tools_doc/node_modules/vitepress/dist/node/index.js";
var config_default = defineConfig({
  title: "protools",
  description: "tools which I learn and use",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        text: "Web\u6846\u67B6",
        items: [
          { text: "Node", link: "/node_web" },
          { text: "Python", link: "/python_web" }
        ]
      }
    ],
    nav: [{ text: "Web\u6846\u67B6", link: "/node_web" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright \xA9${(/* @__PURE__ */ new Date()).getFullYear()}.Made with \u2764 <a href="https://sekyoro.top">Sekyoro</a>`
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/drowning-in-codes" }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx0b29sc19kb2NcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFx0b29sc19kb2NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Rvb2xzX2RvYy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiBcInByb3Rvb2xzXCIsXG4gIGRlc2NyaXB0aW9uOiBcInRvb2xzIHdoaWNoIEkgbGVhcm4gYW5kIHVzZVwiLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcblxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJXZWJcdTY4NDZcdTY3QjZcIixcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6IFwiTm9kZVwiLCBsaW5rOiBcIi9ub2RlX3dlYlwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlB5dGhvblwiLCBsaW5rOiBcIi9weXRob25fd2ViXCIgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBuYXY6IFt7IHRleHQ6IFwiV2ViXHU2ODQ2XHU2N0I2XCIsIGxpbms6IFwiL25vZGVfd2ViXCIgfV0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiBcIlJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cIixcbiAgICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0uTWFkZSB3aXRoIFx1Mjc2NCA8YSBocmVmPVwiaHR0cHM6Ly9zZWt5b3JvLnRvcFwiPlNla3lvcm88L2E+YCxcbiAgICB9LFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vZHJvd25pbmctaW4tY29kZXNcIiB9LFxuICAgIF0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxvQkFBb0I7QUFFblMsSUFBTyxpQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBO0FBQUEsSUFHWCxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBRSxNQUFNLFFBQVEsTUFBTSxZQUFZO0FBQUEsVUFDbEMsRUFBRSxNQUFNLFVBQVUsTUFBTSxjQUFjO0FBQUEsUUFDeEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSyxDQUFDLEVBQUUsTUFBTSxtQkFBUyxNQUFNLFlBQVksQ0FBQztBQUFBLElBQzFDLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVcsa0JBQWMsb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUFBLElBQ25EO0FBQUEsSUFFQSxhQUFhO0FBQUEsTUFDWCxFQUFFLE1BQU0sVUFBVSxNQUFNLHVDQUF1QztBQUFBLElBQ2pFO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
