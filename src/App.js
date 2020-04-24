import React from 'react';

function App() {

  console.log(process.env.REACT_APP_API_KEY);
  console.log(process.env.NODE_ENV);
  const api = process.env.REACT_APP_API_KEY;
  const env = process.env.NODE_ENV;



  return (
    <div className="App">
      <h1>Meh 🍤</h1>
      <ul>
        <li>Environment is: {env}</li>
        <li>API key is: {api}</li>
      </ul>
    </div>
  );
}

export default App;
