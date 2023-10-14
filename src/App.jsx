/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

/* portals --- */
import CalibrationAreasPortal from './CalibrationAreasPortal';

/* icons --- */
import { AiFillGithub } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';

/* styles --- */
import './styles.scss';

function App() {
  const [isCalibration, setIsCalibration] = useState(false);
  const [userXYArea, setUserXYArea] = useState(null);

  function handleClickCalibration() {
    setIsCalibration(true);
  }

  async function webgazerStart() {
    indexedDB.deleteDatabase('localforage');
    await webgazer.begin();
    const webgazerVideo = document.getElementById('webgazerVideoContainer');
    webgazerVideo.style.inset = '50%';
    webgazerVideo.style.transform = 'translateX(-50%) translateY(-50%)';
  }

  useEffect(() => {
    if (!isCalibration) return;
    if (isCalibration === 'done') {
      console.log('DONE');
      webgazer.setGazeListener((data) => {
        if (data === null) return;
        const predictionX = data.x;
        const predictionY = data.y;
        const userArea = JSON.parse(userXYArea);
        if (isCalibration === 'done') {
          if (userArea.x < predictionX && userArea.width > predictionX) {
            if (userArea.y < predictionY && userArea.height > predictionY) {
              alert('SUCCESSFUL IDENTIFICATION!');
            }
          }
        }
      });
    } else {
      webgazerStart();
    }
  }, [isCalibration]);

  useEffect(() => {
    setUserXYArea(localStorage.getItem('XY-ID'));
  }, []);

  return (
    <>
      <div className="pageContainer">
        <section className="header">
          <h1 className="title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 14 14"
            >
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                <circle cx="7" cy="4.5" r="2" />
                <path d="M10.16 10.5a3.5 3.5 0 0 0-6.32 0" />
              </g>
            </svg>
            Biometric identification
          </h1>
          <a href="https://github.com/JohnnieWalked">
            <AiFillGithub />
          </a>
        </section>

        {!isCalibration && (
          <section className="calibration">
            <BsFillEyeFill />
            <p>
              After pressing the button, You will need to folow mouse with Your
              eyes and click on specific areas, that will appear on the screen.
              <br />
              Please, hold still during calibration to achieve the highest eye
              tracker results.
            </p>

            <button
              onClick={handleClickCalibration}
              className="mainCalibration"
            >
              Start calibration
            </button>
          </section>
        )}
      </div>

      {isCalibration === true && (
        <CalibrationAreasPortal handleCalibration={setIsCalibration} />
      )}
    </>
  );
}

export default App;
