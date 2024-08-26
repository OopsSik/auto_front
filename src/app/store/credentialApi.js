import {userApi} from "./userApi.js";

const credentialApi = userApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadCredential: builder.mutation({
            query: ({file}) => {
                console.log(file)
                const formData = new FormData()
                formData.append('file', file)
                console.log(formData)
                return {
                    url: '/credential/upload',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [{type: 'Credential', id: 'LIST'}]
        }),
        getAllCredential: builder.query({
            query: ({paged}) => `/credential/getAll?paged=${paged}`,
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({id}) => ({type: 'Credential', id})),
                        {type: 'Credential', id: 'LIST'},
                    ]
                    : [{type: 'Credential', id: 'LIST'}],
        }),
        deleteCredential: builder.mutation({
            query: (data) => ({
                url: '/credential/delete',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: [{type: 'Credential', id: 'LIST'}]
        }),
        getByCountryCredential: builder.mutation({
            query: (data) => ({
                url: '/credential/getByCountry',
                method: 'POST',
                body: data
            })
        }),
        updateCredential: builder.mutation({
            query: (data) => ({
                url: '/credential/update',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'Credential', id: 'LIST'}, {type: 'CredentialUser', id: 'LIST'}]
        }),
        getByUserCredential: builder.query({
            query: ({paged}) => `/credential/getAllByUser?paged=${paged}`,
            providesTags: (result) =>
                result.data
                    ? [
                        ...result.data.map(({id}) => ({type: 'Credential', id})),
                        {type: 'Credential', id: 'LIST'},
                    ]
                    : [{type: 'Credential', id: 'LIST'}],
        }),
    })
})

export const {
    useUploadCredentialMutation,
    useGetAllCredentialQuery,
    useDeleteCredentialMutation,
    useGetByCountryCredentialMutation,
    useUpdateCredentialMutation,
    useGetByUserCredentialQuery
} = credentialApi