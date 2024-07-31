import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null); // UserContext 생성

const UserStore = (props) => {
  const [nick, setNick] = useState(
    localStorage.getItem("nick") || "닉네임을 입력해주세요."
  );
  useEffect(() => {
    localStorage.setItem("nick", nick);
  }, [nick]);

  return (
    <UserContext.Provider
      value={{
        nick,
        setNick,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
