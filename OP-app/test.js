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