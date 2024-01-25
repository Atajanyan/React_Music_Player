import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { handleFileChange,handleUploadSongs } from '../store/songsSlice';

function MusicUploadForm() {
  const {selectedFile} = useSelector(state=>state.songs)
  const dispatch = useDispatch()
  const [value,setValue] = useState(selectedFile)

  const fileChange = (e) => {
    const file = e.target.files[0];
    setValue(e.target.value)
    dispatch(handleFileChange(file?.name))
  };

  return (
    <div>
      <h2>Music Upload Form</h2>
      <input type="file" value={value} accept=".mp3, .wav" onChange={fileChange} />
      <p>Selected File: {selectedFile ? selectedFile : 'None'}</p>
      <button onClick={()=>{
        dispatch(handleUploadSongs())
        setValue('')}}
       disabled={!selectedFile}
       className='uploadButton'
       >
        Upload
      </button>
    </div>
  );
}

export default MusicUploadForm;
