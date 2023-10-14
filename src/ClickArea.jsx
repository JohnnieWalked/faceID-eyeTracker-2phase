/* eslint-disable react/prop-types */
import { useState } from 'react';

function ClickArea({ setTotalCounter, areaNumber }) {
  const [counter, setCounter] = useState(5);

  function handleClick() {
    if (counter > 0) setCounter((state) => state - 1);
    if (counter === 1) setTotalCounter((prevState) => prevState - 5);
  }

  return (
    <div
      style={{ gridArea: `area${areaNumber}` }}
      onClick={handleClick}
      className="clickArea"
    >
      {counter}
    </div>
  );
}

export default ClickArea;
