# Vue3 Admin Template

## 项目简介

Vue3 Admin Template 是一个基于 Vue3 + TypeScript 构建的中后台管理系统模板项目。本项目旨在为前端开发者提供一个现代化、规范化的管理后台解决方案，适用于学习交流、技术实践和项目开发参考。

本项目采用最新的前端技术栈，涵盖了权限管理、商品管理、用户管理等典型后台业务场景，集成了数据可视化、动态路由、权限控制等核心功能，可作为企业级后台管理系统的开发基础。

## 技术栈

| 技术         | 版本  | 说明                            |
| ------------ | ----- | ------------------------------- |
| Vue          | 3.5.x | 渐进式 JavaScript 框架          |
| TypeScript   | 5.7.x | JavaScript 的超集，提供类型支持 |
| Vite         | 6.2.x | 下一代前端构建工具              |
| Vue Router   | 4.5.x | Vue.js 官方路由管理器           |
| Pinia        | 3.0.x | Vue.js 状态管理库               |
| Element Plus | 2.9.x | 基于 Vue3 的组件库              |
| Axios        | 1.8.x | HTTP 请求库                     |
| ECharts      | 6.0.x | 数据可视化图表库                |
| SCSS         | -     | CSS 预处理器                    |

## 功能特性

- **用户认证**：登录/退出登录、Token 持久化、路由权限守卫
- **权限管理**：用户管理、角色管理、菜单权限控制
- **商品管理**：SPU 管理、SKU 管理、商品属性管理、品牌管理
- **数据可视化**：折线图、饼图等图表展示
- **动态路由**：根据用户权限动态生成菜单路由
- **响应式布局**：适配不同屏幕尺寸
- **代码规范**：ESLint + Prettier + Stylelint + Husky + Commitlint

## 目录结构

```
src
├── api                 # API 接口管理
├── assets              # 静态资源（图片、图标等）
├── components          # 公共组件
├── hooks               # 自定义 Hooks
├── layout              # 布局组件
├── router              # 路由配置
├── store               # Pinia 状态管理
├── styles              # 全局样式
├── utils               # 工具函数
└── views               # 页面视图
│   ├── acl             # 权限管理页面
│   ├── home            # 首页
│   ├── login           # 登录页
│   ├── product         # 商品管理页面
│   └── screen          # 数据大屏
└── App.vue             # 根组件
└── main.ts             # 入口文件
```

## 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm / npm / yarn

### 安装依赖

```bash
pnpm install
```

### 启动项目

```bash
pnpm dev
```

### 本地 Mock 后端

开发环境已内置内存式 Mock 后端，不依赖远程服务。直接执行 `pnpm dev`，然后使用账号
`admin` / `111111`（也兼容 `123456`）登录即可。Mock 覆盖用户认证、品牌、分类与属性、
SPU/SKU、用户、角色和菜单权限的页面接口；增删改操作在当前开发服务器运行期间有效，
重启开发服务器会还原为示例数据。

### 构建项目

```bash
# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```

### 代码检查与格式化

```bash
# ESLint 检查
pnpm lint

# ESLint 自动修复
pnpm fix

# Prettier 格式化
pnpm format
```

## 项目截图

![首页](./src/assets/images/home.png)
![数据大屏](./src/assets/images/screen.png)

## 学习要点

本项目适合作为 Vue3 + TypeScript 学习实践项目，主要涵盖以下知识点：

1. **Vue3 Composition API**：使用 `<script setup>` 语法糖编写组件
2. **TypeScript 类型系统**：接口定义、类型约束、泛型应用
3. **Pinia 状态管理**：模块化状态管理、持久化存储
4. **Vue Router 路由**：动态路由、路由守卫、嵌套路由
5. **组件封装**：Pagination、CategorySelector、SvgIcon 等公共组件
6. **权限控制**：按钮权限、菜单权限、路由权限
7. **API 请求封装**：Axios 拦截器、请求/响应处理
8. **ECharts 数据可视化**：图表配置、响应式适配

## 贡献指南

本项目用于学习交流，欢迎提交 Issue 和 Pull Request 参与贡献。

## 许可证

MIT License
