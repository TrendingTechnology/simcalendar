import React from 'react';
import Dates from './Utils/Dates'

export default function TableRow({organiser, cars, url, sim, sims, track, tracks, duration, time, date, timezone}) {
  const newDate = new Date(date)
  const dateUtils = new Dates()

  return (
    <tr>
      <td className="list-sim"><img src={sims.logoByKey(sim)} alt={sims.longNameByKey(sim)} /></td>
      <td className="list-date">
        <span>{dateUtils.getDay(newDate.getDay())}</span>
        <em>{newDate.getDate()}</em>
        <span className="month">{dateUtils.getMonth(newDate.getMonth())}</span>
      </td>
      <td className="list-time">{time} <span>{dateUtils.getTimezone(timezone)}</span></td>
      <td className="list-what">
        <em>{cars}</em>
        {organiser}
      </td>
      <td className="list-track">{tracks.longNameByKey(track)}</td>
      <td className="list-duration">{duration} min</td>
      <td className="list-link"><a href={url} rel="nofollow noopener noreferrer">GO</a></td>
    </tr>
  )
}
