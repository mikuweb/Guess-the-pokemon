import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [pokemonImage, setPokemonImage] = useState("");

  const [pokemonName, setPokemonName] = useState("");

  const fetchPokemon = () => {
    const randomId = Math.floor(Math.random() * 100);
    const endpointURL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const pokemonImage = data.sprites.front_default;
        const pokemonName = data.name;
        setPokemonImage(pokemonImage);
        setPokemonName(pokemonName);
      });
  };

  //When you attach EventListeners, it will always stay alive until you remove it.
  //Therefore, you need removeEventlistener.
  //If useEffect returns a function, then this function will be executed when the component unmount.
  useEffect(() => {
    const handleKeydown = (e) => {
      console.log(e.key);
      checkName(e.key);
    };

    window.addEventListener("keydown", handleKeydown);
    pokemonName
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [pokemonName]);
  //Only when pokemonName is update it's executed

  useEffect(fetchPokemon, []);

  const checkName = (key) => {
    //1.Put "index of all positions of the key you typed in the pokemonName" in positions-array
    const positions = [];
    let position = pokemonName.indexOf(key);
    console.log(pokemonName, key);

    while (position !== -1) {
      positions.push(position);
      position = pokemonName.indexOf(key, position + 1);
    }
    console.log(positions);
    return positions;
  };

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

        <div className="pokemon-img">
          <img src={pokemonImage} />
        </div>

        <div className="input-area">
          <input className="input" type="text" />
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
