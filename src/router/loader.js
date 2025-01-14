import { redirect } from "react-router-dom"
import { getLocalstorage, removeLocalstorage } from "../utils/localstorage"
import axios from "axios";
import { store } from "../store";

export const rootLoader = async () => {
  // NOT EXIST USER
  if (!getLocalstorage('Gxphuhoa-user'))
    return redirect('/login');

  // USER AUTHORIZATION
  const { root: { userAuthen } } = store.getState();

  if (userAuthen) return null;

  try {
    const { userID } = getLocalstorage('Gxphuhoa-user');
    const params = { ID: userID };
    const url = process.env.REACT_APP_LOGIN_API + '/gallery-author-user';
    const response = await axios.post(url, params);

    if (response.success) return null;
  } catch (error) {
    removeLocalstorage('Gxphuhoa-user');
    return redirect('/login');
  }

  // EVERYTHING IS OK
  return null;
}

export const loginLoader = () => {
  // EXIST USER -> NOT NEED LOGIN
  if (getLocalstorage('Gxphuhoa-user'))
    return redirect('/');

  // EVERYTHING IS OK
  return null;
}