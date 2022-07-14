import React from "react";

import styles from "./Clock.module.scss"

function Clock({ clockStart, selectedTheme }) {
  const clock = React.useRef();
  const hour = React.useRef();
  const min = React.useRef();
  const sec = React.useRef();
  const ellipse = React.useRef();

  const runClock = React.useCallback(() => {
    const deg = 6;
    let day = new Date();
    let hh = (day.getHours() + day.getMinutes() / 60) * 30;
    let mm = (day.getMinutes() + day.getSeconds() / 60) * deg;
    let ss = (day.getSeconds() + day.getMilliseconds() / 1000) * deg;

    hour.current.style.transform = `rotateZ(${hh}deg)`;
    min.current.style.transform = `rotateZ(${mm}deg)`;
    sec.current.style.transform = `rotateZ(${ss}deg)`;
    ellipse.current.style.transform = `rotateZ(${ss}deg)`;
    
    clock.current = requestAnimationFrame(runClock);
  }, []);

  React.useEffect(() => {
    clock.current = requestAnimationFrame(runClock);
    return () => cancelAnimationFrame(clock.current);
  }, [runClock]);

  return (
    <div className={styles.clockWrapper}>
      <div ref={clock} className={styles.clock}>
        <div className={styles.background}>
          <img src="img/numbers.png" className={styles.numbers} alt="Numbers"></img>
          <div className={styles.externalCircles}>
            <div ref={ellipse} className={`${styles.ellipse} ${selectedTheme}`}></div>
          </div>
        </div>
        <div className={styles.arrows}>
          <div className={`${styles.hour} ${styles.animate}`} ref={hour}>
            <div className={styles.background}></div>
            <img src="img/hour_arrow_white.png" alt="HourArrow" />
          </div>
          <div className={`${styles.min} ${styles.animate}`} ref={min}>
            <div className={styles.background}></div>
            <img src={`img/minutes_arrow_${selectedTheme}.png`} alt="MinutesArrow" />
          </div>
          <div className={`${styles.sec} ${styles.animate}`} ref={sec}>
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


