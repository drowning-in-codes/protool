之前好像写过一些关于Python的Web框架?现在再按照ASGI与原本的WSGI区分一下,顺便把**框架**(framework)与**库**(library)区分一下.
<!--more-->

之前我也写过(或者说想过)一些类似生态以及作用的框架进行比较,大多都是看看网上评价以及star数,现在我想大概使用以下感受一下氛围,毕竟现在找工作一般也不会强调用python的web(事实上python的web确实要比Java的生态啥的要差).

根据github的star与网上观察,我对Django,Flask,FastAPI,Tornado,Sanic上手浅尝一下,毕竟其他框架还不到10k star,未来可期.

首先使用Python开发web的主要目的还是开发效率高,可用的第三方库可以说是数一<del>数二</del>,而web框架本身很多时候就是在传参CRUD搞来搞去,所以相关生态和社区活跃度应该是最重要的因素之一了.这也是我选择star数高的框架原因,我看见有些推荐的某些框架已经几年没有新的commit了,所以现在趁着有空看看目前Python web情况.另外可以订阅[PyCoder’s Weekly | A Weekly Python Email Newsletter (pycoders.com)](https://pycoders.com/)

![image-20240328234239085](https://s2.loli.net/2024/03/28/1VRMny34mdt9b6f.png)

![img](https://i.imgur.com/7paYgeL.jpg)

扎心了....2015年的回答,还是很领先的.所以Python的强项还是偏计算,做一些有效的上层的应用.或者去研究一下CPython做东西.

而目前Flask,Django都已支持异步网络模型,所以做个小项目应该是没啥差别的.以下使用poetry管理包环境.

![image-20240329235216575](https://s2.loli.net/2024/03/29/PMb2aJfliZdmTH8.png)

### Django



[初识 Django | Django 文档 | Django (djangoproject.com)](https://docs.djangoproject.com/zh-hans/5.0/intro/overview/)

```sh
poetry add django
django-admin startproject mysite
```

创建项目,一个项目下有很多应用.

>一个 Python 包 —— 即一个代码目录 -- 它包含 Django 的一个实例中所有的设置。这包括数据库配置，Django 的特定选项和特定应用程序设置

文件结构如下

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

在`views.py`中创建**视图**,在创建`urls.py`作为url配置进行映射,然后在mysite/urls.py创建urlpatterns

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("polls/", include("polls.urls")),
    path("admin/", admin.site.urls),
]
```

作为web框架需要思考的几个问题就是 数据库的CRUD,在Django的setting.py下修改相关配置.比如配置数据库的连接以及账户,密码等信息.此外这个文件中还有一些默认安装的应用,这些应用有些也会创建数据表在使用之前需要在数据库中创建一些表。

```python
python manage.py migrate
```



#### 创建模型

许多web框架都强调这一点,然而模型到底是什么？`数据库结构设计和附加的其它元数据`

>一个模型就是单个定义你的数据的信息源。模型中包含了不可缺少的数据区域和你存储数据的行为。

```python
from django.db import models

# Create your models here.
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

创建好后就能直接使用django提供的工具,先创建python写的sql语句,再利用语句创建表



```python
python manage.py makemigrations polls
python manage.py migrate
```

我这里使用默认的sqlite数据库,还是很方便的.

![image-20240329200022851](https://s2.loli.net/2024/03/29/HThLi4fXlgpUcsu.png)

当然定义里模型之后还要激活模型才能创建迁移语句.激活语句就是在setting.py中添加配置

```python
INSTALLED_APPS = [
    "polls.apps.PollsConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
```

还可以进shell,通过创建的models直接进行添加字段.

```python
python manage.py shell
```

也就是直接利用继承了models.Model的python对象操作数据库字段.

此外还可以创建超级用户通过web修改.

```python
python manage.py createsuperuser
```

还需要在admin.py中注册一下可以在管理员中查看.

```python
# admin.py
from .models import Question
admin.site.register(Question)
```

Django把对于request的相应叫做views,本身它也有个貌似叫做MVT的概念?其实跟MVC差不多,model,view以及template.这些概念其实早就在其它语言的web框架深深渗透了.

```python
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def sayHello(request):
    return JsonResponse({"ans": "Hello"})
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```

再在urls中配置

```python
from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path("", views.index, name="index"),
    # ex: /polls/5/
    path("<int:question_id>/", views.detail, name="detail"),
    # ex: /polls/5/results/
    path("<int:question_id>/results/", views.results, name="results"),
    # ex: /polls/5/vote/
    path("<int:question_id>/vote/", views.vote, name="vote"),

    path("what", views.vote, name="vote"),
]
```

>视图可以从数据库里读取记录，可以使用一个模板引擎（比如 Django 自带的，或者其他第三方的），可以生成一个 PDF 文件，可以输出一个 XML，创建一个 ZIP 文件，你可以做任何你想做的事，使用任何你想用的 Python 库。

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

```

使用一个模板作为视图的返回值.可以看到setting中的设置



在视图中,可以使用HttpResponse和template.render返回html,或者是直接使用render.

```python
from django.shortcuts import render

from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)
```

>载入模板，填充上下文，再返回由它生成的 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/5.0/ref/request-response/#django.http.HttpResponse) 对象」是一个非常常用的操作流程。于是 Django 提供了一个快捷函数，用它来重写 `index()` 视图

可以抛出404错误

```python
from django.http import Http404
from django.shortcuts import render

from .models import Question


# ...
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, "polls/detail.html", {"question": question})
    def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/detail.html", {"question": question})
```

传入参数可供模板调用

```html
<h1>{{ question.question_text }}</h1>
<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }}</li>
{% endfor %}
</ul>
```

还能使用urls.py中的name修改模板中的硬编码

```python
path("<int:question_id>/", views.detail, name="detail")
```

```python
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
```

```python
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

这里模板中使用`{% url 'detail'%}`就表示



还可以给url名称添加命名空间.为了避免多个应用views冲突.在urls.py中添加app.name

```python
app_name = "polls"
```

还可以使用` HttpResponseRedirect`的``reverse()`的函数构造URL字符串

```python
HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
```

使用通用视图,通用视图将常见的模式抽象到了一个地步，以至于你甚至不需要编写 Python 代码来创建一个应用程序。例如，[`ListView`](https://docs.djangoproject.com/zh-hans/5.0/ref/class-based-views/generic-display/#django.views.generic.list.ListView) 和 [`DetailView`](https://docs.djangoproject.com/zh-hans/5.0/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 通用视图分别抽象了 "显示对象列表" 和 "显示特定类型对象的详细页面" 的概念。

>这些视图反映基本的网络开发中的一个常见情况：**根据 URL 中的参数从数据库中获取数据、载入模板文件然后返回渲染后的模板。 由于这种情况特别常见，Django 提供一种快捷方式，叫做 “通用视图” 系统**。

使用通用视图需要修改urlconf和视图.

```
from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]

