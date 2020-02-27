import React, { Component } from 'react';
import sims from '../../constants/sims.json'
import tracks from '../../constants/tracks.json'
import Tracks from '../../Components/Tracks'
import Sims from '../../Components/Sims'
import AddRaceForm from '../../Components/AddRaceForm'

class AddRace extends Component {
  state = {
    tracks: new Tracks(tracks.tracks),
    sims: new Sims(sims.sims),
  }

  render() {
    return (
      <div>
        <h2>Add new race</h2>
        <AddRaceForm tracks={this.state.tracks} />
      </div>
    )
  }
}

export default AddRace
