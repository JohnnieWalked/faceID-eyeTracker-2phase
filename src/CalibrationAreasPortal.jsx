import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ClickArea from './ClickArea';

/* styles --- */
import './styles.scss';

function CalibrationAreasPortal({ handleCalibration }) {
  const [counter, setCounter] = useState(40);

  useEffect(() => {
    if (counter === 0) handleCalibration('done');
  }, [counter, handleCalibration]);

  useEffect(() => {
    document.body.classList.add('overflowHidden');
    return () => {
      document.body.classList.remove('overflowHidden');
    };
  }, []);

  function renderClickAreas() {
    return [...Array(8)].map((_, index) => {
      <ClickArea
        totalCalibrationCounter={counter}
        setTotalCalibrationCounter={setCounter}
        key={index}
      />;
    });
  }

  return createPortal(
    <div className="calibration_wrapper">{renderClickAreas()}</div>,

    document.querySelector('.modal-container')
  );
}

export default CalibrationAreasPortal;
