import axios from "axios";
import Url from "../../../support/url";

export const getBuku = () => {
  return {
    type: "GET_BUKU",
    payload: axios.get(Url + `book`)
  };
};

export const getBukuId = (id_buku) => {
  return {
    type: "GET_BOOK_ID",
    payload: axios.get(Url + `book/${id_buku}`)
  };
};

export const postBuku = (data) => {
  return {
    type: "POST_BUKU",
    payload: axios.post(Url + `book`, data)
  };
};

export const editBuku = (data, id_buku) => {
  return {
    type: "EDIT_BUKU",
    payload: axios.patch(Url + `book/${id_buku}`, data)
  };
};

export const deleteBook = (id_buku) => {
  return {
    type: "DELETE_BOOK",
    payload: axios.delete(Url + `book/${id_buku}`)
  }
}