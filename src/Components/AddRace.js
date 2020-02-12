import React, { Component } from 'react'
import { Button, TextInputField, SelectField, Alert } from 'evergreen-ui'
// import Calendar from 'react-calendar'
import * as firebase from 'firebase/app'
import 'firebase/database'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {enGB} from 'date-fns/esm/locale'
registerLocale('enGB', enGB)

function TracksOption(props) {
  return <option value={props.nameShort}>{props.nameLong}</option>
}

class AddRace extends Component {

  state = {
    date: new Date(),
    eventName: '',
    sim: 'none',
    eventTrack:'none',
    status: null
  }
  onChangeEvent = e => this.setState({ eventName: e.target.value })
  onChangeSim = e => this.setState({ sim: e.target.value })
  onChangeTrack = e => this.setState({ eventTrack: e.target.value })
  onChangeDate = date => this.setState({ date })

  onCreateEvent = (e) => {
    let newRaceKey = firebase.database().ref('/races/').push().key
    firebase.database().ref(`/races/${newRaceKey}/`).set({
      name: this.state.eventName,
      sim: this.state.sim,
      track: this.state.eventTrack,
      date: this.state.date.getTime(),
    }, function(error) {
      if (error) {
        console.log("Well that was fucked");
      } else {
        console.log("yay!");
      }
    });
  };


  render() {
    const tracks = this.props.data;

    const Success = <Alert
      intent="success"
      title="Race created"
      marginBottom={16}
    />

    return (
    <div className="create-race">
      <h2>Create a race</h2>

        <TextInputField
          label="Event name"
          onChange={this.onChangeEvent}
        />
        <SelectField
          label="What sim?"
          onChange={this.onChangeSim}
          value={this.state.sim}
        >
          <option key="none" value="none">Please select</option>
          <option key="ac" value="ac">Assetto Corsa</option>
          <option key="acc" value="acc">Assetto Corsa Competizione</option>
          <option key="rf2" value="rf2">rFactor 2</option>
          <option key="rre" value="rre">Raceroom</option>
          <option key="automo" value="automo">Automobilista</option>
          <option key="pc2" value="pc2">Project Cars 2</option>
        </SelectField>

        <SelectField
          label="What Track?"
          description="Hopefully not Monza"
          onChange={this.onChangeTrack}
          value={this.state.eventTrack}
        >
          <option value="none">Please select</option>
          {tracks.map(t => <TracksOption key={t.nameShort} nameShort={t.nameShort} nameLong={t.nameLong} />)}

        </SelectField>

        <DatePicker
          selected={this.state.date}
          onChange={this.onChangeDate}
          locale='enGB'
        />

        <br /><br /><br />

        { this.state.status ? <Success /> : null }

        <Button appearance="primary" onClick={this.onCreateEvent}>Add race</Button>
      </div>
    )
  }
}

export default AddRace;
