import { Fragment, useEffect, useState } from "react"
import Pet from "../../components/PetsOwner/Pet"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import React from "react"
import { getOwnerPets } from "../../apis/apis"
import { useNavigate } from "react-router-dom"

type Pet = {
  id: string;
  name: string
  age: number
  type: string
}

const PetsPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOwnerUser = async () => {
      const pets = await getOwnerPets()
      setPets(pets)
    }
    if (currentUser.id) {
      if(currentUser.role !== 'owner') {
        navigate('/dashboard')
      }
      fetchOwnerUser()
    }
  }, [currentUser, navigate])

  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [type, setType] = useState('')

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim()
    setName(name)

    if (!name || !age || !type) {
      setIsSubmittable(false)
    } else {
      setIsSubmittable(true)
    }
  }

  const ageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = e.target.value.trim()
    setAge(age)

    if (!name || !age || !type) {
      setIsSubmittable(false)
    } else {
      setIsSubmittable(true)
    }
  }
  
  const typeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value.trim()
    setType(type)

    if (!name || !age || !type) {
      setIsSubmittable(false)
    } else {
      setIsSubmittable(true)
    }
  }

  const addNewPet = () => {
    const pet = { id: new Date().getTime().toString() ,name, age: +age, type }
    setPets(prev => [...prev, pet ])
    setIsSubmittable(false)
    setShowForm(false)
    setName('')
    setAge('')
    setType('')
  }

  const showFormHandler = () => {
    setShowForm(true)
  }
  
  const cancelHandler = () => {
    setName('')
    setAge('')
    setType('')
    setShowForm(false)
    setIsSubmittable(false)
  }

  return (
    <Fragment>
      <h2 className="text-center font-bold text-2xl mb-8">My Pets</h2>
      <ul className="flex flex-col gap-5 mb-6">
        {pets.length === 0 && <li className="text-center font-medium">No Pets Added Yet</li>}
        {pets.map(pet => <Pet key={pet.id} name={pet.name} age={pet.age} type={pet.type} />)}
      </ul>
      {showForm &&
        <div className="flex flex-wrap justify-center gap-4 md:justify-between mb-6">
          <div className="flex flex-col md:flex-row items-start gap-2 md:items-center">
            <label htmlFor="name">Name</label>
            <input value={name} type="text" id="name" className="border-2 border-primary-400 rounded" onChange={nameChangeHandler} />
          </div>
          <div className="flex flex-col md:flex-row items-start gap-2 md:items-center">
            <label htmlFor="age">Age</label>
            <input value={age} type="text" id="age" className="border-2 border-primary-400 rounded" onChange={ageChangeHandler} />
          </div>
          <div className="flex flex-col md:flex-row items-start gap-2 md:items-center">
            <label htmlFor="type">Type</label>
            <input value={type} type="text" id="type" className="border-2 border-primary-400 rounded" onChange={typeChangeHandler} />
          </div>
          <div className="flex gap-4">
            <button onClick={cancelHandler} className="text-lg bg-primary p-2 rounded text-grey">Cancel</button>
            <button onClick={addNewPet} disabled={!isSubmittable} className={`text-lg bg-primary p-2 rounded text-grey ${!isSubmittable ? "bg-primaryShade" : ""}`}>Add Pet</button>
          </div>
        </div>
      }
      {!showForm && 
        <button onClick={showFormHandler} className="bg-primary p-2 rounded text-white">Add New Pet</button>
      }
    </Fragment>
  )
}
export default PetsPage