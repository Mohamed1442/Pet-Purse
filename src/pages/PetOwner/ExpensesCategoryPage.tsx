import { Fragment, useEffect, useState } from "react";
import ExpenseCategory from "../../components/ExpensesCategory/ExpenseCategory";
import { useSelector } from "react-redux";
import { getOwnerCategories } from "../../apis/apis";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

type Category = {
  id: string;
  type: string;
  limit: number;
}

const ExpensesCategoryPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchOwnerUser = async () => {
      const categories = await getOwnerCategories()
      setCategories(categories)
    }
    if (currentUser.id) {
      if(currentUser.role !== 'owner') {
        navigate('/dashboard')
      }
      fetchOwnerUser()
    }
  }, [currentUser, navigate])

  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false)

  const [type, setType] = useState('')
  const [limit, setLimit] = useState('')

  const typeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value.trim()
    setType(type)

    if (!type || !limit) {
      setIsSubmittable(false)
    } else {
      setIsSubmittable(true)
    }
  }
  
  const limitChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = e.target.value.trim()
    setLimit(limit)

    if (!type || !limit) {
      setIsSubmittable(false)
    } else {
      setIsSubmittable(true)
    }
  }

  const addNewCategory = () => {
    const category = { id: new Date().getTime().toString() , limit: +limit, type }
    setCategories(prev => [...prev, category ])
    setIsSubmittable(false)
    setShowForm(false)
    setType('')
    setLimit('')
  }

  const showFormHandler = () => {
    setShowForm(true)
  }
  
  const cancelHandler = () => {
    setType('')
    setLimit('')
    setShowForm(false)
    setIsSubmittable(false)
  }

  return (
    <Fragment>
      <h2 className="text-center font-bold text-2xl mb-8">Pet Categories</h2>
      <ul className="flex flex-col gap-5 mb-6">
        {categories.map(category => <ExpenseCategory key={category.id} type={category.type} limit={category.limit} />)}
        {categories.length === 0 && <li className="text-center font-medium">No Categories Added Yet</li>}
      </ul>
      {showForm &&
        <div className="flex justify-between mb-6">
          <div className="flex gap-2 items-center">
            <label htmlFor="type">Type:</label>
            <input value={type} type="text" id="type" className="border-2 border-primary-400 rounded" onChange={typeChangeHandler} />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="limit">Limit:</label>
            <input value={limit} type="text" id="limit" className="border-2 border-primary-400 rounded" onChange={limitChangeHandler} />
          </div>
          <div className="flex gap-4">
            <button onClick={cancelHandler} className="text-lg bg-primary p-2 rounded text-grey">Cancel</button>
            <button onClick={addNewCategory} disabled={!isSubmittable} className={`text-lg bg-primary p-2 rounded text-grey ${!isSubmittable ? "bg-primaryShade" : ""}`}>Add Category</button>
          </div>
        </div>
      }
      {!showForm && 
        <button onClick={showFormHandler} className="bg-primary p-2 rounded text-white">Add New Category</button>
      }
    </Fragment>
  )
}
export default ExpensesCategoryPage