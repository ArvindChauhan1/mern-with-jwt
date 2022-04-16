import { http } from "../remote";

let user = null;

export async function getUser() {
  if (user !== null) {
    return user;
  }
  try {
    const response = await http.get("/user/self");
    return (user = response.data);
  } catch (_) {
    return null;
  }
}

export function clearUser() {
  user = null;
}