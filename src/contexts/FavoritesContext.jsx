import { createContext, useState } from "react";

export const FavoritosContext = createContext({
  ids: [],
  addFav: (id) => {},
  removeFav: (id) => {},
});

function FavoritosContextProvider({ children }) {
  const [ids, setIds] = useState([]);

  const addFav = (id) => {
    if (!ids.includes(id)) {
      setIds([...ids, id]);
    }
    console.log(ids)
  };

  const removeFav = (id) => {
    setIds(ids.filter((productId) => productId !== id));
  };

  return (
    <FavoritosContext.Provider value={{ ids, addFav, removeFav }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export default FavoritosContextProvider;
