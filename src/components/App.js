import '../App.css';
import Header from "./Header";
import Footer from "./Footer";
import {useEffect} from "react"

function App() {
  useEffect(() => {
    const url = 'https://api.artic.edu/api/v1/artworks?limit=100'

    async function fetchPics() {
      const response = await fetch(url)
      const artworks_data = await response.json()
      const pics_url = artworks_data.data.map(artwork => `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`)
      console.log(pics_url)
    }
    fetchPics()
  }, [])

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
