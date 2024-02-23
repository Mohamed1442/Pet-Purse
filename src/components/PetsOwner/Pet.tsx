const Pet: React.FC<{name: string, age: number, type: string}> = ({name, age, type}) => {
  return (
    <li className="flex justify-between items-center border-2 p-3">
          <div className="flex gap-2">
            <span className="text-primary">Name:</span>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Age:</span>
            <span className="font-medium">{age} Years</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Type:</span>
            <span className="font-medium">{type}</span>
          </div>
    </li>
  )
}
export default Pet