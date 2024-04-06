import { useEffect, useState } from "react";
import styled from "styled-components";


const FooterContainer = ({ className }) => {
  const [temp, setTemp] = useState("");
  const [place, setPlace] = useState("");
  const [condition, setCondition] = useState("");
  let conditionResult = condition.charAt(0).toUpperCase() + condition.slice(1);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=59.92640431085751&lon=30.296051165519195&units=metric&&lang=ru&appid=69e143aa53dee6d7219166f57c1b9e0b")
      .then((res) => res.json())
      .then(({ name, weather, main }) => {
        setTemp(main.temp.toFixed(0));
        setPlace(name);
        setCondition(weather[0]?.description);
      });
  }, []);

  return (
    <>
      <div className={className}>
        <div>
          <div>Blog web-developer</div>
          <div>Copyright © 2024</div>
        </div>
        <div>
          <div>{new Date().toLocaleDateString("ru", {day: "numeric", month: "long"})}</div>
          <div>{place}</div>
          <div>{conditionResult}, t:  {temp}°C</div>
        </div>
      </div>
    </>
  );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    width: 1000px;
    // position:fixed;
    // bottom: 0;
    box-shadow: 0px -6px 19px 4px rgba(34, 60, 80, 0.44);
    font-weight: 600;
    font-size: 14px;
`;
