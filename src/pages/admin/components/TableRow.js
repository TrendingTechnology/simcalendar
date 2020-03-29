import React from 'react';
import Dates from '../../../Components/Utils/Dates'
import { Link } from 'react-router-dom'

export default function TableRow({organiser, cars, url, sim, id, track, tracks, duration, time, date, timezone, deleteRace,restoreRace, deleted, timestamp}) {

  const newDate = new Date(date)
  const ts = new Date(timestamp)
  const dateUtils = new Dates()

  return (
    <tr key={Math.random()} className={deleted ? "race-deleted": null}>
      <td className="list-sim">{sim}</td>
      <td className="list-date">{dateUtils.getDay(newDate.getDay())} {newDate.getDate()} {dateUtils.getMonth(newDate.getMonth())}
      </td>
      <td className="list-time">{time} <span>{dateUtils.getTimezone(timezone)}</span></td>
      <td>{ts.toLocaleString()}</td>
      <td className="list-what">
        <em>{cars}</em><br/>
        {organiser}
      </td>
      <td className="list-track">{tracks.longNameByKey(track)}</td>
      <td className="list-duration">{duration} min</td>
      <td className="list-link"><a href={url} target="_blank" rel="nofollow noopener noreferrer">GO</a></td>
      <td>
        <Link to={`/race-control/edit-race?_id=` + id}>Edit</Link> -
        { deleted ? (
          <button onClick={() => restoreRace(id)}>Restore</button>
        ) : (
          <button onClick={() => deleteRace(id)}>Delete</button>
        )}
      </td>
    </tr>
  )
}
