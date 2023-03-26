import { useContext, createContext, useState,Dispatch, SetStateAction, useRef } from "react"

import { userIdEndpoint } from '@/lib/api/userApi';

export type SessionUserContextType = {
    sessionUserId: string;
    setSessionUserId: Dispatch<SetStateAction<string>>;
    sessionCacheKey: string
}

const SessionUserContext = createContext<SessionUserContextType | null>(null)

export const SessionUserProvider = ({children, sid }: { children: React.ReactNode, sid: string }) => {
    const [state, setState] = useState<string>(sid)
    const sessionCacheKey = `${userIdEndpoint}/${state}`
    const value = {
        sessionUserId: state,
        setSessionUserId: setState,
        sessionCacheKey
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