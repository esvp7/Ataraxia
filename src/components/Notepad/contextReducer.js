const contextReducer = (state, action) => {
  let notes;
  
  switch (action.type) {
    case 'DELETE_NOTE':
      notes = state.filter((note) => note.id !== action.payload);

      localStorage.setItem('notes', JSON.stringify(notes));

      return notes;
    case 'ADD_NOTE':
      notes = [action.payload, ...state];

      localStorage.setItem('notes', JSON.stringify(notes));

      return notes;
      case "UPDATE_NOTE":
          return state.map((note) =>
            note.id === action.payload.id ? action.payload : note
          );
      default:
        return state;
    }
  };
  
  export default contextReducer;