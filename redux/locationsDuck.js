import ApolloClient, { gql } from 'apollo-boost';

//Constants
const initialData = {
  fetching: false,
  locations: [],
  nextPage: 1,
  totalPages: 0,
  filterWordLoc: '',
  currentLocation: '',
  locationsField: 'name',
};

let client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});
const GET_LOCATIONS = 'GET_LOCATIONS';
const GET_LOCATIONS__SUCESS = 'GET_LOCATIONS__SUCESS';
const GET_LOCATIONS__ERROR = 'GET_LOCATIONS__ERROR';
const GET_LOCATIONS__NOTFOUND = 'GET_LOCATIONS__NOTFOUND';
const UPDATE_CURRENTPAGE_LOC = 'UPDATE_CURRENTPAGE_LOC';
const UPDATE_FILTER_LOC = 'UPDATE_FILTER_LOC';
const SHOW_MODALINFO_LOC = 'SHOW_MODALINFO_LOC';
const ERASE_MODALINFO_LOC = 'ERASE_MODALINFO_LOC';
const UPDATE_CHARFIELD_LOC = 'UPDATE_CHARFIELD_LOC';
const ERASE_FILTER_LOC = 'ERASE_FILTER_LOC';

//reducer

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return { ...state, fetching: true };
    case GET_LOCATIONS__SUCESS:
      return {
        ...state,
        fetching: false,
        locations: [...state.locations, ...action.payload.results],
        totalPages: action.payload.info.pages,
      };
    case GET_LOCATIONS__ERROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_LOCATIONS__NOTFOUND:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        locations: [],
      };
    case UPDATE_CURRENTPAGE_LOC:
      return { ...state, nextPage: action.payload };
    case UPDATE_FILTER_LOC:
      return {
        ...state,
        filterWordLoc: action.payload,
        nextPage: 1,
        locations: []
      };
    case SHOW_MODALINFO_LOC:
      return { ...state, currentLocation: action.payload };
    case ERASE_MODALINFO_LOC:
      return { ...state, currentLocation: '' };
    case UPDATE_CHARFIELD_LOC:
      return {
        ...state,
        locationsField: action.payload,
        filterWordLoc: '',
        locations: [],
        nextPage: 1,
      };
    case ERASE_FILTER_LOC:
      return { ...state, filterWordLoc: '', nextPage: 1 };
    default:
      return state;
  }
}

// actions

export function updateFilterLocations(filterWordLoc) {
  return (dispatch, getState) => {
    
    if (filterWordLoc.length > 3) {
      dispatch({
        type: UPDATE_FILTER_LOC,
        payload: filterWordLoc,
      });
    } else {
      dispatch({
        type: UPDATE_FILTER_LOC,
        payload: '',
      });
    }
    getLocationsAction()(dispatch, getState);
  };
}

export function getLocationsAction() {
  let query;
  return (dispatch, getState) => {
    let radio = getState().locations.locationsField;
    if (radio === 'name') {
      query = gql`
            query ($page: Int, $name: String){
            locations(page: $page, filter: { name: $name  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                id
                type
              }
            }  
          }
         `;
    } else {
      query = gql`
   query ($page: Int, $type: String){
              locations(page: $page, filter: { type: $type  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                id
                type
              }
            }  
           }
        `;
    }

    let { nextPage, filterWordLoc } = getState().locations;
    dispatch({
      type: GET_LOCATIONS,
    });
    return client
      .query({
        query,
        variables: {
          page: nextPage,
          [radio]: filterWordLoc,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: GET_LOCATIONS__SUCESS,
          payload: data.locations,
        });
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
        if (errors[0] === '404: Not Found') {
          dispatch({
            type: GET_LOCATIONS__NOTFOUND,
            payload: errors,
          });
        } else {
          console.log('error');

          dispatch({
            type: GET_LOCATIONS__ERROR,
            payload: errors,
          });
        }
      });
  };
}

export function loadMoreLocationsAction() {
  return (dispatch, getState) => {
    const { nextPage, totalPages } = getState().locations;
    if (nextPage !== totalPages) {
      dispatch({
        type: UPDATE_CURRENTPAGE_LOC,
        payload: nextPage + 1,
      });
      getLocationsAction()(dispatch, getState);
    }
  };
}

export function radioHandlerLocAction(radio) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CHARFIELD_LOC,
      payload: radio,
    });
    getLocationsAction()(dispatch, getState);
  };
}

export function eraseModalInfo() {
  return (dispatch, getState) => {
    dispatch({
      type: ERASE_MODALINFO_LOC,
    });
  };
}

export function getLocationAction(id) {
  return (dispatch, getState) => {
    let query = gql`
         query($id:ID!) {
            location(id: $id) {
                name
                id
    		    type
                dimension
                residents{
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
          type: SHOW_MODALINFO_LOC,
          payload: data.location,
        });
      })
      .catch((error) => console.log(error.message));
  };
}
