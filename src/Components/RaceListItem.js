import React from 'react';
import Dates from './Utils/Dates'

export default function RaceListItem({organiser, cars, url, sim, sims, track, tracks, duration, time, date, timezone}) {
  const newDate = new Date(date)
  const dateUtils = new Dates()

  return (
    <a href={url} rel="nofollow noopener noreferrer">
    <li key={Math.random()}>
      <div className="list-sim">
        <img src={sims.logoByKey(sim)} alt={sims.longNameByKey(sim)} />
      </div>
      <div className="list-date">
        <span>{dateUtils.getDay(newDate.getDay())}</span>
        <em>{newDate.getDate()}</em>
        <span className="month">{dateUtils.getMonth(newDate.getMonth())}</span>
      </div>
      <div className="list-time">{time} <span>{dateUtils.getTimezone(timezone)}</span></div>
      <div className="list-what">
        <p>{cars}</p>
        <p>{tracks.longNameByKey(track)}</p>
        <p>{duration} min</p>
      </div>
      <div className="list-organiser">{organiser}</div>
      <div className="list-link"><a href={url} rel="nofollow noopener noreferrer">GO</a></div>
    </li></a>
  )
}
