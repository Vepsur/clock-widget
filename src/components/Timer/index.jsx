import React from "react";
import get from "lodash.get";

// import useWindowDimensions from "../hooks/useWindowDimensions";
import styles from "./Timer.module.scss"
import FinishTime from "./FinishTime";

function Timer({ interv, setInterv, timerStatus, setTimerStatus, selectedTheme }) {
  const [time, setTime] = React.useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [finishArr, setFinishArr] = React.useState([]);
  const finishBlock = React.useRef();
  const sec = React.useRef();
  const ellipse = React.useRef();
  // const { height, width } = useWindowDimensions();

  React.useEffect(() => {
    const deg = 6;
    let ss = (time.s + time.ms / 100) * deg;
    sec.current.style.transform = `rotateZ(${ss}deg)`;
    ellipse.current.style.transform = `rotateZ(${ss}deg)`;
  }, [time]);

  React.useEffect(() => {
    finishBlock.current.scrollTop = finishBlock.current.scrollHeight;
  }, [finishArr])

  const start = () => {
    runTimer();
    setInterv(setInterval(runTimer, 10));
  }

  const stop = () => {
    clearInterval(interv);
  }

  const onClickRefresh = () => {
    clearInterval(interv);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setFinishArr([]);
    if (!timerStatus) {
      setTimerStatus(!timerStatus);
    }
  }

  const onClickFinish = (time) => {
    setFinishArr(prev => [...prev, time]);
  }

  let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const runTimer = () => {
    updatedMs++;

    if (updatedMs === 100) {
      updatedS += 1;
      updatedMs = 0;
    }
    if (updatedS === 60) {
      updatedM += 1;
      updatedS = 0;
    }
    if (updatedM === 60) {
      updatedH += 1;
      updatedM = 0;
    }

    setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH })
  };

  const onClickStart = () => {
    setTimerStatus(!timerStatus);
    if (timerStatus) {
      start();
    } else {
      stop();
    }
  }

  return (
    <>
      <div className={styles.timerWrapper}>
        <div className={styles.timer}>
          <div className={styles.timerBackground}>
            <div id="serif" className={styles.timerSerifs}>
              <img src="img/clock_serifs.png" alt="ClockSerifs" />
            </div>
            <div className={styles.externalCircles}>
              <div ref={ellipse} className={`${styles.ellipse} ${get(styles, selectedTheme)}`}></div>
            </div>
          </div>
          <div className={styles.arrows}>
            <div className={styles.sec} ref={sec}>
              <div className={styles.background}></div>
              <img src={`img/seconds_arrow_${selectedTheme}.png`} alt="SecondssArrow" />
            </div>
          </div>
          <div className={styles.digitalDial}>
            <p>{((time.m) >= 10) ? time.m : "0" + time.m}</p>:
            <p>{((time.s) >= 10) ? time.s : "0" + time.s}</p>.
            <p>{((time.ms) >= 10) ? time.ms : "0" + time.ms}</p>
          </div>
        </div>
        <div className={styles.timerExtensions}>
          <div className={styles.timerButtons}>
            <button disabled={!timerStatus} >
              <img src="img/reload.png" alt="Reload" onClick={timerStatus ? onClickRefresh : undefined} />
            </button>
            <button>
              <img
                src={timerStatus ? "img/play.png" : "img/pause.png"}
                alt="Play"
                onClick={onClickStart}
              />
            </button>
            <button disabled={timerStatus} >
              <img src="img/finish.png" alt="Finish" onClick={!timerStatus ? (() => onClickFinish(time)) : undefined} />
            </button>
          </div>
          <div className={styles.finishTimeWrapper}>
            <div className={styles.topFinishTime}></div>
            <div className={styles.finishTime} ref={finishBlock}>
              <FinishTime finishArr={finishArr} />
            </div>
            <div className={styles.bottomFinishTime}></div>
          </div>
        </div>
      </div>

    </>

  );
}

export default Timer;