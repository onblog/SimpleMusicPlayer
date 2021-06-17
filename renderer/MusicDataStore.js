const Store = require('electron-store')
const path = require('path')

const uuid =  () => {
    return Math.ceil(Math.random()*10000000+100000);
}

class DataStore extends Store {
    constructor(settings){
        super(settings)
        this.tracks = this.get('tracks') || [] //从左到右选择第一个存在的值或最后一个默认值
    }
    saveTracks(){
        this.set('tracks', this.tracks)
        return this
    }
    getTracks(){
        return this.get('tracks') || []
    }
    addTracks(tracks){
        const tracksWithProps = tracks.map(track => {
            return {
                id: uuid(),
                path: track,
                filename: path.basename(track)
            }
        }).filter(track => {
            const currentTracksPath = this.getTracks().map(track => track.path)
            return currentTracksPath.indexOf(track.path)<0
        })
        this.tracks = [...this.tracks, ...tracksWithProps]
        return this.saveTracks()
    }
    deleteTrack(deletedId) {
        this.tracks = this.tracks.filter(item => item.id !== deletedId)
        return this.saveTracks()
    }
}

module.exports = DataStore