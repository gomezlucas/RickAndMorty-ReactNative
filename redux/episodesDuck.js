import ApolloClient, { gql } from 'apollo-boost';

//Constants
const initialData = {
  fetching: false,
  episodes: [],
  nextPage: 1,
  totalPages: 0,
  filterWordEpi: '',
  currentEpisode: '',
};

let client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});
const GET_EPISODES = 'GET_EPISODES';
const GET_EPISODES__SUCESS = 'GET_EPISODES__SUCESS';
const GET_EPISODES__ERROR = 'GET_EPISODES__ERROR';
const GET_EPISODES__NOTFOUND = 'GET_EPISODES__NOTFOUND';
const UPDATE_CURRENTPAGE_EPI = 'UPDATE_CURRENTPAGE_EPI';
const UPDATE_FILTER_EPI = 'UPDATE_FILTER_EPI';
const SHOW_MODALINFO_EPI = 'SHOW_MODALINFO_EPI';
const ERASE_MODALINFO_EPI = 'ERASE_MODALINFO_EPI';
const ERASE_FILTER_EPI = 'ERASE_FILTER_EPI';

//reducer

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_EPISODES:
      return { ...state, fetching: true };
    case GET_EPISODES__SUCESS:
      return {
        ...state,
        fetching: false,
        episodes: [...state.episodes, ...action.payload.results],
        totalPages: action.payload.info.pages,
      };
    case GET_EPISODES__ERROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_EPISODES__NOTFOUND:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        episodes: [],
      };
    case UPDATE_CURRENTPAGE_EPI:
      return { ...state, nextPage: action.payload };
    case UPDATE_FILTER_EPI:
      return {
        ...state,
        filterWordEpi: action.payload,
        nextPage: 1,
        episodes: [],
      };
    case SHOW_MODALINFO_EPI:
      return { ...state, currentEpisode: action.payload };
    case ERASE_MODALINFO_EPI:
      return { ...state, currentEpisode: '' };
    case ERASE_FILTER_EPI:
      return { ...state, filterWordEpi: '', nextPage: 1 };
    default:
      return state;
  }
}

//Actions

export function updateFilterEpisodes(filterWordEpi) {
  return (dispatch, getState) => {
    if (filterWordEpi.length > 3) {
      dispatch({
        type: UPDATE_FILTER_EPI,
        payload: filterWordEpi,
      });
    } else {
      dispatch({
        type: UPDATE_FILTER_EPI,
        payload: '',
      });
    }
    getEpisodesAction()(dispatch, getState);
  };
}

export function getEpisodesAction() {
  let query;
  return (dispatch, getState) => {
    query = gql`
      query ($page: Int, $name: String){ 
        episodes(page: $page, filter: { name: $name  }) {
          info{
            pages
            next
            prev
          }
          results{
            id
            name
            episode
          }
        }
           }
         `;

    let { nextPage, filterWordEpi } = getState().episodes;
    dispatch({
      type: GET_EPISODES,
    });
    return client
      .query({
        query,
        variables: {
          page: nextPage,
          name: filterWordEpi,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: GET_EPISODES__SUCESS,
          payload: data.episodes,
        });
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
        if (errors[0] === '404: Not Found') {
          dispatch({
            type: GET_EPISODES__NOTFOUND,
            payload: errors,
          });
        } else {
          console.log('error');
          dispatch({
            type: GET_EPISODES__ERROR,
            payload: errors,
          });
        }
      });
  };
}

export function loadMoreEpisodesAction() {
  return (dispatch, getState) => {
    const { nextPage, totalPages } = getState().episodes;
    if (nextPage !== totalPages) {
      dispatch({
        type: UPDATE_CURRENTPAGE_EPI,
        payload: nextPage + 1,
      });
      getEpisodesAction()(dispatch, getState);
    }
  };
}


export function getEpisodeAction(id) {
  return (dispatch, getState) => {
    let query = gql`
      query($id:ID!) {
            episode(id: $id){
                air_date
                name
                episode
                characters{
                    name
                    image
                    }
                }
            }
        `;
    return client
      .query({
        query,
        variables: {
          id,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: SHOW_MODALINFO_EPI,
          payload: data.episode,
        });
      })
      .catch((error) => console.log(error.message));
  };
}

export function eraseModalInfo() {
  return (dispatch, getState) => {
    dispatch({
      type: ERASE_MODALINFO_EPI,
    });
  };
}

