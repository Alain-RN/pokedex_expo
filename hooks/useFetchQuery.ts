import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

const endpoint = "https://pokeapi.co/api/v2"

type API = {
    "/pokemon?limit=21": {
        count: number,
        next: string | undefined,
        results: {
            name: string,
            url: string
        }
    },
}

export function useFetchQuery<T extends keyof API>(path: T) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            // await wait(1)
            return fetch(`${endpoint}${path}`, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(r => r.json() as Promise<API[T]>)
        }
    })
}
// Ca permet de stocker chaque api paginee dans "pages"
export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: `${endpoint}${path}`,
        queryFn: async ({pageParam}) => {
            // await wait(1)
            return fetch(pageParam, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(r => r.json() as Promise<API[T]>)
        },
        getNextPageParam: (lastPage: any) => lastPage.next ?? undefined
    })
}

function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration*1000))
}