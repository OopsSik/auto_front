import {userApi} from "./userApi.js";

const usersApi = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({paged}) => `/user/getAll?paged=${paged}`,
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Users', id })),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),
        deleteUsers: builder.mutation({
            query: (data) => ({
                url: '/user/delete',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }]
        }),
        getUsersWithMoney: builder.query({
            query: () => '/user/getAllMoney',
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Users', id })),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),
        updateMoneyUser: builder.mutation({
            query: (data) => ({
                url: '/user/updateMoney',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }]
        })
    })
})

export const {useGetUsersQuery, useDeleteUsersMutation, useGetUsersWithMoneyQuery, useUpdateMoneyUserMutation} = userApi