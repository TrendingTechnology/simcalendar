import React, { Component } from 'react'
import { Combobox } from 'evergreen-ui'
import TableRow from './Parts/TableRow'
import RaceListItem from './Parts/RaceListItem'
import {useMediaQuery} from 'react-responsive'
import Dates from './Utils/Dates'
import FiltersSims from './Parts/FiltersSims'

const dateUtils = new Dates()
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Large = ({ children }) => {
  const isLarge = useMediaQuery({ minWidth: 1020 })
  return isLarge ? children : null
}
const Medium = ({ children }) => {
  const isMedium = useMediaQuery({ maxWidth: 1019 })
  return isMedium ? children : null
}

const MediumSmall = ({ children }) => {
  const isMediumSmall = useMediaQuery({ minWidth: 700 })
  return isMediumSmall ? children : null
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
    selectedCheckboxSims: ["All sims"],
    tracks: this.props.tracks,
    selectedTracks: this.props.tracks.keysArray,
    localTime: true,
    filterSims2: null
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
        this.setState({
          selectedSims: this.props.sims.keysArray,
          selectedCheckboxSims: ["All sims"]
        })
    } else {
        const selectedSims = this.props.sims.keyByLongName(longName)
        this.setState({
          selectedSims,
          selectedCheckboxSims: [longName]
        })
    }
  }

  filterSims2 = (e) => {
    const longName = e.target.value;
    const sim = this.props.sims.keyByLongName(longName)

    if (longName === 'All sims' || longName === null) {
        this.setState({
          selectedCheckboxSims: ["All sims"],
          selectedSims: this.props.sims.keysArray
        })
    } else if (this.state.selectedCheckboxSims.includes("All sims")) {
        let ar = []
        ar.push(sim)
        this.setState({
          selectedCheckboxSims: [longName],
          selectedSims: ar
        })
      }

      else if (this.state.selectedSims.includes(sim)) {

        // list of sims without selection
        let index = this.state.selectedSims.indexOf(sim)
        let newList = this.state.selectedSims
        newList.splice(index,1)

        // list of simsboxes without selection
        let checkIndex = this.state.selectedCheckboxSims.indexOf(longName)
        let newCheckList = this.state.selectedCheckboxSims
        newCheckList.splice(checkIndex,1)

        this.setState({
          selectedCheckboxSims: newCheckList,
          selectedSims: newList
        })
      }

     else {
      this.setState({
        selectedCheckboxSims: [...this.state.selectedCheckboxSims,longName],
        selectedSims: [...this.state.selectedSims, sim]
      })
     }
  }

  setLocalTime = () => {
    this.setState({localTime: true})
  }

  setDefaultTime = () => {
    this.setState({localTime: null})
  }

  componentDidMount() {
    this.setState({filterSims2: this.filterSims2})
  }

  render() {
    let {races, tracks, sims, selectedTracks, selectedSims, localTime} = this.state
    let currentMonth = false

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
        <Large>
          <h3>Sims</h3>
          <ul className="filter-sims">
            {comboBoxSimList.map(function FilterSims(sim) {
              return <FiltersSims
                  sim={sim}
                  filterSims2={this.filterSims2}
                  checked={this.selectedCheckboxSims}
                />
          }, this.state)}
          </ul>

          <h3>Tracks</h3>
          <Combobox
              items={comboBoxTrackList}
              onChange={this.filterTracks}
              placeholder="All tracks"
              autocompleteProps={{
                // Used for the title in the autocomplete.
                title: 'Tracks'
              }}
            />
        </Large>
        <Medium>
          <Combobox
            items={comboBoxSimList}
            onChange={this.filterSims}
            placeholder="All sims"
            autocompleteProps={{
              // Used for the title in the autocomplete.
              title: 'Sims'
            }}
          />
      </Medium>
      </div>
      <MediumSmall>
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
              <tr  key={Math.random()}>
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
              {races.map(function listRaces(race) {
                const gmtDate = new Date(race[1].date)

                switch (currentMonth) {
                  case false:
                    currentMonth = gmtDate.getMonth()
                    return <tr key={Math.random()}><td colSpan="7" className="table-header first-header">{dateUtils.getMonthLong(gmtDate.getMonth())}</td></tr>
                  case gmtDate.getMonth():
                    return (
                      <TableRow
                        organiser={race[1].organiser}
                        sim={race[1].sim}
                        sims={this.sims}
                        track={race[1].track}
                        tracks={this.tracks}
                        date={race[1].date}
                        url={race[1].url}
                        cars={race[1].cars}
                        duration={race[1].duration}
                        time={race[1].time}
                        timezone={race[1].timezone}
                        key={Math.random()}
                        localTime={this.localTime}
                        tz={tz}
                        timestamp={race[1].timestamp}
                      />
                    )
                  default:
                    currentMonth = gmtDate.getMonth()
                    return <tr key={Math.random()}><td colSpan="7" className="table-header">{dateUtils.getMonthLong(gmtDate.getMonth())}</td></tr>
                }
              }, this.state)}
            </tbody>
          </table>
          </div>
        </MediumSmall>
        <Small>
          {
            localTime ? (
              <p className="current-tz">{tz} times. <em onClick={() => this.setDefaultTime()}>Change to organiser time</em>.</p>
            ) : (
              <p className="current-tz">Organiser set time. <em onClick={() => this.setLocalTime()}>Change to local time</em>.</p>
            )
          }
          <ul className="races-small">
            {races.map(function listRacesSmall(race) {
              const gmtDate = new Date(race[1].date)

              switch (currentMonth) {
                case false:
                  currentMonth = gmtDate.getMonth()
                  return <li key={Math.random()} className="list-header first-header">{dateUtils.getMonthLong(gmtDate.getMonth())}</li>
                case gmtDate.getMonth():
                  return (
                    <RaceListItem
                      organiser={race[1].organiser}
                      sim={race[1].sim}
                      sims={this.sims}
                      track={race[1].track}
                      tracks={this.tracks}
                      date={race[1].date}
                      url={race[1].url}
                      cars={race[1].cars}
                      duration={race[1].duration}
                      time={race[1].time}
                      timezone={race[1].timezone}
                      localTime={this.localTime}
                      key={Math.random()}
                      tz={tz}
                      timestamp={race[1].timestamp}
                    />
                  )
                default:
                  currentMonth = gmtDate.getMonth()
                  return <li key={Math.random()} className="list-header">{dateUtils.getMonthLong(gmtDate.getMonth())}</li>
              }
            }, this.state)}

          </ul>
        </Small>
      </div>
    )
  }
}

export default ListRaces
