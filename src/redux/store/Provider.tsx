'use client'
import { Provider } from "react-redux";
import configStore from './configStore';
const { store } = configStore() 


function Providers({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;