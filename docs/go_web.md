说实话,Go这边热度下降了不少,主要市场还是在云原生以及少许微服务.它本身的标准库已经非常够用了搭配健全的官方package仓库,用起来很顺畅.
<img src="https://blog.jetbrains.com/wp-content/uploads/2021/02/11-2x-2.png" alt="img" style="zoom: 33%;" />
Go的web框架生态依旧零零碎碎,没有一个大的统一框架,不过这也正常,目前除了Java,其他都难说.

目前Go管理包都使用mod了,不用去看网上老教程的什么GO PATH配一堆.

## Gin

```go
package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

Gin应该是最常使用的了,star数目前75.1k,官方例子也比较多[文档 | Gin Web Framework (gin-gonic.com)](https://gin-gonic.com/zh-cn/docs/)

## Echo

```go
package main

import (
	"net/http"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
```

简洁高性能扩展性强的web框架,看起来跟gin没有什么太大的差别.

```go
func(c echo.Context) error {
  return c.HTML(http.StatusOK, "<strong>Hello, World!</strong>")
}
```

## Iris

```go
package main

import "github.com/kataras/iris/v12"

func main() {
  app := iris.New()
  app.Use(iris.Compression)
  app.Get("/", func(ctx iris.Context) {
    ctx.HTML("Hello <strong>%s</strong>!", "World")
  })
  app.Listen(":8080")
}
```

```go
func main() {
    app := iris.Default()

    // Simple group: v1
    v1 := app.Party("/v1")
    {
        v1.Post("/login", loginEndpoint)
        v1.Post("/submit", submitEndpoint)
        v1.Post("/read", readEndpoint)
    }

    // Simple group: v2
    v2 := app.Party("/v2")
    {
        v2.Post("/login", loginEndpoint)
        v2.Post("/submit", submitEndpoint)
        v2.Post("/read", readEndpoint)
    }

    app.Listen(":8080")
}
```

## Fiber

号称是受express影响的框架,看代码还是不错的

```go
func main() {
    app := fiber.New()

    // GET /api/register
    app.Get("/api/*", func(c fiber.Ctx) error {
        msg := fmt.Sprintf("✋ %s", c.Params("*"))
        return c.SendString(msg) // => ✋ register
    })

    // GET /flights/LAX-SFO
    app.Get("/flights/:from-:to", func(c fiber.Ctx) error {
        msg := fmt.Sprintf("💸 From: %s, To: %s", c.Params("from"), c.Params("to"))
        return c.SendString(msg) // => 💸 From: LAX, To: SFO
    })

    // GET /dictionary.txt
    app.Get("/:file.:ext", func(c fiber.Ctx) error {
        msg := fmt.Sprintf("📃 %s.%s", c.Params("file"), c.Params("ext"))
        return c.SendString(msg) // => 📃 dictionary.txt
    })

    // GET /john/75
    app.Get("/:name/:age/:gender?", func(c fiber.Ctx) error {
        msg := fmt.Sprintf("👴 %s is %s years old", c.Params("name"), c.Params("age"))
        return c.SendString(msg) // => 👴 john is 75 years old
    })

    // GET /john
    app.Get("/:name", func(c fiber.Ctx) error {
        msg := fmt.Sprintf("Hello, %s 👋!", c.Params("name"))
        return c.SendString(msg) // => Hello john 👋!
    })

    log.Fatal(app.Listen(":3000"))
}

```



最后部署可以使用Render[Docs + Quickstarts | Render Docs](https://docs.render.com/),还有一些go的web框架,但感觉文档不是很好或者目前用的人还不多,所以就先不说了.