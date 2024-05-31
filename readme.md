```bash
└── packages
    ├── cli # CLI 命令
    ├── core # 核心代码
    └── tpl # 代码模版
```

## Shell

```shell
lerna version
lerna publish [bump]

```

## publish

```
yarn lerna publish 发布版本
yarn lerna publish patch/minjor/major 按版本类型发布
```

`yarn lerna publish` 会自动设定版本 `yarn lerna version` 执行前运行 `run build`

在 根目录下 package.json scripts中配置 `prepublish: yarn lerna run build`

## 本地调试

因为使用 yarn v4 所以 `yarn link` 的配置不像 `npm link` 做软链接, 而是使用 portal 协议

### 使用步骤

在需要调试的项目中执行 `yarn link {dist_path}`

```
$ yarn link /Users/Mizi/works/hulu/hulujs/dist/@hulujs/ruyi
```

安装 package.json 中，

```json
"resolutions": {
    "@hulujs/ruyi": "portal:/Users/Mizi/works/hulu/hulujs/dist/@hulujs/ruyi"
}
```

之后 `yarn add @hulujs/ruyi` 或 手动配置 `dependencies`

就可以正常调试了

