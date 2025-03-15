import { configureStore } from '@reduxjs/toolkit'
import groupsApi from './features/groups/groupsApi'
import usersApi from './features/users/usersApi'

export const store = configureStore({
    reducer: {
        [groupsApi.reducerPath]: groupsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(groupsApi.middleware, usersApi.middleware),
})