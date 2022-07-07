function Menu({ setClockStart, interv, timerStatus, setTimerStatus }) {

  const onClickMenu = () => {
    const clockIcon = document.querySelector('.clockIcon');
    const timerIcon = document.querySelector('.timerIcon');

    if (clockIcon.classList.value === 'clockIcon') {
      clockIcon.classList.add('iconVisible');
      timerIcon.classList.add('iconVisible');
    } else {
      clockIcon.classList.remove('iconVisible');
      timerIcon.classList.remove('iconVisible');
    }
  }

  const onClickTimer = () => {
    setClockStart(false);
    const clock = document.querySelector('#clock');
    const timer = document.querySelector('#timer');

    clock.classList.remove('visibleClock');
    clock.classList.add('hiddenClock');
    timer.classList.remove('hiddenTimer');
    timer.classList.add('visibleTimer');
  }

  const onClickClock = () => {
    setClockStart(true);
    clearInterval(interv);
    if (!timerStatus) setTimerStatus(!timerStatus);
    const clock = document.querySelector('#clock');
    const timer = document.querySelector('#timer');

    clock.classList.remove('hiddenClock');
    clock.classList.add('visibleClock');
    timer.classList.remove('visibleTimer');
    timer.classList.add('hiddenTimer');
  }

  return (
    <div id="menu" className="menu">
      <img className="menuIcon" onClick={onClickMenu} src="img/menu.png" alt="Menu" />
      <img className="clockIcon" onClick={onClickClock} src="img/clock_icon.png" alt="ClockIcon" />
      <img className="timerIcon" onClick={onClickTimer} src="img/timer_icon.png" alt="TimerIcon" />
    </div>
  );
}

export default Menu;


