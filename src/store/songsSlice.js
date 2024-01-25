import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TrackList } from '../assets/tracksList';
const audio = new Audio()


export const handleUploadSongs = createAsyncThunk(
  'songs/handleUploadSongs',
  async function(_,{rejectWithValue,dispatch}){
    try {
      const response = await fetch('API')
      
      if(!response.ok){
        throw new Error('Can`t add song')
      }

      setTimeout(() => {
        dispatch(addSongs())
      }, 2000);
      
    } catch (error) {
        return rejectWithValue(error.message)
    }
  }
)

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    TrackList,
    currentSong:TrackList[0],
    isPlaying:false,
    selectedFile:'',
    status:null,
    error:null
},
  reducers: {
     handleToggleAudio:(state,action)=>{
        if(state.currentSong.id !==action.payload.id || audio.currentTime === 0){
          state.currentSong = action.payload
          state.isPlaying = true
          audio.src = action.payload.src
          audio.currentTime = 0
          audio.play()
          return
        }
    
        if(state.isPlaying){
          audio.pause()
          state.isPlaying = false
        }else{
          state.isPlaying = true
          audio.play()
        }
      },

     handleFileChange: (state,action) => {
        state.selectedFile = action.payload
      },

      handleSearch:(state,action) => {
        state.TrackList = TrackList.filter(e=>
          e.title.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
           || e.artists.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()))
      },

    addSongs:(state)=>{
      console.log(state.selectedFile.split('').find(e=>e==='-'));
      state.TrackList.push({
        id:state.TrackList.length+1,
        artists:state.selectedFile,
      })
      state.selectedFile = null
      state.status = 'resolved'
    },
  },

  extraReducers:(builder)=>{
    builder
    .addCase(handleUploadSongs.pending,(state)=>{
      // Simulate upload process with a timeout
      console.log(`Uploading ${state.selectedFile}...`);

      state.status = 'loading';
      state.error = null
    })
    .addCase(handleUploadSongs.fulfilled,(state,action)=>{
      let name = state.selectedFile
      setTimeout(() => {
        // Update state or handle the successful upload
        console.log(`${name} uploaded successfully!`);
      }, 2000);

    })
    .addCase(handleUploadSongs.rejected,(state,action)=>{
      state.status = 'rejected'
      state.error = action.payload
    })
  }
});

export const { addSongs,handleToggleAudio,handleFileChange,handleSearch } = songsSlice.actions;
export default songsSlice.reducer;
