const initialState = {
    listBuku: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
};

export const buku = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BUKU_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_BUKU_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BUKU_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listBuku: action.payload.data.result
            }
        case 'GET_BOOK_ID_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'GET_BOOK_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'GET_BOOK_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listBuku: action.payload.data.result
            };
        case "POST_BUKU_PENDING":
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            };
        case "POST_BUKU_REJECTED":
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case "POST_BUKU_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listBuku: [state.listBuku, action.payload.data[0]]
            };
        case 'EDIT_BUKU_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'EDIT_BUKU_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'EDIT_BUKU_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: [state.listBuku, action.payload.data[0]]
            };
        case 'DELETE_BOOK_PENDING':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'DELETE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'DELETE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listBuku: action.payload.data.result
            };
        default:
            return state
    }
}