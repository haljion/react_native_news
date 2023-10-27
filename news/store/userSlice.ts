import { createSlice } from '@reduxjs/toolkit'
import { Article } from '../types/article'

const initialState: { clips: Article[] } = {
  clips: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducer
  reducers: {
    addClip: (state, action) => {
      const newClip: Article = action.payload
      state.clips.push(newClip)
    },
    deleteClip: (state, action) => {
      const deletingClip: Article = action.payload
      const filteredClips = state.clips.filter((clip) => clip.url !== deletingClip.url)
      state.clips = filteredClips
    },
  },
})

// Action creators are generated for each case reducer function
export const { addClip, deleteClip } = userSlice.actions

export default userSlice.reducer
