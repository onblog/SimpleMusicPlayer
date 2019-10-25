const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const DataStore = require('./renderer/MusicDataStore')

const myStore = new DataStore({'name': 'Music Data'})

class AppWindow extends BrowserWindow {
    constructor(config, fileLocation) {
        const baseConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        }
        const finalConfig = {...baseConfig, ...config};
        super(finalConfig)
        this.loadFile(fileLocation)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
    // 创建浏览器窗口。
    const mainWindow = new AppWindow({}, './renderer/index.html')

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.send('getTracks', myStore.getTracks()) //调用方法一定加括号fun()
    })

    ipcMain.on('add-music-window', () => {
        // 创建浏览器窗口。
        const addWindow = new AppWindow({
                                            width: 500,
                                            height: 400,
                                            parent: mainWindow
                                        }, './renderer/add.html')
    })

    ipcMain.on('add-tracks', (event, tracks) => {
        const updatedTracks = myStore.addTracks(tracks).getTracks()
        mainWindow.send('getTracks', updatedTracks)
    })

    ipcMain.on('open-music-file', (event) => {
        dialog.showOpenDialog({
                                  properties: ['openFile', 'multiSelections'],
                                  filters: [
                                      {name: 'Music', extensions: ['mp3']}
                                  ]
                              })
            .then(files => {
                if (!files.canceled) { //对话框是否被取消
                    event.sender.send("selected-file", files.filePaths)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

    ipcMain.on('delete-track', (event, id) => {
        const updatedTracks = myStore.deleteTrack(id).getTracks()
        mainWindow.send('getTracks', updatedTracks)
    })
})
// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。