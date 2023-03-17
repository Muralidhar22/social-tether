import useSWR from "swr";

const useSWRGlobalState = (key: string, fetcher: (...args: any[]) => any) => {
    const { data, mutate } = useSWR(key, fetcher);
    return [
      data,
      (value) =>
        mutate(value, {
          revalidate: false,
        }),
    ];
 };
 
 export default useSWRGlobalState;