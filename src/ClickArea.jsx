/* eslint-disable react/prop-types */
import { useState } from 'react';

function ClickArea({
  setCalibrationPortalCounter /* totalCalibrationCounter */,
}) {
  const [counter, setCounter] = useState(5);

  function handleClick() {
    if (counter > 0) return setCounter((state) => state - 1);
    if (counter === 0)
      return setCalibrationPortalCounter(
        (totalCalibrationCounter) => totalCalibrationCounter - 5
      );
  }

  return (
    <div onClick={handleClick} className="clickArea">
      {counter}
    </div>
  );
}

export default ClickArea;
