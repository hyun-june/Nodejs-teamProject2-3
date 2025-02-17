import { useState, useEffect } from "react";
import { Header } from "../../components/shared/Header/Header";
import { WaterCalendar } from "./WaterCalendar/WaterCalendar";
import {
  useGetWaterAmount,
  useUpdateWaterAmount,
} from "../../core/query/water";
import "./WaterPage.css";

const MAX_HEIGHT = 300; // 병의 총 높이
const MAX_WATER = 2000;
const STEP_WATER = 250;

export const WaterPage = () => {
  const [selectedData, setSelectedDate] = useState(null);
  const [waterHeight, setWaterHeight] = useState(0);

  const { data: waterData } = useGetWaterAmount(selectedData);
  console.log("물 섭취량 데이터", waterData);
  const { mutate: updateWaterAmount } = useUpdateWaterAmount();

  useEffect(() => {
    if (waterData?.data?.amount) {
      setWaterHeight(waterData?.data?.amount); // API의 물 섭취량으로 초기 상태 설정
    } else {
      setWaterHeight(0);
    }
  }, [waterData]);

  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-CA");
    setSelectedDate(formattedDate);
  };

  const handleAddWater = () => {
    if (waterHeight < MAX_WATER) {
      updateWaterAmount(
        { date: selectedData, amount: STEP_WATER },
        {
          onSuccess: () => setWaterHeight((prev) => prev + STEP_WATER),
        }
      );
    }
  };

  const handleRemoveWater = () => {
    if (waterHeight > 0) {
      updateWaterAmount(
        { date: selectedData, amount: -STEP_WATER },
        {
          onSuccess: () => setWaterHeight((prev) => prev - STEP_WATER),
        }
      );
    }
  };

  const calculateWaterHeight = () => {
    return (waterHeight / MAX_WATER) * MAX_HEIGHT; // 비율에 따라 높이 계산
  };

  return (
    <>
      <Header backTo={-1} title="물 마시기" />
      <div className="water-container">
        <WaterCalendar onDateChange={onDateChange} value={selectedData} />
        <div className="container">
          <div className="bottle-neck"></div>
          <div className="bottle">
            <div
              className="water"
              style={{ height: `${calculateWaterHeight()}px` }}
            ></div>
          </div>
          <p className="waterHeight">{waterHeight}</p>
          <p>/2000mL</p>
          <div className="buttonContainer">
            <button
              className="controlButton"
              onClick={handleRemoveWater}
              disabled={waterHeight === 0}
            >
              - 250mL
            </button>
            <button
              className="controlButton"
              onClick={handleAddWater}
              disabled={waterHeight === MAX_WATER}
            >
              + 250mL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
