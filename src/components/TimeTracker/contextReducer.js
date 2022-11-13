const contextReducer = (state, action) => {
    let inputs;
  
    switch (action.type) {
      case 'DELETE_INPUT':
        inputs = state.filter((input) => input.id !== action.payload);
  
        localStorage.setItem('inputs', JSON.stringify(inputs));
  
        return inputs;
      case 'ADD_INPUT':
        inputs = [action.payload, ...state];
  
        localStorage.setItem('inputs', JSON.stringify(inputs));
  
        return inputs;
      case "UPDATE_INPUT":
          return state.map((input) =>
            input.id === action.payload.id ? action.payload : input
          );
      default:
        return state;
    }
  };
  
  export default contextReducer;