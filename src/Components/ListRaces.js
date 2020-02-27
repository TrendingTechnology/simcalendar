import React, { Component } from 'react'
import { Combobox } from 'evergreen-ui'
import TableRow from './TableRow'

class ListRaces extends Component {
  state = {
    races: this.props.data,
    sims: this.props.sims,
    selectedSims: this.props.sims.keysArray,
    tracks: this.props.tracks,
    selectedTracks: this.props.tracks.keysArray,
  }

  filterTracks = (longName) => {
    if (longName === 'All tracks') {
        this.setState({selectedTracks: this.props.tracks.keysArray})
    } else {
        const selectedTracks = this.props.tracks.keyByLongName(longName)
        this.setState({selectedTracks})
    }
  }

  filterSims = (longName) => {
    if (longName === 'All sims') {
        this.setState({selectedSims: this.props.sims.keysArray})
    } else {
        const selectedSims = this.props.sims.keyByLongName(longName)
        this.setState({selectedSims})
    }
  }

  render() {
    let {races, tracks, sims, selectedTracks, selectedSims} = this.state

    const comboBoxTrackList = tracks.longNamesArray
    comboBoxTrackList.unshift('All tracks')

    const comboBoxSimList = sims.longNamesArray
    comboBoxSimList.unshift('All sims')

    // filter data ==================================
    races = races.filter(function(race) {
      return selectedTracks.includes(race[1].track)
    })

    races = races.filter(function(race) {
      return selectedSims.includes(race[1].sim)
    })

    return (
      <>
      <div className="filters">
        <Combobox
          items={comboBoxSimList}
          onChange={this.filterSims}
          placeholder="All sims"
          autocompleteProps={{
            // Used for the title in the autocomplete.
            title: 'Sims'
          }}
        />
        <Combobox
            items={comboBoxTrackList}
            onChange={this.filterTracks}
            placeholder="All tracks"
            autocompleteProps={{
              // Used for the title in the autocomplete.
              title: 'Tracks'
            }}
          />
      </div>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Sim</th>
            <th>Track</th>
            <th>Race duration</th>
            <th>When</th>
            <th>Start time</th>
          </tr>
        </thead>
        <tbody>
          {races.map(race => (
            <TableRow
              organiser={race[1].organiser}
              sim={race[1].sim}
              sims={this.state.sims}
              track={race[1].track}
              tracks={this.state.tracks}
              date={race[1].date}
              url={race[1].url}
              cars={race[1].cars}
              duration={race[1].duration}
              time={race[1].time}
            />
          ))}
        </tbody>
      </table>
      </>
    )
  }
}

export default ListRaces
