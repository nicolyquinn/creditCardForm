import { useCard } from "@/context/CardContext";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "./FormSide.module.scss";

export const FormSide = () => {
  const router = useRouter();

  const { cardName, cardNumber, dateMM, dateYY, cardCVC, updateCardInfo } =
    useCard();

  const [touched, setTouched] = useState({
    cardName: false,
    cardNumber: false,
    dateMM: false,
    dateYY: false,
    cardCVC: false,
  });

  const handleNameChange = (event: any) => {
    const newName = event.target.value;
    updateCardInfo({ cardName: newName });
    setTouched({ ...touched, cardName: true });
  };

  const handleNumberChange = (event: any) => {
    const newNumber = event.target.value;
    const formattedValue = newNumber
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, "$1 $2 $3 $4")
      .trim();
    updateCardInfo({ cardNumber: formattedValue });
    setTouched({ ...touched, cardNumber: true });

    event.target.value = formattedValue;
  };

  const handleDateMMChange = (event: any) => {
    const newDateMM = event.target.value;
    updateCardInfo({ dateMM: newDateMM });
    setTouched({ ...touched, dateMM: true });
  };

  const handleDateYYChange = (event: any) => {
    const newDateYY = event.target.value;
    updateCardInfo({ dateYY: newDateYY });
    setTouched({ ...touched, dateYY: true });
  };

  const handleCardCVCChange = (event: any) => {
    const newCardCVC = event.target.value;
    updateCardInfo({ cardCVC: newCardCVC });
    setTouched({ ...touched, cardCVC: true });
  };

  const cardNameError = touched.cardName && cardName.length < 5;
  const cardNumberError =
    touched.cardNumber && !/^(?:\d[- ]*){16}$/.test(cardNumber);
  const dateYYError = touched.dateYY && dateYY! < 23;
  const dateMMError = touched.dateMM && (dateMM! < 1 || dateMM! > 12);
  const cardCVCError = touched.cardCVC && !/^[0-9]{3}$/.test(cardCVC);

  function handleSubmit(event: any) {
    event.preventDefault();
    if (
      dateYYError ||
      dateMMError ||
      cardNameError ||
      cardNumberError ||
      cardCVCError
    ) {
      alert("Incomplete Form");
    } else {
      router.push("/successfull");
    }
  }

  return (
    <div className={style.formSide}>
      <form onSubmit={handleSubmit} className={style.formWrapper}>
        <div className={style.inputWrapper}>
          <label>
            CARDHOLDER NAME
            <input
              className={cardNameError ? style.inputInvalid : ""}
              type="text"
              placeholder="e.g. Jane Appleseed"
              name="cardName"
              onChange={handleNameChange}
            />
            {cardNameError && (
              <div className={style.errorMessage}>Full name is required</div>
            )}
          </label>
        </div>
        <div className={style.inputWrapper}>
          <label>
            CARD NUMBER
            <input
              className={cardNumberError ? style.inputInvalid : ""}
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              name="cardNumber"
              defaultValue={""}
              onChange={handleNumberChange}
            />
            {cardNumberError && (
              <div className={style.errorMessage}>
                Wrong format, numbers only
              </div>
            )}
          </label>
        </div>
        <div className={style.expirationWrapper}>
          <div className={style.inputWrapper}>
            <label>
              EXP. DATE (MM/YY)
              <div className={style.dateInputWrapper}>
                <div>
                  <input
                    className={
                      dateMMError ? style.inputInvalid : style.dateInputItem
                    }
                    type="number"
                    placeholder="MM"
                    name="dateMM"
                    onChange={handleDateMMChange}
                  />
                  {dateMMError && (
                    <div className={style.errorMessage}>Invalid Month</div>
                  )}
                </div>
                <div>
                  <input
                    className={
                      dateYYError ? style.inputInvalid : style.dateInputItem
                    }
                    type="number"
                    placeholder="YY"
                    name="dateYY"
                    onChange={handleDateYYChange}
                  />
                  {dateYYError && (
                    <div className={style.errorMessage}>Invalid Year</div>
                  )}
                </div>
              </div>
            </label>
          </div>
          <div className={style.inputWrapper}>
            <label>
              CVC
              <input
                className={cardCVCError ? style.inputInvalid : ""}
                type="number"
                name="cardCvc"
                onChange={handleCardCVCChange}
              />
              {cardCVCError && (
                <div className={style.errorMessage}>Can't be blank</div>
              )}
            </label>
          </div>
        </div>
        <button type="submit" className={style.confirmButton}>
          Confirm
        </button>
      </form>
    </div>
  );
};
