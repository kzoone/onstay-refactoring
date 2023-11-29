import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, option)
} 

export const getCookie = (name) => {
  let result;
  try {
    result = cookies.get(name)
  } catch(error) {
    result = null
  }
  return result
}

export const removeCookie = (name) => {
  cookies.remove(name)
}