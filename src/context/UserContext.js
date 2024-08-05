// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserTypeFromFirebase } from '../utils/firebase'; // Asegúrate de tener esta función para obtener el tipo de usuario desde Firebase

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userType = await getUserTypeFromFirebase();
      setUser({ type: userType });
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
