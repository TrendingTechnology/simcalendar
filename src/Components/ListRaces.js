import React, { Component } from 'react'
import { Table, Combobox } from 'evergreen-ui'

function TableRow(props) {
  const date = new Date(props.date)
  return (
    <Table.Row key={props.name}>
      <Table.TextCell>{props.name}</Table.TextCell>
      <Table.TextCell>{props.sim}</Table.TextCell>
      <Table.TextCell>{date.toDateString()}</Table.TextCell>
      <Table.TextCell>{props.track}</Table.TextCell>
    </Table.Row>
  )
}

class ListRaces extends Component {

  state = {
    races: Object.entries(this.props.data),
    tracks: this.props.tracks,
    selectedTracks: this.props.tracks
  }

  filterTracks = (track) => {
    if (track === 'All tracks') {
        this.setState({selectedTracks: this.props.tracks})
    } else {
        this.setState({selectedTracks: track})
    }

  }

  componentDidMount() {
    let tracks = this.state.tracks
    console.log(tracks);
    tracks.unshift('All tracks')
    console.log(tracks);
    // this.setState({tracks})
  }

  render() {
    let {races, tracks, selectedTracks} = this.state

    // filter data
    races = races.filter(function(race) {
      return selectedTracks.includes(race[1].track)
    })

    console.log(races);
    return (
      <>
      <div className="filters">
        <Combobox
          items={tracks}
          onChange={this.filterTracks}
          placeholder="All tracks"
          autocompleteProps={{
            // Used for the title in the autocomplete.
            title: 'Tracks'
          }}
        />
      </div>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>
            Sim
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            When
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Track
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {races.map(race => (
            <TableRow
              key={race[1].name}
              name={race[1].name}
              sim={race[1].sim}
              track={race[1].track}
              date={race[1].date}
            />
          ))}
        </Table.Body>
      </Table>
      </>
    )
  }
}

export default ListRaces
