import { UserType } from "@/types";
import useSWR from "swr";

type UserState = {
    data: any;
    isLoading: boolean;
    isValidating: boolean;
    error: any;
}

const useSWRSessionState = (key: string, fetcher: (...args: any[]) => any): [sessionUserData: UserState, mutateSessionUser: (value: UserType) => Promise<any>] => {
    const { data, isLoading, isValidating,error, mutate } = useSWR(key, fetcher);
    const userState = { data, isLoading, isValidating, error }
    return [
      userState,
      (value: UserType) =>
        mutate(value, {
          revalidate: false,
        }),
    ];
 };
 
 export default useSWRSessionState;