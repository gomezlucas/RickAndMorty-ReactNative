import ApolloClient, { gql } from 'apollo-boost';

//Constants
const initialData = {
  fetching: false,
  characters: [],
  nextPage: 1,
  totalPages: 0,
  filterWord: '',
  currentCharacter: '',
  characterField: 'name',
};

let client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS__SUCESS = 'GET_CHARACTERS__SUCESS';
const GET_CHARACTERS__ERROR = 'GET_CHARACTERS__ERROR';
const GET_CHARACTERS__NOTFOUND = 'GET_CHARACTERS__NOTFOUND';
const UPDATE_CURRENTPAGE = 'UPDATE_CURRENTPAGE';
const UPDATE_FILTER = 'UPDATE_FILTER';
const SHOW_MODALINFO = 'SHOW_MODALINFO';
const ERASE_MODALINFO = 'ERASE_MODALINFO';
const UPDATE_CHARFIELD = 'UPDATE_CHARFIELD';
const ERASE_FILTER_CHAR = 'ERASE_FILTER_CHAR';

// Reducers

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS__SUCESS:
      return {
        ...state,
        fetching: false,
        characters: [...state.characters, ...action.payload.results],
        totalPages: action.payload.info.pages,
      };
    case GET_CHARACTERS__ERROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_CHARACTERS__NOTFOUND:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        characters: [],
      };
    case UPDATE_CURRENTPAGE:
      return { ...state, nextPage: action.payload };
    case UPDATE_FILTER:
      return {
        ...state,
        filterWord: action.payload,
        nextPage: 1,
        characters: [],
      };
    case SHOW_MODALINFO:
      return { ...state, currentCharacter: action.payload };
    case ERASE_MODALINFO:
      return { ...state, currentCharacter: '' };
    case UPDATE_CHARFIELD:
      return {
        ...state,
        characterField: action.payload,
        filterWord: '',
        characters: [],
        nextPage: 1,
      };
    case ERASE_FILTER_CHAR:
      return { ...state, filterWord: '', nextPage: 1 };
    default:
      return state;
  }
}

// Actions

export function getCharactersAction() {
  let query;
  return (dispatch, getState) => {
    let radio = getState().characters.characterField;

    if (radio === 'name') {
      query = gql`
        query ($page: Int, $name: String){
            characters(page: $page, filter: { name: $name  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                image	
                id
                type
              }
            }  
          }
         `;
    } else {
      query = gql`
        query ($page: Int, $type: String){
            characters(page: $page, filter: { type: $type  }){
              info{
                pages
                next
                prev
              }
              results{
                name
                image	
                id
                type
              }
            }  
          }
        `;
    }

    let { nextPage, filterWord } = getState().characters;

    dispatch({
      type: GET_CHARACTERS,
    });
    return client
      .query({
        query,
        variables: {
          page: nextPage,
          [radio]: filterWord,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: GET_CHARACTERS__SUCESS,
          payload: data.characters,
        });
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => {
          return error.message;
        });
        if (errors[0] === '404: Not Found') {
          dispatch({
            type: GET_CHARACTERS__NOTFOUND,
            payload: errors,
          });
        } else {
          console.log('error');

          dispatch({
            type: GET_CHARACTERS__ERROR,
            payload: errors,
          });
        }
      });
  };
}

export function updateFilterCharacters(filterWord) {
  return (dispatch, getState) => {
    if (filterWord.length > 3) {
      dispatch({
        type: UPDATE_FILTER,
        payload: filterWord,
      });
    } else {
      dispatch({
        type: UPDATE_FILTER,
        payload: '',
      });
    }
    getCharactersAction()(dispatch, getState);
  };
}

export function loadMoreCharactersAction() {
  return (dispatch, getState) => {
    const { nextPage, totalPages } = getState().characters;
    if (nextPage !== totalPages) {
      dispatch({
        type: UPDATE_CURRENTPAGE,
        payload: nextPage + 1,
      });
      getCharactersAction()(dispatch, getState);
    }
  };
}

export function radioHandlerCharAction(radio) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CHARFIELD,
      payload: radio,
    });
    getCharactersAction()(dispatch, getState);
  };
}

export function getCharacterAction(id) {
  return (dispatch, getState) => {
    let query = gql`
        query($id:ID!) {
            character(id: $id) {
             id
             name
             type
             species
             gender
             image
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
          type: SHOW_MODALINFO,
          payload: data.character,
        });
      })
      .catch((error) => console.log(error.message));
  };
}

export function eraseModalInfo() {
  return (dispatch, getState) => {
    dispatch({
      type: ERASE_MODALINFO,
    });
  };
}
