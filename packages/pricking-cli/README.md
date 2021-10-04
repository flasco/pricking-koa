# @pricking/cli

program start, as ts-node & nodemon wrapper.

## TODO

* [ ] new inst - `init`
* [ ] new inst - `test`

## inst

```bash
pricking-cli [命令]

命令：
  pricking-cli start [options]

程式启动

选项：
  --help                显示帮助信息                                      [布尔]
  --version             显示版本号                                        [布尔]
  --confgPath, --cpath  cli config path                                 [字符串]
```

## config

such as nodemon config, exclude `exec`, it consists of `entryPoint` and `execArgs`

```json
{
  "entryPoint": "./src/index.ts",
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "execArgs": [
    ["-r", "tsconfig-paths/register"],
    ["-r", "dotenv/config"],
    "dotenv_config_path=.dev-env"
  ],
  "env": {
    "APP_ENV": "development"
  },
  "delay": 500
}
```

```ts
interface IPrickingConf {
  entryPoint: string;
  watch?: string[];
  ext?: string;
  ignore?: string[];
  delay?: number;
  env?: any;
  execArgs?: Array<[string, string] | string>;
}
```
