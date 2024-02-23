import AssignedPet from "../../components/Sitter/AssignedPet"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"

const SITTER_PETS = [
  {
    id: "1",
    name: "Kitty",
    categories: [{id: "1", value: "food",type: "food", limit: 15}, {id: "2", value: "toy", type: "toy", limit: 3}]
  },
  {
    id: "2",
    name: "Max",
    categories: [{id: "3", value: "food", type: "food", limit: 20}, {id: "4",
    value: "toy", type: "toy", limit: 5}]
  }
]

const AddExpenses = () => {
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
      <h2 className="text-center font-bold text-2xl mb-8">Add Expenses</h2>
      <ul className="flex flex-col gap-4">
        {SITTER_PETS.map(pet => 
          <AssignedPet key={pet.id} categories={pet.categories} name={pet.name} />
        )}
      </ul>
    </Fragment>
  )
}
export default AddExpenses