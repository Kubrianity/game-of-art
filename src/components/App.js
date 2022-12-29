import '../App.css'
import Header from "./Header"
import Footer from "./Footer"
import {useEffect, useRef} from "react"
import { useImmerReducer } from "use-immer"
import reducer from '../reducers/reducer'
import Button from "./Button"
import Picture from './Picture'
import Title from './Title'
import Timer from './Timer'
import Icon from './Icon'
import Result from './Result'

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
  const timer = useRef(null)

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

  useEffect(() => {
    if(state.isPlaying) {
      timer.current = setInterval(() => {
        dispatch({ type: "countDown"})
      }, 1000)
      return () => {
        clearInterval(timer.current)
      }
    }
  }, [state.isPlaying])
  
  // Preload images
  useEffect(() => {
    if(state.picsCollection.length) {
      state.picsCollection.slice(0, 8).forEach(pic => {
        new Image().src = pic
      })
    }
  }, [state.picsCollection])

  return (
    <div className="App">
      <Header />
      {state.currentQuestion && 
      ( // Renders title and pictures
       <div className = "container">
          <Timer remainingTime = {state.remainingTime} />
          {[...Array(3 - state.strikes)].map((item, index) => ( // Renders icons based on counts of strikes
            <Icon key = {index} className = "text-warning" />
          ))}
          {[...Array(state.strikes)].map((item, index) => (
            <Icon key = {index} className = "text-secondary" />
          ))}
          <Title title = {state.currentQuestion.title} />
          <div className = "row">
          {state.currentQuestion.pictures.map((picture, index) => (
              <Picture key = {index}
              style = {{backgroundImage: `url(${picture})`}}
              handleClick = {() => dispatch({ type: "checkAnswer", value: index })}/>
            )
          )}
          </div>
        </div>
      )}
      {!state.isPlaying && Boolean(state.picsCollection.length) && !state.currentQuestion && 
      ( // Renders button
        <Button handleClick = {() => dispatch({ type: "startPlaying" })}/>
      )}
      {(state.remainingTime <= 0 || state.strikes >= 3) && state.currentQuestion && (
        <Result 
          resultText = {(state.remainingTime <= 0 && 'Time is over') || (state.strikes >= 3 && 'You failed 3 times!')}
          score = {state.points}
          handleClick = {() => dispatch({ type: "startPlaying" })}
          />
      )}
      <Footer />
    </div>
  );
}

export default App;
