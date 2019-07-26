const initialState = {
    listUser: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
  };
  
  export const user = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USER_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_USER_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_USER_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          listUser: action.payload.data.result
        };
      case "DELETE_USER_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "DELETE_USER_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "DELETE_USER_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          listUser: action.payload.data.result
        };
        case "POST_USER_PENDING":
          return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false
          };
        case "POST_USER_REJECTED":
          return {
            ...state,
            isLoading: false,
            isRejected: true
          };
        case "POST_USER_FULFILLED":
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listUser: action.payload.data.result
          };
          case "REGISTER_USER_PENDING":
          return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false
          };
        case "REGISTER_USER_REJECTED":
          return {
            ...state,
            isLoading: false,
            isRejected: true
          };
        case "REGISTER_USER_FULFILLED":
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listUser: action.payload.data.result
          };
      default:
        return state;
    }
  };
