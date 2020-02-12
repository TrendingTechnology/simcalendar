import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import AddRace from '../Components/AddRace'
import Loading from '../Components/Loading'

class Home extends Component {
  state = {
    tracks: [],
    dataReady: false
  }

  loadData = () => {
    let that = this
    firebase.database().ref('/tracks/road/').on('value', function(snapshot) {
      // check if there are any tracks
      if (!snapshot.val()) {
        console.log("there is no data!!! 😱");
      } else { // some races are there
        let data = snapshot.val()
        that.setState({
          tracks: data,
          dataReady: true
        }, () => {
          console.log("Data is ready 🏁");
          console.log(that.state.tracks);
        })
      }
    });
  }

  componentDidMount() {
    this.loadData()
    console.log(this.state.tracks);
  }

  render() {
    const { tracks, dataReady } = this.state;

    return (
      <div>
        <h2>List</h2>
        {dataReady ? <AddRace data={tracks} /> : <Loading/>}
      </div>
    )
  }
}

export default Home
