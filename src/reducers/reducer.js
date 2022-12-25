export default function reducer(draft, action) {
  switch(action.type) {
    case "startPlaying":
      draft.remainingTime = 30
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
      if(action.value == draft.currentQuestion.answer) {
        draft.points++
        draft.currentQuestion = generateQuestion()
      }else {
        draft.strikes++
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