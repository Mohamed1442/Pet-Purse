import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { getOwnerExpenses } from "../../apis/apis"
import { useNavigate } from "react-router-dom"

const ExpensesPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOwnerUser = async () => {
      const expenses = await getOwnerExpenses()
      setExpenses(expenses)
    }
    if (currentUser.id) {
      if(currentUser.role !== 'owner') {
        navigate('/dashboard')
      }
      fetchOwnerUser()
    }
  }, [currentUser, navigate])

  const [expenses, setExpenses] = useState<{type: string, date: string, expense: string}[]>([])

  return (
    <Fragment>
      <h2 className="text-center font-bold text-2xl mb-6">Pet Expenses</h2>
      <ul className="flex flex-col gap-4">
        {expenses.map(expense => (
          <li className="flex flex-wrap gap-4 justify-between items-center border-2 p-3">
          <div className="flex gap-2">
            <span className="text-primary">Type:</span>
            <span className="font-medium">{expense.type}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Expense:</span>
            <span className="font-medium">${expense.expense}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Date:</span>
            <span className="font-medium">{expense.date}</span>
          </div>
        </li>
        ))}
      </ul>
    </Fragment>
  )
}
export default ExpensesPage