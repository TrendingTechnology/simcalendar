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
      const races = Object.entries(data.races)
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
    firebase.database().ref('/').on('value', function(snapshot) {
      // check if there are any races
      if (!snapshot.val()) {
        console.log("there is no data!!! 😱");
      } else { // some races are there
        that.filterOldRaces(snapshot.val())
      }
    });
  }

  render() {
    let {races, tracks, sims} = this.state

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
