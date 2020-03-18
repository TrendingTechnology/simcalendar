import React, { useState } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/database'
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup';
import Error from './Error'

const ValidationSchema = Yup.object().shape({
  organiser: Yup.string()
    .min(3, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  url: Yup.string().url("Must be a valid URL").required("Required"),
  cars: Yup.string().required("Required"),
  duration: Yup.number()
    .integer()
    .positive(),
  timezone: Yup.number().integer()
});

const AddRaceForm = (props) => {

  const [formSent, setFormSent] = useState(false)

  const {tracks, race, id} = props
  // const race = props.race
  console.log(race);
  const {name, organiser, cars, url, sim, track, duration, time, timezone, date} = race
  const longNamesArray = tracks.longNamesArray
  // const Success = <p>Race created</p>

    return (
      <div className="create-race">
      { formSent ? <Redirect to={"/race-control/"} /> : (

      <Formik
        initialValues={{
          name: name,
          organiser: organiser,
          cars: cars,
          url: url,
          sim: sim,
          track: track,
          duration: duration,
          time: time,
          timezone: timezone,
          date: new Date(date).toISOString().split('T')[0],
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          setTimeout(() => {
            resetForm();
            firebase.database().ref(`/races/${id}/`).set({
              name: values.name,
              organiser: values.organiser,
              cars: values.cars,
              url: values.url,
              sim: values.sim,
              track: values.track,
              date: new Date(values.date).getTime(),
              time: values.time,
              timezone: values.timezone,
              duration: values.duration
            }, function(error) {
              if (error) {
                alert("Well that was fucked");
              } else {
                alert("updated");
                setFormSent(true);
              }
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (

      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="organiser">Event organiser</label>
            <input
              type="text"
              id="organiser"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.organiser}
              className={touched.organiser && errors.organiser ? "has-error" : null}
            />
            <Error touched={touched.organiser} message={errors.organiser} />
          </li>
          <li>
            <label htmlFor="name">Event name</label>
            <input
              type="text"
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? "has-error" : null}
            />
            <Error touched={touched.name} message={errors.name} />
          </li>
          <li>
            <label htmlFor="cars">Cars</label>
            <p className="form-description">E.g. GTE + LMP2, Skip Barber, DTM, etc.</p>
            <input
              type="text"
              id="cars"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cars}
              className={touched.cars && errors.cars ? "has-error" : null}
            />
            <Error touched={touched.cars} message={errors.cars} />
          </li>
          <li>
            <label htmlFor="url">Event link</label>
            <p className="form-description">Where people can learn more about it and sign up</p>
            <input
              type="text"
              id="url"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.url}
              className={touched.url && errors.url ? "has-error" : null}
            />
            <Error touched={touched.url} message={errors.url} />
          </li>
          <li>
            <label htmlFor="sim">Simulator</label>
            <select
              id="sim"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sim}
            >
              <option key="none" value="none">Please select</option>
              <option key="ac" value="ac">Assetto Corsa</option>
              <option key="acc" value="acc">Assetto Corsa Competizione</option>
              <option key="rf2" value="rf2">rFactor 2</option>
              <option key="rre" value="rre">Raceroom</option>
              <option key="ir" value="ir">iRacing</option>
              <option key="automo" value="automo">Automobilista</option>
              <option key="automo2" value="automo2">Automobilista 2</option>
              <option key="pc2" value="pc2">Project Cars 2</option>
            </select>
          </li>
          <li>
            <label htmlFor="track">Track</label>
            <p className="form-description">Hopefully not Monza.</p>
            <select
              id="track"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.track}
            >
              <option key="none" value="none">Please select</option>
              {longNamesArray.map(t => <option key={Math.random()} value={tracks.keyByLongName(t)}>{t}</option>)}
            </select>
          </li>
          <li>
            <label htmlFor="date">Race date</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              id="date"
              type="date"
            />
          </li>
          <li>
            <label htmlFor="time">Start time</label>
            <p className="form-description">Please state when drivers MUST be on the server (e.g. start of qualifying)</p>
            <input
              type="time"
              id="time"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.time}
            />
          </li>
          <li>
            <label htmlFor="timezone">Time zone difference</label>
            <p className="form-description">In minutes, from your local time to UTC. For example: GMT would be 0, EST (-5) would be -300</p>
            <input
              type="text"
              id="timezone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.timezone}
              className={touched.timezone && errors.timezone ? "has-error" : null}
            />
            <Error touched={touched.timezone} message={errors.timezone} />
          </li>
          <li>
            <label htmlFor="duration">Race duration</label>
            <p className="form-description">Just the race. If it's more than one, enter the total amount of time for all races. Do not add qualifying or practice time. </p>
            <input
              type="number"
              id="duration"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.duration}
              className={touched.duration && errors.duration ? "has-error" : null}
            />
            <Error touched={touched.duration} message={errors.duration} />
          </li>
        </ul>

        { /* status ? <Success /> : null */ }

        <input type="submit" disabled={isSubmitting} value="Edit race" />
        </form>
        )}
      </Formik>
      )
    }
    </div>
  )
}

export default AddRaceForm;
