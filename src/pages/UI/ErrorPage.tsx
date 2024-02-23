import { Link } from 'react-router-dom'
import notFound from '../../assets/404.svg'

import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError();
  let title: string

  if (isRouteErrorResponse(error)) {
    title = error.statusText;
  } else {
    title = "Something Went Wrong"
  }
  console.error(error);
  return (
    <div className='container flex flex-col h-screen mx-auto items-center justify-center gap-10'>
      <img src={notFound} alt="404" className='w-4/12' />
      <h2 className="text-4xl text-primary">{title}</h2>
      <Link className='bg-primary text-white p-2 rounded' to='/dashboard'>Go to Home</Link>
    </div>
  )
}

export default ErrorPage
