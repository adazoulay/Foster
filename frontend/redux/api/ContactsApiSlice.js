import { apiSlice } from "./apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const contactsAdapter = createEntityAdapter({
  selectId: (contact) => contact._id, // Extract the _id field as the unique identifier
  sortCodmparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = contactsAdapter.getInitialState();

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: (id) => `contacts/getAllContacts`,
      transformResponse: (responseData) => {
        const contact = responseData;
        return contactsAdapter.addMany(initialState, contact);
      },
      providesTags: (result, id) => [{ type: "Contact", id }],
    }),
    addNewContact: builder.mutation({
      query: (contactData) => ({
        url: "/contacts",
        method: "POST",
        body: {
          ...contactData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Contact", id: arg.id }],
    }),
    updateTimestamp: builder.mutation({
      query: ({ id }) => ({
        url: `/contacts/updateTimestamp/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Contact", id: arg.id }],
    }),
  }),
});

export const { useGetAllContactsQuery, useAddNewContactMutation, useUpdateTimestampMutation } =
  contactsApiSlice;
