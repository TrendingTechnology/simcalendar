import React from 'react';

export default function FiltersSims({ sim, filterSims2, checked}) {

  let selected = checked.includes(sim)
  console.log(selected);
  return (
    <li key={Math.random()}>
      <label>
        <input
          type="checkbox"
          name={sim}
          value={sim}
          defaultChecked={selected}
          onChange={filterSims2}
          className="input-filter-sim"
        />
        {sim}
      </label>
    </li>
  )
}
