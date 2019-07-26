const initialState = {
  userLogin: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false
}

export const login = (state = initialState, action) => {
  switch (action.type) {
    case `LOGIN_USER_PENDING`:
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case `LOGIN_USER_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case `LOGIN_USER_FULFILLED`:
      // localStorage.setItem(
      //   `token`,
      //   `bearer ` + action.payload.data.result.token
      // )
      // localStorage.setItem(`id`, action.payload.data.result.id_user)
      // localStorage.setItem(`level`, action.payload.data.result.level_user)
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        userLogin: action.payload.data,
        token: action.payload.data
      }
    default:
      return state
  }
}
