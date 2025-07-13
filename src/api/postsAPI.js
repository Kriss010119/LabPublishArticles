import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsAPI = createApi({
    reducerPath: "postsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://89.169.180.108:8080/api/v1/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Posts', 'Drafts'],
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: ({ page = 0, size = 21, tag, query } = {}) => ({
                url: 'posts',
                params: { page, size, tag, query }
            }),
            providesTags: ['Posts'],
        }),
        getAllDrafts: builder.query({
            query: () => '/drafts',
            providesTags: ['Drafts'],
        }),
        getPostById: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: ['Posts'],
        }),
        getDraftById: builder.query({
            query: (id) => `/drafts/${id}`,
        }),
        createDraft: builder.mutation({
            query: (body) => ({
                url: '/drafts',
                method: 'POST',
                body,
            }),
        }),
        updateDraft: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/drafts/${id}`,
                method: 'PATCH',
                body,
            }),
        }),
        deleteDraft: builder.mutation({
            query: (id) => ({
                url: `/drafts/${id}`,
                method: 'DELETE',
            }),
        }),
        publishDraft: builder.mutation({
            query: (id) => ({
                url: `/drafts/${id}/publish`,
                method: 'POST',
            }),
        }),
        unpublishPost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}/unpublish`,
                method: 'POST',
            }),
        }),
        getAllTags: builder.query({
            query: () => '/tags',
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useGetAllDraftsQuery,
    useGetDraftByIdQuery,
    useCreateDraftMutation,
    useUpdateDraftMutation,
    useDeleteDraftMutation,
    usePublishDraftMutation,
    useUnpublishPostMutation,
    useGetAllTagsQuery,
} = postsAPI;