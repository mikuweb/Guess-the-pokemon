export const NameDisplay = ({ states }) => {
  console.log(states);
  return (
    <div className="input-text">  
      {states.map((s) => {
        return s.guessed ? <span>{s.key}</span> : <span>_</span>;
      })}
    </div>
  );
};


//states
// 0: {guessed: false, key: 'v'}
// 1: {guessed: false, key: 'e'}
// 2: {guessed: false, key: 'n'}
// 3: {guessed: false, key: 'o'}
// 4: {guessed: false, key: 'n'}
// 5: {guessed: false, key: 'a'}
// 6: {guessed: false, key: 't'}
