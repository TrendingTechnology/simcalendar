import React, {Component} from 'react'
import * as firebase from 'firebase/app'
import sims from '../../constants/sims.json'
import tracks from '../../constants/tracks.json'
import Tracks from '../../Components/Utils/Tracks'
import Sims from '../../Components/Utils/Sims'
import Menu from './components/Menu'
import TableRow from './components/TableRow'


class AdminIndex extends Component {

  state = {
    tracks: new Tracks(tracks),
    sims: new Sims(sims.sims),
    races: [],
    dataReady: false,
  }

  filterOldRaces = (data) => {
      let today = new Date().setHours(0,0,0,0)
      const futureRaces = []
      const races = Object.entries(data)
      races.filter((race) => {
        if (today - race[1].date <= 0) {
          futureRaces.push(race)
        }
      })

      futureRaces.sort((a, b) => parseFloat(a[1].date) - parseFloat(b[1].date));

      this.setState({
        races: futureRaces,
        dataReady: true
      }, () => {
        console.log("Data is ready 🏁");
      })
  }

  componentDidMount() {
    // get the races
    let that = this
    firebase.database().ref('/races/').on('value', function(snapshot) {
      // check if there are any races
      if (!snapshot.val()) {
        console.log("there is no data!!! 😱");
      } else { // some races are there
        that.filterOldRaces(snapshot.val())
      }
    });
  }

  deleteRace(id) {
    firebase.database().ref(`/races/${id}/`).update({
      deleted: true
    }, function(error) {
      if (error) {
        alert("Well that was fucked");
      } else {
        alert("deleted");
      }
    });
  }

  restoreRace(id) {
    firebase.database().ref(`/races/${id}/`).update({
      deleted: false
    }, function(error) {
      if (error) {
        alert("Well that was fucked");
      } else {
        alert("restored");
      }
    });
  }

  render() {
    let {races} = this.state

    return (
      <div className="wrapper">
        <h1>Admin</h1>
        <div className="admin">
          <Menu />
          <div className="admin-content">
            <div className="admin-races">
                <table>
                  <thead>
                    <tr>
                      <th>Sim</th>
                      <th>When</th>
                      <th>Start time</th>
                      <th>Timestamp</th>
                      <th>Event</th>
                      <th>Track</th>
                      <th>Race duration</th>
                      <th>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {races.map(race => (
                      <TableRow
                        id={race[0]}
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
                        deleteRace={this.deleteRace}
                        restoreRace={this.restoreRace}
                        deleted={race[1].deleted}
                        timestamp={race[1].timestamp}
                      />
                    ))}
                  </tbody>
                </table>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminIndex
