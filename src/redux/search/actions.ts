import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MutableRefObject } from 'react';
import { MangaList } from '../../api/types';

export const SEARCH_MANGA = 'SEARCH_MANGA';
export const SET_SEARCH_INPUT_REF = 'SET_SEARCH_INPUT_REF';

export const startSearch = createAsyncThunk(
  'search/start',
  async (query: string): Promise<{ query: string; results: MangaList }> => {
    const response = await axios.get('manga/search/', {
      params: {
        title: query,
      },
    });
    return {
      query,
      results: response.data,
    };
  }
);

export const setSearchRef = createAction<MutableRefObject<HTMLInputElement | undefined>>('setSearchRef');
