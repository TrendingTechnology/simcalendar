import React from 'react';
import Dates from './Utils/Dates'

export default function RaceListItem({organiser, cars, url, sim, sims, track, tracks, duration, time, date, timezone, localTime, timestamp}) {
  const newDate = new Date(timestamp)
  const gmtDate = new Date(date)
  const dateUtils = new Dates()

  return (
    <a href={url} className="go-link" rel="nofollow noopener noreferrer">
    <li key={Math.random()}>
      <div className="list-sim">
        <img src={sims.logoByKey(sim)} alt={sims.longNameByKey(sim)} />
      </div>
      <div className="list-date">
        { !localTime ? (
          <>
          <span>{dateUtils.getDay(gmtDate.getDay())}</span>
          <em>{gmtDate.getDate()}</em>
          <span className="month">{dateUtils.getMonth(gmtDate.getMonth())}</span>
        </> ) : (
          <>
            <span>{dateUtils.getDay(newDate.getDay())}</span>
            <em>{newDate.getDate()}</em>
            <span className="month">{dateUtils.getMonth(newDate.getMonth())}</span>
          </>
         )
        }

      </div>
      <div className="list-time">
        { !localTime ? (
          <>
            {time} <span>{dateUtils.getTimezone(timezone)}</span>
          </>
        ) : (
          <>
            {dateUtils.getHours(newDate.getHours())}:{dateUtils.getMinutes(newDate.getMinutes())}
          </>
        )}

      </div>
      <div className="list-what">
        <p>{cars}</p>
        <p>{tracks.longNameByKey(track)}</p>
        <p>{duration} min</p>
      </div>
      <div className="list-organiser">{organiser}</div>
      <div className="list-link"><a className="go-link" href={url} rel="nofollow noopener noreferrer">GO</a></div>
    </li></a>
  )
}
