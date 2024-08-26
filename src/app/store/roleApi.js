import {userApi} from "./userApi.js";

const roleApi = userApi.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => `/role/getAll`
        })
    })
})

export const {useGetRolesQuery} = roleApi