import { Fragment, useRef } from "react";

type Sitter = {
  id: string;
  name: string;
}

const AvailableSittersItem: React.FC<{sitters: Sitter[], onAssign: (sitter: string, role: string) => void }> = ({sitters, onAssign}) => {
  const sitterRef = useRef<HTMLSelectElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)

  const assignHandler = () => {
    const sitter = sitterRef.current!.value
    const role = categoryRef.current!.value
    onAssign(sitter, role)
  }

  return (
    <Fragment>
      {sitters.length ? (
      <li className="flex border-2 p-3 self-stretch rounded-lg flex-wrap justify-start md:justify-between gap-y-6">
        <div className="flex gap-2 items-center">
          <span className="text-primary">Sitter:</span>
          {sitters.length && (
            <select ref={sitterRef} title="select role" className="font-medium">
              {sitters.map(sitter => <option key={sitter.id} value={sitter.name}>{sitter.name}</option>)}
            </select>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-primary">Role:</span>
          <select ref={categoryRef} title="select role" className="font-medium">
            <option value="Caretaker">Caretaker</option>
            <option value="Secondary">Secondary</option>
          </select>
        </div>
        <button onClick={assignHandler} className="bg-primary text-white p-2 rounded">Assign</button>
      </li>
    ) : (
      <p className="text-center font-medium">No Sitters To Choose From</p>
    )}
    </Fragment>
  )
}
export default AvailableSittersItem