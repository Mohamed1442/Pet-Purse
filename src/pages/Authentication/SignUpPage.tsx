import { Form, redirect, Link, useNavigate } from "react-router-dom"
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {  FirebaseError } from "firebase/app";
import { auth } from '../../utils/firebaseConfig'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";

const SignUpPage = () => {
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
        <h2 className="text-center text-3xl mb-4">Sign Up</h2>
          <div className="flex flex-col mb-4">
            <label className="mb-2" htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col mb-8">
            <label className="mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
           <div>
              <p className="mb-2">You are:</p>
              <div className="flex algin-center">
                <input type="radio" name="role" id="owner" value="owner" />
                <label className="ml-1" htmlFor="owner">Owner</label>
              </div>
              <div className="flex algin-center">
                <input type="radio" name="role" id="sitter" value="sitter" />
                <label className="ml-1" htmlFor="sitter">Sitter</label>
              </div>
            </div>
          <div className="flex justify-center mb-4">
            <button className="bg-primary text-secondary p-2 rounded" type="submit">Sign Up</button>
          </div>
          <div className="flex justify-center">
            <p>Already have account? <Link className="text-primary" to="/auth/login">Login</Link></p>
          </div>
        </Form>
      </div>
  )
}

export default SignUpPage

export const action = async ({request}: {request: Request}) => {
  const formData = await request.formData();

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string
  console.log(name)

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: role });
    // save user in mock db
    return redirect('/auth/login')
  } catch (error) {
    const errorCode = (error as FirebaseError).code;
    const errorMessage = (error as FirebaseError).message;
    console.error("Signup error:", errorCode, errorMessage);
  }
}