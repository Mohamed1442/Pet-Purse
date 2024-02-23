const ExpenseCategory: React.FC<{type: string, limit: number}> = ({type, limit}) => {
  return (
    <li className="flex justify-between items-center border-2 p-3">
          <div className="flex gap-2">
            <span className="text-primary">Type:</span>
            <span className="font-medium">{type}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">Limit:</span>
            <span className="font-medium">{limit}</span>
          </div>
    </li>
  )
}
export default ExpenseCategory