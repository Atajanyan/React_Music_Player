
import { Provider } from 'react-redux';
import store from './store'
import SongList from './components/SongList';
import MusicUploadForm from './components/MusicUploadForm';
import './App.css';

function App() {

  return (
    <Provider store={store}>
    <div className='container'>
      <SongList/>
      <MusicUploadForm
      />
    </div>
    </Provider>
  );
}

export default App;
