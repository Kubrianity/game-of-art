export default function reducer(draft, action) {
  switch(action.type) {
    case "addToPicsCollection":
      draft.picsCollection.push(action.value)
      return
  }
}