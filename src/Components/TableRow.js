import React from 'react';

export default function TableRow({name, cars, url, sim, sims, track, tracks, duration, time, date}) {
  const newDate = new Date(date)
  return (
    <tr key={Math.random()}>
      <td>
        {name}<br />
        <em>{cars}</em><br />
        <a href={url} target="_blank" rel="nofollow noopener noreferrer">{url}</a>
      </td>
      <td>{sims.longNameByKey(sim)}</td>
      <td>{tracks.longNameByKey(track)}</td>
      <td>{duration}</td>
      <td>{newDate.toDateString()}</td>
      <td>{time}</td>
    </tr>
  )
}
