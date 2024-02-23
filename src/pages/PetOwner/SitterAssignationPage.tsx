import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { getPetsAssignation } from "../../apis/apis"
import PetAssignationItem from "../../components/PetsOwner/PetAssignationItem"
import { useNavigate } from "react-router-dom"

type AvailableSitter = {
  id: string;
  name: string;
}

type SelectedSitter = {
  id: string;
  name: string;
  role: string;
}

type Pet = {
  id: string;
  name: string;
  availableSitters: AvailableSitter[];
  selectedSitters: SelectedSitter[];
}

const SitterAssignationPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOwnerUser = async () => {
      const pets: Pet[] = await getPetsAssignation()
      setPets(pets)
    }
    if (currentUser.id) {
      if(currentUser.role !== 'owner') {
        navigate('/dashboard')
      }
      fetchOwnerUser()
    }
  }, [currentUser, navigate])

  const [pets, setPets] = useState<Pet[]>([])

  
  const assignHandler = (sitterName: string,role: string,petId: string) => {
    // Updating the state of pets array
    const petsClone = [...pets]
    const currentPet = pets.find(pet => pet.id === petId)
    const currentPetIndex = pets.findIndex(pet => pet.id === petId)
    const newSelectedSitter = {id: new Date().getTime().toString(), name: sitterName ,role}
    const newSelectedSitters = [...currentPet!.selectedSitters, newSelectedSitter]
    const newAvailableSitters = currentPet!.availableSitters?.filter(sitter => sitter.name !== sitterName)
    const updatedPet: Pet = {id: currentPet!.id, name: currentPet!.name, availableSitters: newAvailableSitters, selectedSitters: newSelectedSitters}
    petsClone.splice(currentPetIndex, 1, updatedPet)
    
    setPets(petsClone)
  }

  return (
    <Fragment>
      <h2 className="text-center font-bold text-2xl mb-8">Sitter Assignation</h2>
      <section className="mb-8">
        <ul className="flex flex-col gap-4">
          {pets.map(pet => <PetAssignationItem onAssignSitter={assignHandler} key={pet.id} pet={pet} />)}
        </ul>
      </section>
    </Fragment>
  )
}
export default SitterAssignationPage