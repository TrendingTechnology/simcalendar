import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import Loading from '../Components/Loading'
import ListRaces from '../Components/ListRaces'
import sims from '../constants/sims.json'
import tracks from '../constants/tracks.json'
import Tracks from '../Components/Utils/Tracks'
import Sims from '../Components/Utils/Sims'

class Home extends Component {
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
    const { tracks, races, dataReady, sims } = this.state;

    return (
      <div>
        {dataReady ? <ListRaces sims={sims} data={races} tracks={tracks} /> : <Loading/>}
      </div>
    )
  }
}

export default Home
