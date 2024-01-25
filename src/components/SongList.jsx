import SongRow from './SongRow';
import { useDispatch, useSelector } from 'react-redux';
import loading from '../assets/loading.gif'
import PlayAllButton from './PlayAllButton';
import AddAllButton from './AddAllButton';
import { handleSearch } from '../store/songsSlice';

function SongList() {
  const songs = useSelector(state => state.songs.TrackList)
  let dispatch = useDispatch()
  const {status,error} = useSelector(state => state.songs)

  return (
    <div>
      <h2 className='Songs'>Song List</h2>
      <div className='songList'>
        <div className='bar'>
          <div>
           <PlayAllButton/>
           <AddAllButton/>
          </div>
          <div>
            <button>Track Nu...</button>
            <input
              type="text" 
              className='search'
              placeholder='filter' 
              onChange={e=>{dispatch(handleSearch(e.target.value))}}
              />
          </div>
        </div>
        <div className='titles'>
          <span></span>
          <b>Song Name</b>
          <b>Artist Name</b>
          <b>Track</b>
        </div>
        {songs.map((song) => (
          <SongRow key={song.id} song={song}/>
          ))}
      </div>
          
    </div>
  );
}

export default SongList;
