
import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

const SESSION_KEY = "smartseed_session_id";

export function SessionProvider({ children }) {
  const [sessionId, setSessionIdState] = useState(
    () => sessionStorage.getItem(SESSION_KEY)
  );

  const setSessionId = (id) => {
    if (id) {
      sessionStorage.setItem(SESSION_KEY, id);
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }

    setSessionIdState(id || null);
  };

  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionIdState(null);
  };

  return (
    <SessionContext.Provider
      value={{ sessionId, setSessionId, clearSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      "useSession must be used inside SessionProvider"
    );
  }

  return context;
}
