class Sims {
  constructor(sims) {
    this.sims = sims
  }

  // list sims methods ========================================
  get longNamesArray() {
    const longNamesArray = []
    for (const sim in this.sims) {
      longNamesArray.push(this.sims[sim].name)
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
    return this.sims[key].name
  }

  keyByLongName(longName) {
    for (const sim in this.sims) {
      if (longName === this.sims[sim].name) {
        return sim
      }
    }
  }

  logoByKey(key) {
    return this.sims[key].logo
  }
}

export default Sims
