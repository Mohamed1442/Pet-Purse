import { useState } from "react";

type Category =  {
  type: string;
  limit: number
}

const AssignedPet: React.FC<{name: string, categories: Category[]}> = ({name, categories}) => {
  const [selectedLimit, setSelectedLimit] = useState(categories[0]?.limit)
  const [expense, setExpense] = useState(0)
  const [isBeyondLimit, setIsBeyondLimit] = useState(false)

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const limit = categories.find(category => category.type === value)?.limit
    if (limit) {
      setSelectedLimit(limit)
    }
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setExpense(value)

    if (value > selectedLimit) {
      setIsBeyondLimit(true)
    } else {
      setIsBeyondLimit(false)
    }
  }

  return (
    <li className="flex flex-wrap gap-2 flex-row md:flex-col justify-between border-2 p-6 self-stretch rounded-lg md:gap-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="text-primary">Pet Name:</span>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-primary">Category:</span>
            <select onChange={selectHandler} title="select role" className="font-medium">
              {categories.map(category => <option value={`${category.type.trim().toLowerCase()}`}>{category.type}</option>)}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-primary">Limit:</span>
            <span className="font-medium">{selectedLimit}</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label htmlFor="expense" className="text-primary">Expense:</label>
            <input value={expense || ''} type="text" id="expense" className="border-2 border-primary-400 rounded" onChange={inputChangeHandler} />
          </div>
          <button className="bg-primary text-secondary p-2 rounded w-1/5">{isBeyondLimit ? 'Request Owner' : 'Add'}</button>
        </div>
        </li>
  )
}
export default AssignedPet