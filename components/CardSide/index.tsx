import { useCard } from "@/context/CardContext";
import Image from "next/image";
import style from "./CardSide.module.scss";

export const CardSide = () => {
  const { cardName, cardNumber, dateMM, dateYY, cardCVC } = useCard();

  return (
    <div className={style.cardSide}>
      <div className={style.frontCard}>
        <div>
          <Image
            className={style.cardLogo}
            alt="card-logo"
            width="80"
            height="80"
            src="/card-logo.svg"
          />
        </div>
        <div>
          <h1>{cardNumber}</h1>
          <div className={style.userInfo}>
            <p className={style.userName}>{cardName}</p>
            <p>
              {dateMM}/{dateYY}
            </p>
          </div>
        </div>
      </div>
      <div className={style.backCard}>
        <p>{cardCVC}</p>
      </div>
    </div>
  );
};
