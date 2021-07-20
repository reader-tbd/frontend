import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { useEffect } from 'react';
import { StoreType } from '../../redux/store';
import { initInterceptors } from './interceptors';

applyCaseMiddleware(axios);

axios.defaults.baseURL = `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Initialize axios interceptors once for client and give it access to your wrapper store
export const useCustomInterceptors = (store: StoreType) => useEffect(() => initInterceptors(store), [store]);
