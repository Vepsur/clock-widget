import React from "react";

function Themes({ selectedTheme, setSelectedTheme }) {
  const [menuOpened, setMenuOpened] = React.useState(false);
  const menu = React.useRef();
  const theme1 = React.useRef();
  const theme2 = React.useRef();
  const theme3 = React.useRef();
  const theme4 = React.useRef();
  const color = [theme1, theme2, theme3, theme4];

  const onClickThemesMenu = () => {
    color.forEach((theme) => theme.current.classList.toggle('iconVisible'))
    setMenuOpened(!menuOpened);
  }

  const onClickTheme = (e) => {
    let color = e.target.classList[0];
    color = color.slice(0, color.length - 5);
    setSelectedTheme(color);
    onClickThemesMenu();
  }

  return (
    <div id="themesMenu" className="themesMenu">
      <img ref={menu} className={!menuOpened ? `themesMenuIcon iconVisible` : `themesMenuIcon`} onClick={onClickThemesMenu} src={`img/circle_${selectedTheme}.png`} alt="menuTheme" />
      <img ref={theme1} onClick={onClickTheme} className="whiteTheme" src="img/circle_white.png" alt="whiteCircle" />
      <img ref={theme2} onClick={onClickTheme} className="redYellowTheme" src="img/circle_redYellow.png" alt="redYellowCircle" />
      <img ref={theme3} onClick={onClickTheme} className="purpleBlueTheme" src="img/circle_purpleBlue.png" alt="purpleBlueCircle" />
      <img ref={theme4} onClick={onClickTheme} className="greenYellowTheme" src="img/circle_greenYellow.png" alt="greenYellowCircle" />
    </div>
  );
}

export default Themes;


