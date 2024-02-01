### 项目名称

大屏模板

### 项目环境

- 开发环境: nodejs@v16.20.0/pnpm@v8.6.1/typescript@5.1.6
- 构建工具: vite@4.4.6
- 开发框架: vue@v3.2.26
- 状态管理: pinia@2.1.6
- 地图引擎: openlayers@v8.1.0

### 目录结构

```
|__ build 打包后文件
|__ node_modules 依赖包
|__ public 静态资源 打包不会被压缩编译
    |__ favicon.ico 页面头部图标
|__ script 脚本文件
|__ src
    |__ api 接口地址
    |__ assets 静态资源
        |__ fonts 字体
        |__ images 图片
    |__ components  公共组件
        |__ ...component  组件
    |__ configs  配置文件
    |__ pages 路由组件
        |__ ...page 组件
            |__ components 子组件...
            |__ pages 子路由组件...
    |__ router 路由
    |__ store pinia库
        |__ global 全局
        |__ modules 模块
            |__ ...module 模块
                |__ index 模块配置
            |__ index 模块配置
        |__ index pinia整体配置
    |__ utils 公共方法
    |__ styles 样式
        |__ global.scss 全局样式
        |__ theme.scss 全局样式样式
    |__ App.vue 顶级路由组件
    |__ main.ts vue入口文件
```

### 项目分支

master - 生产分支
dev - 开发分支

### 生产部署

jenkins地址或者手动打包

### 通过不同环境读取不同配置文件

1. .env.development - 开发环境
2. .env.production - 生产环境
3. .env.test - 测试环境

### 各环境打包命令

1. pnpm run build:prod - 生产环境打包
2. pnpm run build:dev - 测试环境打包

### git commit 注释前缀

```
'feat', //新特性、新功能
'fix', //修改bug
'docs', //文档修改
'style', //代码格式修改, 注意不是 css 修改
'refactor', //代码重构
'perf', //优化相关，比如提升性能、体验
'test', //测试用例修改
'chore', //其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert', //回滚到上一个版本
'build', //编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```
