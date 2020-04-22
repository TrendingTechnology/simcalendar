import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { Link } from 'react-router-dom'
import Loading from '../Components/Loading'
import ListRaces from '../Components/ListRaces'
import sims from '../constants/sims.json'
import tracks from '../constants/tracks.json'
import Tracks from '../Components/Utils/Tracks'
import Sims from '../Components/Utils/Sims'

// console.log(process.env.REACT_APP_API_KEY);
// console.log(process.env.NODE_ENV);

class Home extends Component {
  state = {
    tracks: new Tracks(tracks),
    sims: new Sims(sims.sims),
    races: [],
    dataReady: false,
  }

  filterOldRaces = (data) => {
      let today = new Date().setHours(0,0,0,0)
      const races = Object.entries(data.races)
      let futureRaces = races.filter((race) => { return today - race[1].date <= 0 })
      let currentRaces = futureRaces.filter((race) => { return race[1].deleted !== true })
      currentRaces.sort((a, b) => parseFloat(a[1].date) - parseFloat(b[1].date));
      this.setState({
        races: currentRaces,
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
      <>
      <div className="top">
        <h2>Find your next sim race</h2>
      </div>
      <div className="home-contact">
        <p>Do you know a race that is not here? <Link to="/contact">Get in touch</Link> and I'll add it.</p>
      </div>
      <div className="wrapper">
        {dataReady ? <ListRaces sims={sims} data={races} tracks={tracks} /> : <Loading/>}
      </div>
      </>
    )
  }
}

export default Home
