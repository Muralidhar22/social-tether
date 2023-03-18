import { UserType } from "@/types";
import useSWR from "swr";

const useSWRSessionState = (key: string, fetcher: (...args: any[]) => any): [sessionUserData: UserType, mutateSessionUser: (value: UserType) => Promise<any>] => {
    const { data, mutate } = useSWR(key, fetcher);
  
    return [
      data,
      (value: UserType) =>
        mutate(value, {
          revalidate: false,
        }),
    ];
 };
 
 export default useSWRSessionState;