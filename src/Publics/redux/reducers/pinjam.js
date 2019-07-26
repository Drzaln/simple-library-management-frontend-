const initialState = {
    listPinjam: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
  };
  
  export const pinjam = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PINJAM_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_PINJAM_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "GET_PINJAM_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          listPinjam: action.payload.data.result
        };
      case "PATCH_PINJAM_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "PATCH_PINJAM_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "PATCH_PINJAM_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          listPinjam: action.payload.data.result
        };
        case "POST_PINJAM_PENDING":
          return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false
          };
        case "POST_PINJAM_REJECTED":
          return {
            ...state,
            isLoading: false,
            isRejected: true
          };
        case "POST_PINJAM_FULFILLED":
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listPinjam: action.payload.data.result
          };
      default:
        return state;
    }
  };
