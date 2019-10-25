const {ipcRenderer} = require('electron')
const {$, convertDuration} = require('./helper')
let musicAudio = new Audio()
let allTracks
let currentTrack

$('add-music-button').addEventListener('click', () => {
    ipcRenderer.send('add-music-window')
})

const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const tracksListHTML = tracks.reduce((html, track) => {
        html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center">
        <div class="col-10">
            <i class="fas fa-music mr-2 text-secondary"></i>
            <b>${track.filename}</b>
        </div>
        <div class="col-2">
            <i class="fas fa-play mr-3" data-id="${track.id}"></i>
            <i class="fas fa-trash-alt" data-id="${track.id}"></i>
        </div>
       </li>`
        return html
    }, '')
    const emptyTrackHTML = '<div class="alert alert-primary">还没有添加任何音乐</div>'
    tracksList.innerHTML =
        tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}

ipcRenderer.on('getTracks', (event, tracks) => {
    console.log('receive tracks', tracks)
    allTracks = tracks
    renderListHTML(tracks)
})

const renderPlayerHTML = (name, duration) => {
    const player = $('player-status')
    const html = `<div class="col font-weight-bold">
            正在播放：${name}
            </div>
<div class="col">
    <span id="current-seeker">00:00</span> / ${duration}
</div>`
    player.innerHTML = html
}

const updateProgressHTML = (currentTime, duration) => {
    // 计算
    const progress =Math.floor(currentTime/duration*100)
    const bar = $('player-progress')
    bar.innerHTML = progress + '%'
    bar.style.width = progress + '%'
    const seeker = $('current-seeker')
    seeker.innerHTML = convertDuration(currentTime)
}

musicAudio.addEventListener('loadedmetadata', () => {
    //渲染播放器状态
    renderPlayerHTML(currentTrack.filename, convertDuration(musicAudio.duration))
})

musicAudio.addEventListener('timeupdate', () => {
    //更新播放器状态
    updateProgressHTML(musicAudio.currentTime, musicAudio.duration)
})


$('tracksList').addEventListener('click', (event) => {
    event.preventDefault()
    const {dataset, classList} = event.target
    const id = dataset && dataset.id // 默认第一个，如果第一个存在，就赋值下一个，以此类推
    if (id && classList.contains('fa-play')) {
        //这里要开始播放音乐
        if (currentTrack && currentTrack.id === id) {
            // 继续播放音乐
            musicAudio.play()
        } else {
            // 播放新的歌曲，注意还原之前的图标
            currentTrack = allTracks.find(track => track.id === id)
            musicAudio.src = currentTrack.path
            musicAudio.play()
            const resetIconEle = document.querySelector('.fa-pause')
            if (resetIconEle) {
                resetIconEle.classList.replace('fa-pause', 'fa-play')
            }
        }
        classList.replace('fa-play', 'fa-pause')
    } else if (id && classList.contains('fa-pause')) {
        //暂停播放
        musicAudio.pause()
        classList.replace('fa-pause', 'fa-play')
    } else if (id && classList.contains('fa-trash-alt')) {
        //删除音乐
        //如果当前删除的歌曲正在播放，先暂停
        if (currentTrack && currentTrack.id === id) {
            musicAudio.pause()
        }
        ipcRenderer.send('delete-track', id)
    }
})