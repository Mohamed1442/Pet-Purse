import AvailableSittersItem from "./AvailableSittersItem";
import SelectedSitterItem from "./SelectedSitterItem";

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

const PetAssignationItem: React.FC<{pet: Pet, onAssignSitter: (sitter: string,role: string, petId: string) => void}> = ({pet, onAssignSitter}) => {
  return (
    <li className="border-2 border-primary-400 p-5">
            <div className="flex gap-2 mb-4">
              <span className="text-primary">Pet Name:</span>
              <span className="font-medium">{pet.name}</span>
            </div>
            <p className="text-primary mb-2">Choose Sitters:</p>
            <ul className="flex flex-col gap-4">
              <AvailableSittersItem onAssign={(sitter, role) => onAssignSitter(sitter, role, pet.id)} sitters={pet.availableSitters}/>
              <li><p className="text-primary mb-4">Selected Sitters:</p></li>
            </ul>
            <ul>
              {pet.selectedSitters.length === 0 && <li className="font-medium text-center">No Sitters Selected</li>}
              {pet.selectedSitters.map(sitter => <SelectedSitterItem name={sitter.name} role={sitter.role} key={sitter.id} />)}
            </ul>
          </li>
  )
}
export default PetAssignationItem