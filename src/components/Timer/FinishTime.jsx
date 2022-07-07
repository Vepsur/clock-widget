import styles from "./Timer.module.scss"

function FinishTime({ finishArr }) {

  const difference = (item, index) => {
    let m = 0,
      s = 0,
      ms = 0,
      diff = (item.m * 60 * 100 + item.s * 100 + item.ms),
      prevItem = finishArr[index - 1];

    if (prevItem) diff = diff - (prevItem.m * 60 * 100 + prevItem.s * 100 + prevItem.ms);

    m = (diff - diff % 6000) / 6000;
    s = Math.floor((diff % 6000) / 100);
    ms = (diff % 6000) % 100;

    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;

    return `+${m}:${s}.${ms}`;
  }


  return (
    <>
      {
        (finishArr.length > 0) ?
          (
            finishArr.map((item, index) => {
              return (
                <div className={styles.timeBlock} key={index + 'time'}>
                  <p>{index >= 10 ? index : '0' + index}</p>
                  <span>
                    {((item.m) >= 10) ? item.m : "0" + item.m}
                    :
                    {((item.s) >= 10) ? item.s : "0" + item.s}
                    .
                    {((item.ms) >= 10) ? item.ms : "0" + item.ms}
                  </span>
                  <p>{difference(item, index)}</p>
                </div>
              )
            })
          ) : (
            <div className={styles.timeStub}>
              <p>00</p>
              <span>00:00.00</span>
              <p>+00:00.00</p>
            </div>
          )
      }
    </>
  )
}

export default FinishTime;