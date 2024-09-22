import { redirect } from "react-router-dom"
import { getLocalstorage, removeLocalstorage } from "../utils/localstorage"
import axios from "axios";
import { store } from "../store";

export const rootLoader = async () => {
  // NOT EXIST USER
  if (!getLocalstorage('Gxphuhoa-user'))
    return redirect('/login');

  // USER AUTHENTICATOR
  const { root: { userAuthor } } = store.getState();

  if (userAuthor) return null;

  try {
    const { ID } = getLocalstorage('Gxphuhoa-user');
    const params = { ID };
    const url = process.env.REACT_APP_LOGIN_API + '/gallery-author-user';
    const response = await axios.post(url, params);

    if (response.success) return null;
  } catch (error) {
    removeLocalstorage('Gxphuhoa-user');
    return redirect('/login');
  }

  return null;
}

export const loginLoader = () => {
  if (getLocalstorage('Gxphuhoa-user'))
    return redirect('/');

  return null;
}