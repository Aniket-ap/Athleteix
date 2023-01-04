import { useState, useContext, createContext, useEffect } from "react";

const CardContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if(existingCart){
      setCart(JSON.parse(existingCart))
    }
  }, [])

  return (
    <CardContext.Provider value={[cart, setCart]}>
      {children}
    </CardContext.Provider>
  );
};

const useCart = () => useContext(CardContext);

export { useCart, CartProvider };
