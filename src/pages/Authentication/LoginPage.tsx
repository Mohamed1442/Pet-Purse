import { Form, redirect, Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from '../../utils/firebaseConfig'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";

const LoginPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser.id) { // user is logged in
      navigate('/dashboard')
    }
  }, [navigate, currentUser])

  return (
    <div className="w-full h-screen flex align-center justify-center text-grey flex-col w-1/2 lg:w-1/4 mx-auto p-10">
        <Form method='post' className="bg-secondary p-5 shadow rounded">
        <h2 className="text-center text-3xl mb-4">Login</h2>
          <div className="flex flex-col mb-4">
            <label className="mb-2" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col mb-8">
            <label className="mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-primary text-secondary p-2 rounded" type="submit">Login</button>
          </div>
          <div className="flex justify-center">
            <p>Doesn't have account? <Link className="text-primary" to="/auth/sign-up">Sign Up</Link></p>
          </div>
        </Form>
      </div>
  )
}

export default LoginPage

export const action = async ({request}: {request: Request}) => {
  const formData = await request.formData();

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect('/dashboard')
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    } else {
      console.error("Unexpected error during login:", error);
    }
  }
}

export const checkAuthentication = () => {
  const token = localStorage.getItem('token')

  if(!token) {
    return redirect('/auth/login')
  }
  return null
}