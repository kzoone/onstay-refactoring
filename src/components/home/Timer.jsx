import { useEffect, useRef, useState } from "react"

export default function Timer(props) {

  /**
   * 현재 시간으로부터 익일 0시까지 남은 시간,분,초를 반환
   * @returns {number[]} [시간,분,초] 형태 배열
   */
  const calcRestTime = () => {
      const now = new Date()
      const tommorow = new Date(new Date().setDate(now.getDate() + 1))
      const tommorowMidNight = new Date(tommorow.getFullYear(), tommorow.getMonth(), tommorow.getDate())
      // 현재 시간과, 익일 오전 0시(날짜 바뀌는 날) 사이의 시간 차이를 구함. (1000으로 나누어 sec 단위로 변환) 
      let timeDiff = (tommorowMidNight.getTime() - now.getTime())/1000;
      //시간, 분, 초로 변환
      let restHour = parseInt(timeDiff/(60*60));
      let restMin = parseInt((timeDiff%(60*60))/60) 
      let restSec = parseInt((timeDiff%(60*60)) % 60)
      return [restHour, restMin, restSec]
  }

  // 페이지 들어온 시점에 타임어택 남은 시간,분,초를 계산하여 state 초기값으로 설정
  let [rHour,rMin,rSec] = calcRestTime()
  let [restHour, setRestHour] = useState(rHour)
  let [restMin, setRestMin] = useState(rMin)
  let [restSec, setRestSec] = useState(rSec)

  const timeAttack = useRef(null);

  // useEffect를 통해 timeAttack 인터벌이 처음 마운트되었을 때 한 번만 생성되도록 함.
  useEffect(()=>{
    timeAttack.current = setInterval(()=>{
      // 날짜가 바뀔 경우, timeAttackSection에 숙소가 새로 렌더링되어야 하기 때문에 
      // 매 초마다 날짜가 바뀌었는지 체크해서 반영해야 함 (날짜 바뀌면 timeattacksection이 재렌더링됨)
      const now = new Date()
      props.setDay(now.getDate()) 
      
      let [restHour, restMin, restSec] = calcRestTime()

      // 익일 자정 0시 전까지 남은 시간을 state에 반영
      setRestHour(restHour)
      setRestMin(restMin)
      setRestSec(restSec)
      return () => clearInterval(timeAttack.current)
    },1000)
  },[])

  // ex) 7분이면 -> "07" 형태가 되도록 변환
  const timeLpad = num => String(num).length===2 ? `${num}` : `0${num}` 

  return (
    <span>{timeLpad(restHour)}:{timeLpad(restMin)}:{timeLpad(restSec)}</span>
  )
}