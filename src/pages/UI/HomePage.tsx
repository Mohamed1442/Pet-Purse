import homeImage from '../../assets/home-img.png'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../utils/firebaseConfig"
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
    })
  }, [])

  return (
    <div>
      <img src={homeImage} alt="home-img" className='w-full h-screen object-cover' />
      <div className='absolute top-2/4 left-10 w-9/12 text-center sm:text-left sm:w-2/6  -translate-y-1/2'>
        <h1 className='tracking-tight text-5xl mb-8 text-grey'>Your Pet <span className='text-primary'>Expense Tracker Companion</span></h1>
        <p className='text-xl mb-6 text-red'>Simplify pet expenses, set budgets, and stay organized. Your go-to app for stress-free pet finance management.</p>
        <div className='flex gap-6 items-center justify-center sm:justify-start'>
          <Link className='bg-primary text-white p-2 rounded' to='auth/sign-up'>Sign Up</Link>
          <Link className='bg-primary text-white p-2 rounded' to='auth/login'>Login</Link>
        </div>
      </div>
    </div>
  )
}
export default HomePage