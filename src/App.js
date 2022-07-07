import React from 'react';

import Menu from './components/Menu';
import Themes from './components/Themes';
import Clock from './components/Clock';
import Timer from './components/Timer';

function App() {
  const [selectedTheme, setSelectedTheme] = React.useState('white');
  const [clockStart, setClockStart] = React.useState(true);
  const [interv, setInterv] = React.useState(null);
  const [timerStatus, setTimerStatus] = React.useState(true);
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const appHeight = React.useCallback(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(vh);
  }, [])
  window.addEventListener('resize', appHeight);
  appHeight();

  return (
    <div className="wrapper">
      <Menu
        clockStart={clockStart}
        setClockStart={setClockStart}
        interv={interv}
        timerStatus={timerStatus}
        setTimerStatus={setTimerStatus}
      />
      <Themes
        setSelectedTheme={setSelectedTheme}
        selectedTheme={selectedTheme}
      />
      <div className="content">
        <div id="clock" className="visibleClock">
          <Clock
            clockStart={clockStart}
            selectedTheme={selectedTheme}
          />
        </div>
        <div id="timer" className="hiddenTimer">
          <Timer
            timerStatus={timerStatus}
            setTimerStatus={setTimerStatus}
            interv={interv}
            setInterv={setInterv}
            selectedTheme={selectedTheme}
          />
        </div>
      </div>
    </div>
  );
}


export default App;