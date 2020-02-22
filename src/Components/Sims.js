class Sims {
  constructor(sims) {
    this.sims = sims
  }

  // list sims methods ========================================
  get longNamesArray() {
    const longNamesArray = []
    for (const sim in this.sims) {
      longNamesArray.push(this.sims[sim])
    }
    return longNamesArray
  }

  get keysArray() {
    const keysArray = []
    for (const sim in this.sims) {
      keysArray.push(sim)
    }
    return keysArray
  }

  longNameByKey(key) {
    return this.sims[key]
  }

  keyByLongName(longName) {
    for (const sim in this.sims) {
      if (longName === this.sims[sim]) {
        return sim
      }
    }
  }
}

export default Sims
