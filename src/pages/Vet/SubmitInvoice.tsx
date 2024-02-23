import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store" 
const SubmitInvoice = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate() 
  useEffect(() => {
    if (currentUser.id) {
      if(currentUser.role !== 'vet') {
        navigate('/dashboard')
      }
    }
  }, [currentUser, navigate])
  
  const [invoice, setInvoice] = useState(0)
  const [description, setDescription] = useState('')
  const [isSubmittable, setIsSubmittable] = useState(false)

  const invoiceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setInvoice(value)

    if (description && value) {
      setIsSubmittable(true)
    } else {
      setIsSubmittable(false)
    }
  }

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDescription(value)

    if (invoice && value) {
      setIsSubmittable(true)
    } else {
      setIsSubmittable(false)
    }
  }

  const submitInvoice = () => {
  }

  return (
    <Fragment>
        <h2 className="text-center font-bold text-2xl mb-6">Pet Care Invoices</h2>
        <ul>
          <li className="flex justify-between items-center border-2 p-3">
            <div className="flex gap-2">
              <span className="text-primary">Pet Name:</span>
              <span className="font-medium">Posy</span>
            </div>
            <div className="flex gap-2 items-center shrink-0">
              <label htmlFor="invoice" className="text-primary">Invoice:</label>
              <input value={invoice || ''} type="number" id="invoice" className="border-2 border-primary-400 rounded" onChange={invoiceChangeHandler} />
          </div>
          <div className="flex gap-2 items-center shrink-0">
              <label htmlFor="description" className="text-primary">Description:</label>
              <input value={description} type="text" id="description" className="border-2 border-primary-400 rounded" onChange={descriptionChangeHandler} />
          </div>
            <button onClick={submitInvoice} disabled={!isSubmittable} className={`text-lg bg-primary p-2 rounded text-grey ${!isSubmittable ? "bg-primaryShade" : ""}`}>Submit</button>
          </li>
        </ul>
    </Fragment>
  )
}
export default SubmitInvoice