import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getNeedToBeConfirmedExpenses } from "../../apis/apis"
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom"

const ExpensesConfirmationPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchOwnerUser = async () => {
      const expenses = await getNeedToBeConfirmedExpenses()
      setExpenses(expenses)
    }
    if (currentUser.id) {
      if(currentUser.role !== 'owner') {
        navigate('/dashboard')
      }
      fetchOwnerUser()
    }
  }, [currentUser, navigate])
  const [expenses, setExpenses] = useState<{sitterName: string, type: string, expense: string, id: string}[]>([])

  const confirmHandler = (expense: {id: string, sitterName: string, type: string, expense: string}) => {
    const filteredExpenses = expenses.filter(expenseItem => expenseItem.id !== expense.id)
    setExpenses(filteredExpenses)
  }

  return (
    <Fragment>
      <h2 className="text-center font-bold text-2xl mb-6">Pet Expenses</h2>
      <ul className="flex flex-col gap-4">
        {!expenses.length && <li className="text-center font-medium">No Expenses To be Confirmed</li>}
        {expenses.map(expense => (
          <li key={expense.id} className="flex flex-wrap gap-4 justify-between items-center border-2 p-3">
          <div className="flex gap-2">
              <span className="text-primary">Sitter Name:</span>
              <span className="font-medium">{expense.sitterName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">Type:</span>
              <span className="font-medium">{expense.type}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">Expense:</span>
              <span className="font-medium">${expense.expense}</span>
            </div>
            <button onClick={confirmHandler.bind(null, expense)} className="bg-primary text-secondary p-2 rounded">Confirm</button>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
export default ExpensesConfirmationPage