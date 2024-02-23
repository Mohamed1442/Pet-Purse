import { useDispatch, useSelector } from "react-redux"
import { NavLink, Outlet, Form } from "react-router-dom"
import { RootState } from "../../store"
import { Fragment } from "react"
import { authActions } from "../../store/auth"

const DashboardLayoutPage = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const logoutHandler = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className="h-screen overflow-hidden">
      <nav className="bg-primary p-6 flex justify-between h-1/12 md:h-1/6 items-center text-xl text-grey">
        <span className="font-medium">{currentUser.name}</span>
        <span className="font-bold">{(currentUser.role[0]?.toUpperCase() || '') + currentUser.role?.slice(1)} Dashboard</span>
        <Form action='/logout' method="post">
          <button onClick={logoutHandler} className="bg-grey text-lg text-secondary p-2 rounded">Logout</button>
        </Form>
      </nav>
      <div className="flex md:h-5/6 flex-col md:flex-row">
        <ul className="bg-secondary text-xl flex gap-2 flex-wrap justify-center p-4 md:p-8 md:flex-col md:flex-nowrap md:justify-start">
          {currentUser.role === 'owner' && 
            <Fragment>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="pets">Pets</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="expenses-categories">Expenses Categories</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="assign-sitter">Assign Sitter</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="expenses">Expenses</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="confirm-expense">Confirm Expenses</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="all-invoices">Invoices</NavLink></li>
            </Fragment>
          }
          {currentUser.role === 'sitter' && 
            <Fragment>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="add-expense">Add Expense</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="all-expenses">All Expenses</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="pet-care-contribution">Pet Care Contribution</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="confirm-status">Confirm Status</NavLink></li>
            </Fragment>
          }
          {currentUser.role === 'vet' && 
            <Fragment>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="submit-invoice">Submit Invoice</NavLink></li>
              <li className="mb-6 font-medium"><NavLink end className={({ isActive }) => isActive ? "text-primary" : ""} to="track-invoices">Track Invoices</NavLink></li>
            </Fragment>
          }
        </ul>
        <div className="bg-white text-grey grow p-6 text-xl overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default DashboardLayoutPage