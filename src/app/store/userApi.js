import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logoutUser} from "./userSlice.js";
import {useNavigate} from "react-router-dom";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://185.65.245.234/api',
    prepareHeaders: (headers, api) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
    credentials: 'include'
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/user/refreshAccessToken', api, extraOptions)
        if (refreshResult.data.accessToken) {
            localStorage.setItem('accessToken', refreshResult.data.accessToken)
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logoutUser())
        }
    }
    return result
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tags: ['Users', 'Country', 'Credential', "CredentialUser", 'Setting'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/user/login',
                method: 'POST',
                body: data
            })
        }),
        registrationUser: builder.mutation({
            query: (data) => ({
                url: '/user/registration',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
        getDataUser: builder.query({
            query: () => '/user/getDataUser',
            keepUnusedDataFor: 0
        }),
        changeMoneyUser: builder.mutation({
            query: (data) => ({
                url: '/user/changeMoney',
                method: 'PUT',
                body: data
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST'
            })
        })
    })
})

export const {
    useLoginUserMutation,
    useGetDataUserQuery,
    useRegistrationUserMutation,
    useChangeMoneyUserMutation,
    useLogoutUserMutation
} = userApi