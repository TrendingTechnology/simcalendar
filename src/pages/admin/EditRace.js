import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/database'
import tracks from '../../constants/tracks.json'
import Tracks from '../../Components/Utils/Tracks'
import EditRaceForm from './components/EditRaceForm'
import Menu from './components/Menu'
import qs from 'qs'
import Loading from '../../Components/Loading'


class EditRace extends Component {

  state = {
    race: {},
    id: qs.parse(this.props.location.search, { ignoreQueryPrefix: true })._id,
    ready: false
  }

  componentDidMount() {
    // get the race info
    let that = this
    firebase.database().ref('/races/' + this.state.id).on('value', function(snapshot) {
      // check if there are any races
      if (!snapshot.val()) {
        console.log("there is no data!!! 😱");
      } else { // some races are there
        that.setState({
          race: snapshot.val(),
          ready: true
        })
      }
    });
  }

  render() {

    const theTracks = new Tracks(tracks)
    const {ready, race, id} = this.state
    console.log(race);

    return (
      <div className="wrapper">
        <h1>Admin</h1>
        <div className="admin">
          <Menu />
          <div className="admin-content">
            <h2>Edit race</h2>
            {ready ? <EditRaceForm tracks={theTracks} race={race} id={id} /> : <Loading/>}

          </div>
        </div>
      </div>
    )
  }
}

export default EditRace
