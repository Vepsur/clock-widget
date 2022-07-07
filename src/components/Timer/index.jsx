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




/* React.useEffect(() => {
  let timer;
  let dayMs = 0;
  const startTimer = () => {
    timer = setTimeout(() => {
      const timerAnimation = () => {
        function twoNumbers(str) {
          if (str.length === 1) {
            return '0' + str;
          } else if (str.length > 2) {
            return str[0] + str[1];
          }
          return str;
        }

        dayMs += 30;
        console.log('1');
        setMin(twoNumbers(day.getMinutes().toString()));
        setSec(twoNumbers(day.getSeconds().toString()));
        setMs(twoNumbers(Math.round(day.getMilliseconds() / 10).toString()));
        day = new Date(dayMs);
      }
      if (timerStart) timerAnimation();
      startTimer();
    }, 30)
  }
  startTimer();

  return () => clearTimeout(timer);
}, [timerStart]); */

/* const timerAnim = {
  dayMs: 0,
  timer: null,
  startTimer() {
    const timer = setTimeout(() => {
      const timerAnimation = () => {
        this.dayMs += 30;
        console.log('1');
        setMin(twoNumbers(day.getMinutes().toString()));
        setSec(twoNumbers(day.getSeconds().toString()));
        setMs(twoNumbers(Math.round(day.getMilliseconds() / 10).toString()));
        day = new Date(this.dayMs);
      }
      if (timerStart) timerAnimation();
      this.startTimer();
    }, 30)
    this.timer = timer;
  },
  stopTimer() {
    clearTimeout(this.timer);
  },

} 

&& (time.h !== 0 || time.m !== 0 || time.s !== 0 || time.ms !== 0) 

*/