import { useEffect, useState } from "react";
import { NameDisplay } from "./components/NameDisplay";
import "./style.css";

function App() {
  const [pokemonImage, setPokemonImage] = useState("");

  const [pokemonName, setPokemonName] = useState("");

  const [typed, setTyped] = useState("");

  const [score, setScore] = useState(0);

  const [currentState, setCurrentState] = useState([
    { guessed: false, key: "" },
  ]);

  const fetchPokemon = () => {
    const randomId = Math.floor(Math.random() * 100);
    const endpointURL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const pokemonImage = data.sprites.front_default;
        const pokemonName = data.name;
        setPokemonImage(pokemonImage);
        setPokemonName(pokemonName);
      });
  };

  useEffect(fetchPokemon, []);

  // When you attach EventListeners, it will always stay alive until you remove it.
  // Therefore, you need removeEventlistener.
  // If useEffect returns a function, then this function will be executed
  //when the component unmount.
  useEffect(() => {
    const handleKeydown = (e) => {
      console.log(`You typed :${e.key}`);
      const positions = checkName(e.key, pokemonName);
      updateScore(positions);
      displayCorrectLetters(positions, e.key);
    };

    window.addEventListener("keydown", handleKeydown);
    //"Clean up function" is executed with return function.
    //When you use eventListener in "useEffect" you need "Clean up function"↓
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
    // You want to re-create handleKeydown every time pokemonName changes,
    // otherwise checkName would still use an "old" pokemonName.
  }, [pokemonName]);

  const checkName = (key, pokemonName) => {
    //1.Put "index of all positions of the key you typed in the pokemonName"
    //  in positions-array
    const positions = [];
    let position = pokemonName.indexOf(key);
    console.log(`Pokemon name: ${pokemonName}, Pressed key: ${key}`);

    while (position !== -1) {
      positions.push(position);
      position = pokemonName.indexOf(key, position + 1);
    }
    console.log(positions); // ex: [2, 6]
    return positions;
  };

  const updateScore = (positions) => {
    //Score up or down
    positions.length > 0
      ? setScore((preScore) => preScore + 10)
      : setScore((preScore) => preScore - 15);
  };

  const displayCorrectLetters = (positions, key) => {
    //2.Display the correctly typed letters
    positions.length > 0
      ? setCurrentState((preState) => [
          ...preState,
          { guessed: true, key: key },
        ])
      : setCurrentState((preState) => [
          ...preState,
          {
            guessed: false,
            key: "_",
          },
        ]);
  };

  // const currentState = [
  //   { guessed: false, key: "a" },
  //   { guessed: true, key: "b" },
  //   { guessed: false, key: "r" },
  //   { guessed: false, key: "i" },
  // ];

  return (
    <div>
      <h1 className="title">Guess The Pokemon</h1>
      <div className="container">
        <div className="header">
          <p className="description">Guess their name!</p>
          <p className="score">
            Score:<span className="score-number">{score}</span>Pts
          </p>
        </div>

        <div className="pokemon-img">
          <img src={pokemonImage} />
        </div>

        <div className="input">
          <NameDisplay currentState={currentState} />
        </div>
      </div>
    </div>
  );
}

export default App;
