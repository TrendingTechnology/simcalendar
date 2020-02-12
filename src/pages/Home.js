import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import AddRace from '../Components/AddRace'
import Loading from '../Components/Loading'
import ListRaces from '../Components/ListRaces'

class Home extends Component {
  state = {
    tracks: [],
    races: [],
    tracksSanitised: [],
    dataReady: false
  }

  extractRaces = (tracks) => {
    const tracksSanitised = []
    for (const track in tracks) {
      tracksSanitised.push(tracks[track].nameLong)
    }
    this.setState({tracksSanitised, dataReady: true})

  }

  loadData = () => {
    let that = this
    firebase.database().ref('/').on('value', function(snapshot) {
      // check if there are any tracks
      if (!snapshot.val()) {
        console.log("there is no data!!! 😱");
      } else { // some races are there
        let data = snapshot.val()
        that.setState({
          tracks: data.tracks.road,
          races: data.races
        }, () => {
          console.log("Data is ready 🏁");
          that.extractRaces(that.state.tracks)
        })
      }
    });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    const { tracks, races, dataReady, tracksSanitised } = this.state;

    return (
      <div>
        <h2>List</h2>
        {dataReady ? <ListRaces data={races} tracks={tracksSanitised} /> : <Loading/>}


        {dataReady ? <AddRace data={tracks} /> : <Loading/>}
      </div>
    )
  }
}

export default Home
