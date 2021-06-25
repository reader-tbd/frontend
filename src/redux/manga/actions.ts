import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Manga, MangaList } from '../../api/types';
import { mangaFromResponse } from './utils';

export const setMangaPreview = createAction<Manga>('manga/setPreview');
export const fetchMangaDetail = createAsyncThunk<Manga, Number>('manga/fetchDetail', async (id: Number) => {
  const response = await axios.get(`manga/${id}`);
  return mangaFromResponse(response);
});
export const loadLastVisitedManga = createAction<MangaList>('manga/loadLastVisited');
export const pushLastVisitedManga = createAction<Manga>('manga/pushLastVisited');
