import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"

const ConfirmationStatusPage = () => {
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
      <section className="pb-8 mb-4 border-b-2">
        <h2 className="text-center font-bold text-2xl mb-6">Confirmation Status</h2>
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
            <div className="flex gap-2">
              <span className="text-pending font-medium">Pending</span>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="font-medium text-2xl mb-4">History</h2>
        <ul className="flex flex-col gap-4">
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
            <div className="flex gap-2">
              <span className="text-success font-medium">Accepted</span>
            </div>
          </li>
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
            <div className="flex gap-2">
              <span className="text-error font-medium">Refused</span>
            </div>
          </li>
        </ul>
      </section>
    </Fragment>
  )
}
export default ConfirmationStatusPage