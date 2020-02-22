class Tracks {
  constructor(tracks) {
    this.tracks = tracks
  }

  // list tracks methods ========================================
  get longNamesArray() {
    const longNamesArray = []
    for (const track in this.tracks) {
      longNamesArray.push(this.tracks[track].name)
    }
    return longNamesArray
  }

  get keysArray() {
    const keysArray = []
    for (const track in this.tracks) {
      keysArray.push(track)
    }
    return keysArray
  }

  longNameByKey(key) {
    return this.tracks[key].name
  }

  keyByLongName(longName) {
    for (const track in this.tracks) {
      if (longName === this.tracks[track].name) {
        return track
      }
    }
  }
}

export default Tracks
