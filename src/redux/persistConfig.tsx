import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from '@/redux/rootReducer';

const persistConfig = {
    key: 'root1',
    storage,
    //storageSession,
}

export const persistedReducer = persistReducer(persistConfig, reducer)