```

上面就是使用改好的通用视图跟url配对.对于ListView和DetailView不太一样,ListView的context命名是<model_name>_list,所以需要使用`context_object_name`,而DetailView默认是<model_name>

```python
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"


class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"


def vote(request, question_id):
    # same as above, no changes needed.
    ...
```

视图中配置好模板,模型还可以修改传入的context变量名字`context_object_name `



测试

```python
import datetime
from django.test import TestCase
from django.utils import timezone

from .models import Question


class QuestionModelTests(TestCase):
    def test_was_published_recently_with_future_question(self):
        """
        was_published_recently() returns False for questions whose pub_date
        is in the future.
        """
        time = timezone.now() + datetime.timedelta(days=30)
        future_question = Question(pub_date=time)
        self.assertIs(future_question.was_published_recently(), False)
```

```python
python manage.py test polls
```



在模板中使用静态文件,默认目录是`static`

```html
{% load static %}

<link rel="stylesheet" href="{% static 'polls/style.css' %}">
```

此外我们还可以修改Django后台的表单和界面等.



[Django Packages : Reusable apps, sites and tools directory for Django](https://djangopackages.org/)



可以看到django不愧是python内活跃度和生态数一数二的框架了,快速开发还是很方便的,内置了很多东西,不只是单纯的restfulAPI.当然Django也有个rest framework[Home - Django REST framework (django-rest-framework.org)](https://www.django-rest-framework.org/)更加适合写API

### Flask

相比于Django,Flask更偏向单纯写API,插件生态没有Django多,数据库一般使用sqlalchemy.

但是Flask包括了html模板,路由,静态文件,sessions应该有的功能.我也拿它写个小web程序,这里不赘述了.[论文查 (proanimer.com)](https://proanimer.com/arxiv/result)

[drowning-in-codes/paper-reader (github.com)](https://github.com/drowning-in-codes/paper-reader)

![image-20240329225756697](https://s2.loli.net/2024/03/29/DEFAU7eBNqKTmnX.png)

上面这两个框架用于生产环境时还需要使用WSGI服务器,比如uWSGI,gunicorn等.

### FastAPI

很火的异步web框架

```python
pip install fastapi
pip install "uvicorn[standard]"
```

看看下面基本示例,

```python
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

写法还是很朴素的

