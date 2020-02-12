import React, { Component } from 'react'
import { Table } from 'evergreen-ui'

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

  render() {
    const races = Object.entries(this.props.data)

    return (
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
    )
  }
}

export default ListRaces
