import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import charactersReducer, { getCharactersAction } from './charactersDuck';
import locationsReducer, { getLocationsAction } from './locationsDuck';
import episodesReducer,{getEpisodesAction} from './episodesDuck';

let rootReducer = combineReducers({
  characters: charactersReducer,
  locations: locationsReducer,
  episodes: episodesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  getCharactersAction()(store.dispatch, store.getState);
  getLocationsAction()(store.dispatch, store.getState);
  getEpisodesAction()(store.dispatch, store.getState);

  return store;
}
