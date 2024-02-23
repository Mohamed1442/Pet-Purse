import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"

const ExpensesSitterPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate() 
  useEffect(() => {
    if(currentUser.id) {
      if(currentUser.role !== 'sitter') {
        navigate('/dashboard')
      }
    }
  }, [currentUser, navigate])

  return (
    <Fragment>
      <h2 className="text-center font-bold text-2xl mb-6">Pet Expenses</h2>
      <ul>
        <li className="flex flex-wrap gap-4 justify-between items-center border-2 p-3">
          <div className="flex gap-2">
            <span className="text-primary">Pet Name:</span>
            <span className="font-medium">Posy</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Expense:</span>
            <span className="font-medium">$12</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Date:</span>
            <span className="font-medium">12-12-2012</span>
          </div>
        </li>
      </ul>
    </Fragment>
  )
}
export default ExpensesSitterPage