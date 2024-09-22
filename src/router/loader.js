import { redirect } from "react-router-dom"
import { getLocalstorage } from "../utils/localstorage"

export const rootLoader = () => {
  if (!getLocalstorage('Gxphuhoa-user'))
    return redirect('/login');

  return null;
}

export const loginLoader = () => {
  if (getLocalstorage('Gxphuhoa-user'))
    return redirect('/');

  return null;
}