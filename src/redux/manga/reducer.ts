import { createReducer } from '@reduxjs/toolkit';
import { Manga, MangaList } from '../../api/types';
import { setMangaPreview, loadLastVisitedManga, pushLastVisitedManga, fetchMangaDetail } from './actions';

type StateType = {
  currentManga: Manga;
  lastVisited: MangaList;
};

const initialState: StateType = {
  currentManga: { id: -1, title: '', description: '' },
  lastVisited: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setMangaPreview, (state, action) => {
    state.currentManga = action.payload;
  });
  builder.addCase(fetchMangaDetail.fulfilled, (state, action) => {
    state.currentManga = action.payload;
  });
  builder.addCase(loadLastVisitedManga, (state, action) => {
    state.lastVisited = action.payload;
  });
  builder.addCase(pushLastVisitedManga, (state, action) => {
    let newLastVisited = state.lastVisited.filter((element) => element.id !== action.payload.id);
    newLastVisited.unshift(action.payload);
    // If some values were removed after filter
    while (newLastVisited.length > 3) {
      console.log('Popping');
      newLastVisited.pop();
    }

    state.lastVisited = newLastVisited;
  });
});

export default reducer;
