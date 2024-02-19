## 学习
### 一 简单构建项目

#### 初始化

**npm**

```
mkdir my-electron-app && cd my-electron-app
npm init

npm install electron --save-dev
```

 **Yarn**

```
mkdir my-electron-app && cd my-electron-app
yarn init

yarn add electron --dev
```



初始化完成以后

```
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "MIT",
  "devDependencies": {
    "electron": "23.1.3"
  }
}
```



创建index.html 文件

```html index
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
  </body>
  <script src="./renderer.js"></script>
</html>
```



创建main.js

```javascript js
const { app, BrowserWindow } = require('electron') //导入模块

const createWindow = () => {//createWindow() 函数将您的页面加载到新的 BrowserWindow 实例中
  const win = new BrowserWindow({ //设定窗口高度，宽度
    width: 800,
    height: 600
  })

  win.loadFile('index.html')//加载文件名
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}

app.whenReady().then(() => {//在应用准备就绪时调用函数
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```





NPM

```
npm run start
```

YARN

```
yarn run start
```



### 二 自定义菜单

创建 test.js 文件

```javascript
const { app, BrowserWindow, Menu } = require('electron')
console.log(process.platform)
const createWindow = function() {
  let mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'thd',
    webPreferences: {
      nodeIntegration: true, // 设置开启nodejs环境
      enableRemoteModule: true // enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭且网上很多资料没有提到
    }

  })

  mainWin.loadFile('index.html')
  // 定义菜单
  let menuTemplete=[
    {
      label: '文件',
      submenu:[
        {
          label:'打开文件',
          click(){
            console.log('cl')
          }
      },
        {type: 'separator'},
        {label:'关闭'},
        {
          label:'关于',
          role: 'about'
      },
      ]
    },
    {
      label: '编辑'
    }
  ]
  // 生成菜单模板
  let menu=Menu.buildFromTemplate(menuTemplete)
  // 将菜单模板添加到应用里
  Menu.setApplicationMenu(menu)
  mainWin.on('ready-to-show',()=>{
    mainWin.show()
  })
  mainWin.on('close',()=>{
    mainWin=null
  })

}

app.on('ready',createWindow)
app.on('window-all-closed',()=>{
    app.quit()
})
```



package. json

```json
{
  "name": "op",
  "version": "1.0.0",
  "description": "markdown",
  "main": "test.js",
  "scripts": {
    "start": "electron ."
  },
  "repository": "git@github.com:lazyBoy1998/OP.git",
  "author": "Anthony",
  "license": "MIT",
  "devDependencies": {
    "@electron-forge/publisher-github": "^7.2.0",
    "electron": "^28.2.3"
  }
}

```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
  </body>
  <script src="./renderer.js"></script>
</html>
```



### 三 相关菜单角色

```javascript
const { app, BrowserWindow, Menu } = require('electron')
console.log(process.platform)
const createWindow = function() {
  let mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'thd',
    webPreferences: {
      nodeIntegration: true, // 设置开启nodejs环境
      enableRemoteModule: true // enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭且网上很多资料没有提到
    }

  })

  mainWin.loadFile('index.html')
  // 定义菜单
  let menuTemplete=[
    {
      label: '文件',
      submenu:[
        {
          label:'复制',
          role: 'copy',
          click(){
            console.log('copy')
          }
        },
        {
            label: '剪切',
            role: 'cut'
        },
        {
            label:'粘贴',
            role: 'paste'
        },
        {
          label:'最小化',
          role: 'minimize'
      },
      ]
    },
    {
      label: '选项',
      submenu:[
        {label:'1',type:'checkbox'},
        {type: 'separator'},
        {label:'item',type:"radio"},
        {type: 'separator'},
        {label:'其他',type:'submenu',role:'windowMenu'},
      ]
    },
    {
        label: '特别',
        submenu:[
          {label:'打开',icon: 'favicon.ico',accelerator: 'ctrl+Q'},
          
        ]
      }
  ]
  // 生成菜单模板
  let menu=Menu.buildFromTemplate(menuTemplete)
  // 将菜单模板添加到应用里
  Menu.setApplicationMenu(menu)
  mainWin.on('ready-to-show',()=>{
    mainWin.show()
  })
  mainWin.on('close',()=>{
    mainWin=null
  })

}

app.on('ready',createWindow)
app.on('window-all-closed',()=>{
    app.quit()
})
```