```python
# 如果你的代码里会出现 async / await，请使用 async def：


from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

特点包括:异步(Starlette支持),数据验证Pydantic,交互式文档(使用swagger UI生成)

很容易上手学习,官方推荐数据库ORM也是SQLAlchemy.







### Tornado

```python
import asyncio
import tornado

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
```

也是异步框架,适合websockets等.

```python
pip install tornado
```

我看了一下文档,感觉不是很好上手

```python
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", MainHandler),
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()    
```

Tornado 大致可分为四个主要部分：

- Web框架（包括 [`RequestHandler`](https://www.osgeo.cn/tornado/web.html#tornado.web.RequestHandler) 它是创建Web应用程序和各种支持类的子类）。
- HTTP的客户端和服务器端实现 ([`HTTPServer`](https://www.osgeo.cn/tornado/httpserver.html#tornado.httpserver.HTTPServer) 和 [`AsyncHTTPClient`](https://www.osgeo.cn/tornado/httpclient.html#tornado.httpclient.AsyncHTTPClient) ）
- 包含类的异步网络库 [`IOLoop`](https://www.osgeo.cn/tornado/ioloop.html#tornado.ioloop.IOLoop) 和 [`IOStream`](https://www.osgeo.cn/tornado/iostream.html#tornado.iostream.IOStream) 作为HTTP组件的构建块，也可以用于实现其他协议。
- 协作程序库 ([`tornado.gen`](https://www.osgeo.cn/tornado/gen.html#module-tornado.gen) ）它允许异步代码以比链接回调更简单的方式写入。这类似于Python3.5中引入的本地协同工作特性。

### Sanic

我第一次看到是一个开源项目再用,目前更新还是比较频繁的.可以说是除了FastAPI最有前途的了.

![image-20240329231255284](https://s2.loli.net/2024/03/29/y8Uda4LGTKlDkXM.png)

```python
pip install sanic
```

```python
from sanic import Sanic
from sanic.response import text

app = Sanic("MyHelloWorldApp")

@app.get("/")
async def hello_world(request):
    return text("Hello, world.")

```

官网的文档也强调了其关注performance,flexibility和易于使用.我觉得这些跟python比较契合.

连接数据库,app注册

```python
app = Sanic("MyApp")

@app.before_server_start
async def attach_db(app, loop):
    app.ctx.db = Database()
    
    
# app registry 相当于在一个地方给它挂Sanic上
# ./path/to/server.py
from sanic import Sanic

app = Sanic("my_awesome_server")

# ./path/to/somewhere_else.py
from sanic import Sanic

app = Sanic.get_app("my_awesome_server")

# 数据库配置
app = Sanic('myapp')

app.config.DB_NAME = 'appdb'
app.config['DB_USER'] = 'appuser'

db_settings = {
    'DB_HOST': 'localhost',
    'DB_NAME': 'appdb',
    'DB_USER': 'appuser'
}
app.config.update(db_settings)


# ./path/to/server.py 工厂模式得到app并使用sanic path.to.server:create_app运行
from sanic import Sanic
from .path.to.config import MyConfig
from .path.to.some.blueprint import bp


def create_app(config=MyConfig) -> Sanic:
    app = Sanic("MyApp", config=config)
    app.blueprint(bp)
    return app
```

handlers,request,response等都是老话了.

```
from sanic import text

@app.get("/foo")
async def foo_handler(request):
    return text("I said foo!")
@app.get("/typed")
async def typed_handler(request: Request):
    return text("Done.")

@app.route('/test', methods=["POST", "PUT"])
async def handler(request):
    return text('OK')
```

Sanic提供了Listener,看起来像在生命周期内添加hook.

```python
@app.reload_process_start
async def reload_start(*_):
    print(">>>>>> reload_start <<<<<<")

@app.main_process_start
async def main_start(*_):
    print(">>>>>> main_start <<<<<<")
	
@app.before_server_start
async def before_start(*_):
	print(">>>>>> before_start <<<<<<")

```

```python
@app.listener("before_server_start")
async def listener_1(app, loop):
    print("listener_1")

@app.before_server_start
async def listener_2(app, loop):
    print("listener_2")

@app.listener("after_server_start")
async def listener_3(app, loop):
    print("listener_3")

@app.after_server_start
async def listener_4(app, loop):
    print("listener_4")

@app.listener("before_server_stop")
async def listener_5(app, loop):
    print("listener_5")

@app.before_server_stop
async def listener_6(app, loop):
    print("listener_6")

@app.listener("after_server_stop")
async def listener_7(app, loop):
    print("listener_7")

@app.after_server_stop
async def listener_8(app, loop):
    print("listener_8")
```

Sanic跟Flask一样提供了蓝图.

>蓝图是一种可用于应用程序内子路由的对象。蓝图定义了用于添加路由的类似方法，而不是将路由添加到应用程序实例中，然后以灵活和可插拔的方式将路由注册到应用程序中。
>
>蓝图对大型应用程序尤其有用，因为在大型应用程序中，应用程序逻辑可被分解为多个组或责任区。

```python
# ./my_blueprint.py
from sanic.response import json
from sanic import Blueprint

bp = Blueprint("my_blueprint")

@bp.route("/")
async def bp_root(request):
    return json({"my": "blueprint"})

from sanic import Sanic
from my_blueprint import bp

app = Sanic(__name__)
app.blueprint(bp)
```



## 后话

此外还有Starlette,Quart,Falcon等异步网络框架(其实没必要这么强调异步).但鉴于还没有那么多生态就先不品鉴了.

后面有空应该还会品鉴一下Node的后端框架,比如koa,express,nest等.PHP框架还有Laravel,Sympfony,ThinkPHP以及基于Swoole,workerman的hyperf[Hyperf](https://hyperf.wiki/2.0/#/),webman框架等等,不过我可能更看好Laravel(不用太在意其性能).除了这些语言,Java,C#,Go就是Web常客了(不过.Net发展有点曲折),它们的web框架比较集中也成熟,工作上也用得很多.
