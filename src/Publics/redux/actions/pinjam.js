import axios from "axios";
import Url from "../../../support/url";

export const getPinjam = () => {
  return {
    type: "GET_PINJAM",
    payload: axios.get(Url + `pinjam`)
  };
};

export const postPinjam = (data) => {
  return {
    type: "POST_PINJAM",
    payload: axios.post(Url + `pinjam`, data)
  };
};

export const patchPinjam = (id_buku) => {
  return {
    type: "PATCH_PINJAM",
    payload: axios.patch(Url + `pinjam/${id_buku}`)
  }
}