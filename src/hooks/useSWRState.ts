import useSWR from "swr";

type State<T> = {
    data: T;
    isLoading: boolean;
    isValidating: boolean;
    error: any;
}

const useSWRState = <T>(key: string, fetcher: (...args: any[]) => any): [state: State<T>, mutate: (value: T) => Promise<any>] => {

    const { data, isLoading, isValidating,error, mutate } = useSWR(key, fetcher);
    const state = { data, isLoading, isValidating, error }
    return [
      state,
      (value: T) =>
        mutate(value, {
          revalidate: false,
        }),
    ];
 };
 
 export default useSWRState;