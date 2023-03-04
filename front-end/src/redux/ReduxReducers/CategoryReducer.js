export const CategoryReducer = (state = [], action) => {
  switch (action.type) {
    case "Fetch_Categories":
      return action.payload;
    default:
      return state;
  }
};
