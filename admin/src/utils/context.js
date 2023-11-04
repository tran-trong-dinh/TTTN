import { createContext, useState } from "react";

export const Context = createContext();
const AppContext = ({ children }) => {
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);

  return (
    <Context.Provider
      value={{
        products,
        users,
        setUsers,

        setProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default AppContext;
