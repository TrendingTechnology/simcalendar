import React from 'react';

export default function TableRow({organiser, cars, url, sim, sims, track, tracks, duration, time, date}) {
  const newDate = new Date(date)
  return (
    <tr key={Math.random()}>
      <td>
        {organiser}<br />
        <em>{cars}</em><br />
        <a href={url} target="_blank" rel="nofollow noopener noreferrer">{url}</a>
      </td>
      <td><img src={sims.logoByKey(sim)} alt={sims.longNameByKey(sim)} /></td>
      <td>{tracks.longNameByKey(track)}</td>
      <td>{duration}</td>
      <td>{newDate.toDateString()}</td>
      <td>{time}</td>
    </tr>
  )
}
