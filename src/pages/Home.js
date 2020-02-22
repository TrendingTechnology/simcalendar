import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import AddRace from '../Components/AddRace'
import Loading from '../Components/Loading'
import ListRaces from '../Components/ListRaces'
import sims from '../constants/sims.json'
import tracks from '../constants/tracks.json'
import Tracks from '../Components/Tracks'
import Sims from '../Components/Sims'

class Home extends Component {
  state = {
    tracks: new Tracks(tracks.tracks),
    sims: new Sims(sims.sims),
    races: [],
    dataReady: false,
  }

  loadData = () => {
    // get the races
    let that = this
    firebase.database().ref('/').on('value', function(snapshot) {
      // check if there are any races
      if (!snapshot.val()) {
        console.log("there is no data!!! 😱");
      } else { // some races are there
        let data = snapshot.val()
        that.setState({
          races: data.races,
          dataReady: true
        }, () => {
          console.log("Data is ready 🏁");
        })
      }
    });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    const { tracks, races, dataReady, sims } = this.state;

    return (
      <div>
        <h2>List</h2>
        {dataReady ? <ListRaces sims={sims} data={races} tracks={tracks} /> : <Loading/>}
        {dataReady ? <AddRace tracks={tracks} /> : <Loading/>}
      </div>
    )
  }
}

export default Home
