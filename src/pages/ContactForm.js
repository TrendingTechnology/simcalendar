import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from './admin/components/Error'
import axios from 'axios'

const API_PATH = "http://localhost:8888/simcalendar/api/contact/"

const MessageSent = () => (
  <>
    <h3>Thanks!</h3>
    <p>If you sent me a race, I'll try to add the race in a few days.</p>
  </>
)

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  url: Yup.string().url("Must be a valid URL"),
  email: Yup.string()
    .email()
    .required("Required"),
  message: Yup.string().required("Required"),
  organiser: Yup.boolean()
});

const ContactForm = (props) => {

  const [formSent, setFormSent] = useState(false)
  const [formError, setFormError] = useState("")

    return (
      <div className="wrapper">
        <div className="contact-form">
          <p><Link to="/">&lt; Back to the races</Link></p>
        { formSent ? <MessageSent/> : (
          <>
          <h2>Get in touch</h2>
          <p>Maybe you organise sim races, or know of a race that it's not here. Or maybe you want me to remove a race! Whatever it is, happy to hear from you. </p>
          <Formik
            initialValues={{
              name: '',
              url: '',
              email: '',
              message: '',
              organiser: ''
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              setTimeout(() => {
                resetForm();

                 // send form
                 console.log(values);
                 axios({
                  method: 'post',
                  url: `${API_PATH}`,
                  headers: { 'content-type': 'application/json' },
                  data: values
                })
                  .then(result => setFormSent(true))
                  .catch(error => setFormError(error.message))
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
            }) => (


          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <label htmlFor="name">Your name</label>
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
                <label htmlFor="email">Your email</label>
                <p className="form-description">No spam, only used in case I have any question</p>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "has-error" : null}
                />
                <Error touched={touched.email} message={errors.email} />
              </li>
              <li>
                <label htmlFor="url">Where can I find more information?</label>
                <p className="form-description">URL to a page if there's one</p>
                <input
                  type="text"
                  id="url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://"
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
                  <option key="other" value="other">Other</option>
                </select>
              </li>
              <li>
                <p className="label">Are you the race organiser?</p>
                <input
                  type="checkbox"
                  id="organiser"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organiser}
                /> <label htmlFor="organiser" className="label-radio">Yes</label>
              </li>
              <li>
                <label htmlFor="message">Message *</label>
                <p className="form-description">Tell me what you know about the race</p>
                <textarea
                  id="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  rows="5"
                  className={touched.message && errors.message ? "has-error" : null}
                />
                <Error touched={touched.message} message={errors.message} />
              </li>
            </ul>

            { /* status ? <Success /> : null */ }

            <input type="submit" disabled={isSubmitting} value="Send message" />
            </form>
            )}
          </Formik>
          </>
          )
        }
        </div>
    </div>
  )
}

export default ContactForm;
