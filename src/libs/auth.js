import data from './dummyEmployee';
import axios from 'axios';

// mock login and logout
export function login(email, password) {
  // add cookie
  //   document.cookie = `swr-test-token=${email};`;

  const user = data.find(d => d.email === email);
  if (user && user.password === password) {
    
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    return true;
  } else return false;
}
export function logout() {
  // delete cookie
  //   document.cookie = "swr-test-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("email");
}

export function requireLogin(to, from, next) {
  if (to.meta.read) {
    next();
  }else{
    next.redirect('/app/employee/allemployees');
  }
}