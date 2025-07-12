import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// NEED TO REDO !!! NOT GOOD POSTS

export const postsAPI = createApi({
    reducerPath: "postsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://support.sci-lab.example.com/',
    }),
    endpoints: (builder) => ({
        postDraft: builder.query({
            query: (id) => `/drafts`,
        }),
        getAllDrafts: builder.query({
            query: (id) => `/drafts`,
        }),
        getDraftById: builder.query({
            query: (id) => `/drafts/${id}`,
        }),
        patchDraftById: builder.query({
            query: (id) => `/drafts/${id}`,
        }),
        deleteDraftById: builder.query({
            query: (id) => `/drafts/${id}`,
        }),
        postDraftById: builder.query({
            query: (id) => `/drafts/${id}/publish`,
        }),
        getAllPosts: builder.query({
            query: (id) => `/posts`,
        }),
        getPostDraftById: builder.query({
            query: (id) => `/posts/${id}`,
        }),
        postPostById: builder.query({
            query: (id) => `/posts/${id}/unpublish`,
        }),
        getAllTags: builder.query({
            query: (id) => `/tags`,
        })
    })
})

export const {
    usePostDraftQuery,
    useGetAllDraftsQuery,
    useGetDraftByIdQuery,
    usePatchDraftByIdQuery,
    useDeleteDraftByIdQuery,
    usePostDraftByIdQuery,
    useGetAllPostsQuery,
    useGetPostDraftByIdQuery,
    usePostPostByIdQuery,
    useGetAllTagsQuery
} = postsAPI;