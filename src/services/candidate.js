import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;


export function getCandidateDetails() {
  return axios.get(
    `${baseURL}/api/?results=10&inc=gender,name,nat,login,id`
  );
}