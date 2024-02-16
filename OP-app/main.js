const { app, BrowserWindow ,globalShortcut} = require('electron/main')
const path =require('path')
const{Menu} = require('electron')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'favicon.ico',
    title: "OP",
    webPreferences: {
      nodeIntegration: true, // 设置开启nodejs环境
      enableRemoteModule: true // enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭且网上很多资料没有提到
    }

  })

  win.loadFile('index.html')
  var menuTemplete= [
    {
      label: '文件',
      submenu:[{
        label: '新建', // 子菜单的名字
        accelerator: 'ctrl+N', // 菜单的快捷键
        click:()=>{
          var newWin = new BrowserWindow({
            width: 400,
            height: 400,
            webPreferences: {
              nodeIntegration: true, // 设置开启nodejs环境
              enableRemoteModule: true // enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭且网上很多资料没有提到
            }
          })
          newWin.on('close',()=>{
            newWin=null
          })
        }
      }]
    }
  ]
  // 根据配置信息创建 menu 对象
  var menuObj=Menu.buildFromTemplate(menuTemplete)
  // 将对象作用当当前应用中
  Menu.setApplicationMenu(menuObj)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})