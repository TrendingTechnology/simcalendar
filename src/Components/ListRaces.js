import React, { Component } from 'react'
import { Combobox } from 'evergreen-ui'
import TableRow from './TableRow'
import RaceListItem from './RaceListItem'
import {useMediaQuery} from 'react-responsive'

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Large = ({ children }) => {
  const isLarge = useMediaQuery({ minWidth: 700 })
  return isLarge ? children : null
}
const Small = ({ children }) => {
  const isSmall = useMediaQuery({ maxWidth: 699 })
  return isSmall ? children : null
}

class ListRaces extends Component {
  state = {
    races: this.props.data,
    sims: this.props.sims,
    selectedSims: this.props.sims.keysArray,
    tracks: this.props.tracks,
    selectedTracks: this.props.tracks.keysArray,
    localTime: true
  }

  filterTracks = (longName) => {
    if (longName === 'All tracks' || longName === null) {
        this.setState({selectedTracks: this.props.tracks.keysArray})
    } else {
        const selectedTracks = this.props.tracks.keyByLongName(longName)
        this.setState({selectedTracks})
    }
  }

  filterSims = (longName) => {
    if (longName === 'All sims' || longName === null) {
        this.setState({selectedSims: this.props.sims.keysArray})
    } else {
        const selectedSims = this.props.sims.keyByLongName(longName)
        console.log(selectedSims);
        this.setState({selectedSims})
    }
  }

  setLocalTime = () => {
    this.setState({localTime: true})
  }

  setDefaultTime = () => {
    this.setState({localTime: null})
  }

  render() {
    let {races, tracks, sims, selectedTracks, selectedSims, localTime} = this.state

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
      <div className="list-races">
      <div className="filters">
        <h3>Filters</h3>
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
      <Large>
        <div className="races">
          {
            localTime ? (
              <p className="current-tz">{tz} times. <em onClick={() => this.setDefaultTime()}>Change to organiser time</em>.</p>
            ) : (
              <p className="current-tz">Organiser set time. <em onClick={() => this.setLocalTime()}>Change to local time</em>.</p>
            )
          }

          <table>
            <thead>
              <tr>
                <th>Sim</th>
                <th>When</th>
                <th>Start time</th>
                <th>Event</th>
                <th>Track</th>
                <th>Race duration</th>
                <th>Link</th>
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
                  timezone={race[1].timezone}
                  key={Math.random()}
                  localTime={this.state.localTime}
                  tz={tz}
                  timestamp={race[1].timestamp}
                />
              ))}
            </tbody>
          </table>
          </div>
        </Large>
        <Small>
          {
            localTime ? (
              <p className="current-tz">{tz} times. <em onClick={() => this.setDefaultTime()}>Change to organiser time</em>.</p>
            ) : (
              <p className="current-tz">Organiser set time. <em onClick={() => this.setLocalTime()}>Change to local time</em>.</p>
            )
          }
          <ul className="races-small">
          {races.map(race => (
            <RaceListItem
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
              timezone={race[1].timezone}
              localTime={this.state.localTime}
              key={Math.random()}
              tz={tz}
              timestamp={race[1].timestamp}
            />
          ))}
          </ul>
        </Small>
      </div>
    )
  }
}

export default ListRaces
