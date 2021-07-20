import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters, MangaList } from '../../utils/apiTypes';
import { CurrentChapter } from './reducer';
import { detailsNeedUpdate } from './utils';

// Manga
export const setCurrentManga = createAction<Manga>('manga/setPreview');
export const fetchMangaDetail = createAsyncThunk<Manga, Number>('manga/fetchDetail', async (id: Number) => {
  const response = await axios.get(`manga/${id}`);
  return response.data;
});

// Chapters
export const setCurrentChapter = createAction<MangaChapter>('manga/setCurrentChapter');
export const fetchMangaChapters = createAsyncThunk<MangaChapters, Number>('manga/fetchChapters', async (id: Number) => {
  console.log('Fetching chapters');
  const response = await axios.get(`manga/${id}/chapters`);
  return response.data;
});
export const fetchChapterImages = createAsyncThunk<MangaChapterImages, Number>(
  'manga/fetchChapterImages',
  async (id: Number) => {
    const response = await axios.get(`manga/${id}/images`);
    return response.data;
  }
);

// Viewed
export const loadViewedManga = createAction<MangaList>('manga/loadViewed');
export const pushViewedManga = createAction<Manga>('manga/pushViewed');

/**
 * Fetch all data - manga details, chapter list and images for given chapter
 */
export const fetchAll = createAsyncThunk<
  { manga: Manga; chapter?: CurrentChapter },
  { mangaId: number; volumeNumber: number; chapterNumber: number }
>('manga/fetchAll', async ({ mangaId, volumeNumber, chapterNumber }) => {
  let manga;
  do {
    manga = (await axios.get(`manga/${mangaId}`)).data as Manga;
  } while (detailsNeedUpdate(manga));

  const { data: chapters }: { data: MangaChapters } = await axios.get(`manga/${mangaId}/chapters`);

  const currentChapter = chapters.find((chapter) => chapter.volume === volumeNumber && chapter.number == chapterNumber);
  const { data: currentChapterImages } = await axios.get(`manga/${currentChapter?.id}/images`);

  return {
    manga: {
      ...manga,
      chapters: chapters,
    },
    chapter: {
      ...currentChapter,
      images: currentChapterImages,
    } as CurrentChapter,
  };
});
