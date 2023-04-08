import { ReactNode, createContext, useContext, useState } from "react";

type CardContextType = {
  cardName: string;
  cardNumber: string;
  dateMM: number;
  dateYY: number;
  cardCVC: string;
};

type CardContext = CardContextType & {
  updateCardInfo: (newCardInfo: Partial<CardContextType>) => void;
};

const cardContextDefaultValues: CardContext = {
  cardName: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  dateMM: 0,
  dateYY: 0,
  cardCVC: "123",
  updateCardInfo: () => {},
};

const CardContext = createContext<CardContext>(cardContextDefaultValues);

export function useCard() {
  const contextValue = useContext(CardContext);
  return contextValue;
}

type Props = {
  children: ReactNode;
};
export function CardProvider({ children }: Props) {
  const [cardInfo, setCardInfo] = useState<CardContext>(
    cardContextDefaultValues
  );

  const updateCardInfo = (newCardInfo: Partial<CardContextType>) => {
    setCardInfo((prev) => ({ ...prev, ...newCardInfo }));
  };

  const contextValue = {
    ...cardInfo,
    updateCardInfo,
  };

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
}
