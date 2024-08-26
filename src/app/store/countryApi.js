import {userApi} from "./userApi.js";

const countryApi = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getCountry: builder.query({
            query: ({paged}) => `/country/getAll?paged=${paged}`,
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Country', id })),
                        { type: 'Country', id: 'LIST' },
                    ]
                    : [{ type: 'Country', id: 'LIST' }],
        }),
        getCountryAll: builder.query({
            query: () => '/country/getAllWithout',
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Country', id })),
                        { type: 'Country', id: 'LIST' },
                    ]
                    : [{ type: 'Country', id: 'LIST' }],
        }),
        createCountry: builder.mutation({
            query: (data) => ({
                url: '/country/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Country', id: 'LIST' }]
        }),
        deleteCountry: builder.mutation({
            query: (data) => ({
                url: '/country/delete',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: [{ type: 'Country', id: 'LIST' }]
        })
    })
})

export const {useGetCountryQuery,useCreateCountryMutation, useDeleteCountryMutation, useGetCountryAllQuery} = countryApi