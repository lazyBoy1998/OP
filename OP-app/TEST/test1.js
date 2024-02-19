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