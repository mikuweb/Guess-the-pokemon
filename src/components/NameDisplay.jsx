export const NameDisplay = ({ currentState }) => {
  
  return (
    <div>
      {currentState.map((state) => {
        return state.guessed ? <span>{state.key}</span> : <span>_</span>;
      })}
    </div>
  );
};
