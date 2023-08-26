import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '../slices'; 
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const configStore = () => {
  
  const persistConfig = {
    key: 'root',
    storage, 
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)


  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })

  const persistor = persistStore(store)
  
  return { store, persistor } 
}

export default configStore;
