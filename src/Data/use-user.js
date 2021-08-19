import useSWR from "swr";

import userFetcher, { getAllEmployees } from "../libs/api-user";

export default function useUser() {
  // const { data, mutate, error } = useSWR(
  //   ["/employees", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpamF5LmFAZ21haWwuY29tIiwiaWF0IjoxNjI5MDQ1NDI2LCJleHAiOjE2MjkxMzE4MjYsInN1YiI6IjEifQ.rJoet2axZgdqYLuTFeKxcKOuqmjP370d4vdv2rHEPTw"], 
  //   getAllEmployees
  // );
  
  // if (error) console.log('err: ', error);

  // console.log(data);
//   console.log(userFetcher());
  return userFetcher();
//   console.log(`use-user: ${data}`);

// return data
//   const loading = !data && !error;
//   const loggedOut = error && error.status === 403;

//   return {
//     loading,
//     loggedOut,
//     user: data,
//     mutate
//   };
}
