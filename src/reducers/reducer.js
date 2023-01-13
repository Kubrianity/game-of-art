export default function reducer(draft, action) {
  switch(action.type) {
    case "startPlaying":
      draft.remainingTime = 59
      draft.points = 0
      draft.strikes = 0
      draft.isPlaying = true
      draft.currentQuestion = generateQuestion()
      return

    case "addToArtworksData":
      draft.artworksData = draft.artworksData.concat(action.value)
      return

    case "addToPicsCollection":
      draft.picsCollection = draft.picsCollection.concat(action.value)
      return

    case "checkAnswer":
      if(!draft.isPlaying) return
      if(action.value == draft.currentQuestion.answer) {
        draft.points++
        draft.currentQuestion = generateQuestion()
      }else {
        draft.strikes++
        if(draft.strikes >= 3) {
          draft.isPlaying = false
        }
      }
      return

    case "countDown":
      if(draft.remainingTime <= 0) {
        draft.isPlaying = false
      }else {
        draft.remainingTime--
      }
      return
  }
  function generateQuestion() {
    if (draft.currentQuestion) {
      draft.artworksData = draft.artworksData.slice(4, draft.artworksData.length)
      draft.picsCollection = draft.picsCollection.slice(4, draft.picsCollection.length)
    }
    const randomNumber = Math.floor(Math.random() * 4)
    const questionPics = draft.picsCollection.slice(0, 4)
    return { title: draft.artworksData[randomNumber].title, pictures: questionPics, answer: randomNumber }
  }
}
