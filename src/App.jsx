import { useState } from "react";
import "./style.css";

function App() {
  // const [fetchData, setFetchData] = useState([]);
  const randomId = Math.floor(Math.random() * 35);

  // Question:How to get image of a pokemon?
  const endpointURL = `https://pokeapi.co/api/v2/pokemon/results[${randomId}]`;

  console.log(endpointURL);
  fetch(endpointURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });

  return (
    <div>
      <h1 className="title">Guess The Pokemon</h1>
      <div className="container">
        <div className="header">
          <p className="description">Guess their name!</p>
          <p className="score">
            Score:<span className="score-number">100</span>Pts
          </p>
        </div>

        <div className="pokemon-img">image here</div>
        
        <div className="input-area">
        <input className="input" type="text" />
        <button className="btn" type="submit">Submit</button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
