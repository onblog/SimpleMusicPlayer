const {ipcRenderer} = require('electron')
const {$} = require('./helper')
const path = require('path')
let musicFilesPath = []

$('select-music').addEventListener('click', () => {
    ipcRenderer.send('open-music-file')
})

$('add-music').addEventListener('click', () => {
    ipcRenderer.send('add-tracks', musicFilesPath)
})

const readerListHtml = (paths) => {
    const musicList = $('musicList')
    const musicItemsHTML = paths.reduce((html, music) => { //html:初始值, 或者计算结束后的返回值。music:当前元素
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, "") //传递给函数的初始值
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}

ipcRenderer.on("selected-file", (event, paths) => {
    if (Array.isArray(paths)) {
        readerListHtml(paths)
        musicFilesPath = paths
    }
})