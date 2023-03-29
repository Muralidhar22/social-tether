import useSWR from "swr";
import { ChangeEvent } from "react";

import getLayout from '@/layout';
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";
import { authenticatedRoute } from "@/utils/redirection";
import { getUserById } from "@/lib/api/userApi";

export const getServerSideProps = authenticatedRoute

const SettingsPage = () => {
    const { sessionUserId, sessionCacheKey } = useSessionUser() as SessionUserContextType;
    const { data: sessionUserData, mutate } = useSWR(sessionCacheKey,() => getUserById(sessionUserId))
    
    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
      };
    
      const onChangeHandler = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
        isToggle?: boolean
      ) => {
        
      };
    
    return(
        <>
            Settings
        </>
    )
}

SettingsPage.getLayout = getLayout

export default SettingsPage;