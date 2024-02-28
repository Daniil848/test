import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: any;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RickAndMortyState {
  character: Character | null;
  characters: Character[];
  loading: boolean;
  error: boolean;
}

const initialState: RickAndMortyState = {
  character: null,
  characters: [],
  loading: false,
  error: false,
};

export const getAllCharacters = createAsyncThunk<
  Character[],
  void,
  { rejectValue: string }
>('store/getAllCharacters', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character`,
    );
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(getSingleCharacter.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.character = action.payload;
      });
  },
});

export default rickAndMortySlice.reducer;
