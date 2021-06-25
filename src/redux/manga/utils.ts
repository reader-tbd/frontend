import { Dispatch } from 'react';
import _ from 'lodash';
import { loadLastVisitedManga } from './actions';
import { AxiosResponse } from 'axios';
import { Manga } from '../../api/types';

export const mangaFromResponse = (response: AxiosResponse): Manga => {
  const lastUpdated = response.data.updated_detail;
  return {
    ...response.data,
    get detailNeedsUpdate() {
      const hourAgo = new Date();
      hourAgo.setHours(hourAgo.getHours() - 1);
      return new Date(lastUpdated) < hourAgo;
    },
  };
};

export const syncLastVisited = (dispatch: Dispatch<any>, clientState: Array<Manga>) => {
  // Sync lastVisited both from and to localStorage
  return () => {
    const data = window.localStorage.getItem('sora-last-visited') || '[]';
    const cachedState = JSON.parse(String(data));

    const jsonClientState = JSON.stringify(clientState);
    const needsUpdate = jsonClientState !== JSON.stringify(cachedState);

    // If they're not equal
    if (needsUpdate) {
      // And client's state is empty (first render)
      if (_.isEmpty(clientState)) {
        // Then load cached state
        const cachedLastVisited: Array<Manga> = cachedState;
        dispatch(loadLastVisitedManga(cachedLastVisited));
      }
      // But if client state has something different, than cache
      else {
        // Then it means we need to sync localStorage
        window.localStorage.setItem('sora-last-visited', jsonClientState);
      }
    }
  };
};
