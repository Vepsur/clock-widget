import React from "react";

import styles from "./Clock.module.scss"

function Clock({ clockStart, selectedTheme }) {
  const hour = React.useRef();
  const min = React.useRef();
  const sec = React.useRef();
  const ellipse = React.useRef();

  React.useEffect(() => {
    let clock;
    const startClock = () => {
      clock = setTimeout(() => {
        const clockAnimation = () => {
          const deg = 6;
          let day = new Date();
          let hh = (day.getHours() + day.getMinutes() / 60) * 30;
          let mm = (day.getMinutes() + day.getSeconds() / 60) * deg;
          let ss = (day.getSeconds() + day.getMilliseconds() / 1000) * deg;

          hour.current.style.transform = `rotateZ(${hh}deg)`;
          min.current.style.transform = `rotateZ(${mm}deg)`;
          sec.current.style.transform = `rotateZ(${ss}deg)`;
          ellipse.current.style.transform = `rotateZ(${ss}deg)`;
        }
        if (clockStart) clockAnimation();
        startClock();
      }, 40)
    }
    startClock();

    return () => clearTimeout(clock);
  }, [clockStart]);

  return (
    <div className={styles.clockWrapper}>
      <div className={styles.clock}>
        <div className={styles.background}>
          <img src="img/numbers.png" className={styles.numbers} alt="Numbers"></img>
          <div className={styles.externalCircles}>
            <div ref={ellipse} className={`${styles.ellipse} ${selectedTheme}`}></div>
          </div>
        </div>
        <div className={styles.arrows}>
          <div className={styles.hour} ref={hour}>
            <div className={styles.background}></div>
            <img src="img/hour_arrow_white.png" alt="HourArrow" />
          </div>
          <div className={styles.min} ref={min}>
            <div className={styles.background}></div>
            <img src={`img/minutes_arrow_${selectedTheme}.png`} alt="MinutesArrow" />
          </div>
          <div className={styles.sec} ref={sec}>
            <div className={styles.background}></div>
            <img src={`img/seconds_arrow_${selectedTheme}.png`} alt="SecondssArrow" />
          </div>
          <div className={styles.centralDot}></div>
        </div>
      </div>
    </div>
  );
};

export default Clock;


