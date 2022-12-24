import '../App.css';
import Header from "./Header";
import Footer from "./Footer";
import {useEffect} from "react"
import { useImmerReducer } from "use-immer"
import reducer from '../reducers/reducer';

const initialState = {
  isPlaying: false,
  points: 0,
  strikes: 0,
  score: 0,
  remainingTime: 0,
  currentQuestion: null,
  artworksData: [],
  picsCollection: [],
  fetchCount: 0
}

function App() {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    const reqController = new AbortController()
    const url = 'https://api.artic.edu/api/v1/artworks?limit=100'

    async function fetchPics() {
      try {
        const response = await fetch(url, { signal: reqController.signal })
        const artworks_data = await response.json()
        dispatch({ type: "addToArtworksData", value: artworks_data.data })
        const pics_url = artworks_data.data.map(artwork => `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`)
        dispatch({ type: "addToPicsCollection", value: pics_url })
      }
      catch {
        console.log("Request cancelled")
      }  
    }
    fetchPics()
    return() => {
      reqController.abort()
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
