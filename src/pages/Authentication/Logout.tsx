import { signOut } from "firebase/auth";
import { auth } from '../../utils/firebaseConfig'
import { redirect } from "react-router-dom";

export const action = async () => {
  await signOut(auth)
  localStorage.removeItem('token')
  return redirect('/')
}