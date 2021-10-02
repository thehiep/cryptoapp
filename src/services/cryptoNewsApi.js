import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '19d170df37msh82cc5bd835619a0p1a5936jsn1ed1db8045bf'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/';
const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&Count=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;