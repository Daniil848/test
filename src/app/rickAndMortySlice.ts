import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Character,
  CharactersPageData,
  Filters,
  RickAndMortyState,
} from './types';

const initialState: RickAndMortyState = {
  character: null,
  characters: [],
  info: {
    count: null,
    pages: null,
    next: '',
    prev: '',
  },
  countPage: 1,
  loading: false,
  error: false,
};

export const getCharactersFirstPage = createAsyncThunk<
  CharactersPageData,
  void,
  { rejectValue: string }
>('store/getCharactersFirstPage', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character`,
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getCharactersPaginate = createAsyncThunk<
  CharactersPageData,
  string,
  { rejectValue: string }
>('store/getCharactersPaginate', async (url, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(url);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const filterCharacters = createAsyncThunk<
  CharactersPageData,
  Filters,
  { rejectValue: string }
>('store/filterCharacters', async (filters, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${filters.name}&gender=${filters.gender}&status=${filters.status}`,
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getSingleCharacter = createAsyncThunk<
  Character,
  number,
  { rejectValue: string }
>('store/getSingleCharacter', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const rickAndMortySlice = createSlice({
  name: 'rickAndMorty',
  initialState,
  reducers: {
    setNextPage(state) {
      state.countPage++;
    },
    setPrevPage(state) {
      state.countPage--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersFirstPage.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCharactersFirstPage.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.characters = action.payload.results;
      })
      .addCase(getCharactersPaginate.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCharactersPaginate.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.characters = action.payload.results;
      })
      .addCase(getSingleCharacter.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.character = action.payload;
      })
      .addCase(filterCharacters.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(filterCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.characters = action.payload.results;
        state.countPage === 1;
      });
  },
});

export const { setPrevPage, setNextPage } = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
