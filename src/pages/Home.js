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
    dataReady: false
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
    const { tracks, races, dataReady } = this.state;

    return (
      <div>
        <h2>List</h2>
        {dataReady ? <ListRaces data={races} /> : <Loading/>}


        {dataReady ? <AddRace data={tracks} /> : <Loading/>}
      </div>
    )
  }
}

export default Home
