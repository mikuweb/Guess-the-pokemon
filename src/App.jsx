import { useEffect, useState } from "react";
import { NameDisplay } from "./components/NameDisplay";
import { NextPokemonBtn } from "./components/NextPokemonBtn";
import "./style.css";

function App() {
  const [pokemonImage, setPokemonImage] = useState("");

  const [pokemonName, setPokemonName] = useState("");

  const [blink, setBlink] = useState(false);

  const [score, setScore] = useState(0);

  const [states, setStates] = useState([]);

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
        setStates(deriveInitialGameState(pokemonName));
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

      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 200);

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
    // Put "index of all positions of the key you typed in the pokemonName"
    // in positions-array
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
    //Display the correctly typed letters
    // We have
    // positions === [1,5]  or [] or [6]
    // key === 's'
    // state === [
    //   { guessed: false, key: "a" },
    //   { guessed: false, key: "b" },
    //   { guessed: false, key: "u" },
    //   { guessed: false, key: "r" },
    //   { guessed: false, key: "i" },
    // ]
    // if  positions == [1] and key == b then we want to have
    // state === [
    //   { guessed: false, key: "a" },
    //   { guessed: true, key: "b" },
    //   { guessed: false, key: "u" },
    //   { guessed: false, key: "r" },
    //   { guessed: false, key: "i" },
    // ]
    // *if states was an object like so: {} then we would use const copyOfStates = {...states}
    const copyOfState = [...states]; // This creates a copy of the state array
    if (positions.length > 0) {
      // this check is optional. if positions was empty like so [], then forEach would simply do nothing
      positions.forEach((p) => {
        copyOfState[p].guessed = true;
      });
    }
    setStates(copyOfState);
  };

  // This function takes a name like "Aburi"
  // and creates an array like this: *[
  //   { guessed: false, key: "a" },
  //   { guessed: false, key: "b" },
  //   { guessed: false, key: "u" },
  //   { guessed: false, key: "r" },
  //   { guessed: false, key: "i" },
  // ];

  // Next steps:  We need to save this somehow in our component,
  // so that we can use it to render the fields
  // and so that we can update it when a guess has been made.
  // We only need to call this function _once_ when we know the pokemon name.
  // 1) Think about where to store this information.
  // 2) Think about how to update this information when a user types a key.
  // 3) Take this fancy array* and use it in NameDisplay to display __ur_ or whatever the current state is.

  const deriveInitialGameState = (pokeName) => {
    let ar = pokeName.split(""); // turns "aburi" into ['a', 'b', 'u', 'r', 'i']
    const initialGameState = ar.map((letter) => {
      // turns ['a', 'b', 'u', 'r', 'i'] into *
      return {
        guessed: false,
        key: letter,
      };
    });
    console.log(initialGameState);
    return initialGameState;
  };

  const nextPokemon = () => {
    console.log("NEXT POKE");
    fetchPokemon;
  };

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

        <div className={`input ${blink ? "blink" : ""}`}>
          <NameDisplay states={states} />
        </div>
        <NextPokemonBtn nextPokemon={nextPokemon} />
      </div>
    </div>
  );
}

export default App;

// const fn = () => ({guessed: false, key: 'a'})
// const fn = () => {return {guessed: false, key: 'a'}}
// const fn = () => {({guessed: false, key: 'a'})} // this returns nothing
