import axios from 'axios';

import data from './dummyEmployee'

// mock the user api
export default () => {
  // sleep 500
//   await new Promise((res) => setTimeout(res, 500));

  if (localStorage.getItem("email")) {
    // authorized
    // console.log(data.find(d => d.email === localStorage.getItem("email")))
    return data.find(d => d.email === localStorage.getItem("email"));
  } 
  return null

  // not authorized
  const error = new Error("Not authorized!");
  error.status = 403;
  throw error;
};

export const getAllEmployees = (url, token) => {
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res);
}