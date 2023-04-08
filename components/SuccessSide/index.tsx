import Image from "next/image";
import style from "./SuccessSide.module.scss";

export const SucessSide = () => {
  return (
    <div className={style.successSide}>
      <Image
        alt="icon-complete"
        width={80}
        height={80}
        src="/icon-complete.svg"
      />
      <h1>THANK YOU!</h1>
      <p>We&apos;ve added your card details</p>
      <button className={style.continueButton}>Continue</button>
    </div>
  );
};
