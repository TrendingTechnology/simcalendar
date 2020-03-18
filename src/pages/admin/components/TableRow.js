import React from 'react';
import Dates from '../../../Components/Utils/Dates'

export default function TableRow({organiser, cars, url, sim, sims, track, tracks, duration, time, date, timezone}) {
  const newDate = new Date(date)
  const dateUtils = new Dates()

  return (
    <tr key={Math.random()}>
      <td className="list-sim">{sim}</td>
      <td className="list-date">{dateUtils.getDay(newDate.getDay())} {newDate.getDate()} {dateUtils.getMonth(newDate.getMonth())}
      </td>
      <td className="list-time">{time} <span>{dateUtils.getTimezone(timezone)}</span></td>
      <td className="list-what">
        <em>{cars}</em>
        {organiser}
      </td>
      <td className="list-track">{tracks.longNameByKey(track)}</td>
      <td className="list-duration">{duration} min</td>
      <td className="list-link"><a href={url} target="_blank" rel="nofollow noopener noreferrer">GO</a></td>
      <td>Edit - Delete</td>
    </tr>
  )
}
