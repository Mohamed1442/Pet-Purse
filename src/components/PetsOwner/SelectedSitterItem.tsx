const SelectedSitterItem: React.FC<{name: string, role: string }> = ({name, role}) => {
  return (
    <li className="flex flex-wrap md:flex-nowrap justify-between border-2 p-3 self-stretch rounded-lg mb-4">
                <div className="flex gap-2">
                  <span className="text-primary">Sitter Name:</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">Role:</span>
                  <span className="font-medium">{role}</span>
                </div>
            </li>
  )
}
export default SelectedSitterItem