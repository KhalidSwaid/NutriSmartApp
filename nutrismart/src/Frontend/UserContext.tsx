// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInfo } from "../types/UserInfo";

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    phoneNumber: "",
    id: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
