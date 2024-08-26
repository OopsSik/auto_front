import {userApi} from "./userApi.js";

const settingApi = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getMoney: builder.query({
            query: () => '/money/getMoney',
            providesTags: (result, error, id) => [{ type: 'Setting', id: 'LIST'}]
        }),
        setMoney: builder.mutation({
            query: (data) => ({
                url: '/money/updateMoney',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Setting']
        }),
        getStats: builder.query({
            query: () => '/money/general',
            providesTags: (result, error, id) => [{ type: 'Credential', id: 'LIST'}, {type: 'Users', id: 'LIST'}, {type: 'CredentialUser', id: 'LIST'}, {type: 'Country', id: 'LIST'}]
        }),
        getStatsUsers: builder.query({
            query: () => '/money/getStatsUsers',
            providesTags: (result, error, id) => [{ type: 'Credential', id: 'LIST'}, {type: 'Users', id: 'LIST'}, {type: 'CredentialUser', id: 'LIST'}]
        })
    })
})

export const {useGetMoneyQuery, useSetMoneyMutation, useGetStatsQuery, useGetStatsUsersQuery} = settingApi