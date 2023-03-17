import { UserType } from "@/types"
import { useContext, createContext, useState,Dispatch, SetStateAction } from "react"

type SessionUserContextType = {
    sessionUser: UserType | undefined;
    setSessionUser: Dispatch<SetStateAction<UserType | undefined>>;
}

const SessionUserContext = createContext<SessionUserContextType | null>(null)

export const SessionUserProvider = ({children}: { children: React.ReactNode }) => {
    const [state, setState] = useState<UserType>()
    
    const value = {
        sessionUser: state,
        setSessionUser: setState
    }
    return <SessionUserContext.Provider value={value}>{children}</SessionUserContext.Provider>
}

export const useSessionUser = () => {
    const context = useContext(SessionUserContext);
    if (context === undefined) {
      throw new Error('useSessionUser must be used within a SessionUserProvider');
    }
    return context;
}