import React from 'react';
import playAudio from '../assets/playAudio.png'
import pauseAudio from '../assets/pauseAudio.png'
import {useSelector,useDispatch} from 'react-redux'
import { handleToggleAudio } from '../store/songsSlice';

function SongRow({ song }) {
    const {currentSong,isPlaying} = useSelector(state=>state.songs)
    const isCurrentSong = currentSong.id === song.id

    const dispatch = useDispatch()
  return (
    <div className='song' onClick={()=>dispatch(handleToggleAudio(song))}>
       <div className='songImages'>
        <img src={song.preview} alt="img" />
        <img src={isCurrentSong && isPlaying ? pauseAudio: playAudio} alt="img" />
       </div>
        <b>{song.title}</b>
        <p>{song.artists}</p>
        <p>{song.id}</p>
    </div>
  );
}

export default SongRow;
