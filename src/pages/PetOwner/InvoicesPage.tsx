import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { getInvoices } from "../../apis/apis"
import { useNavigate } from "react-router-dom"

type Invoice = {
  type: string, petName: string, expense: string, confirmed: boolean, id: string
}

const InvoicesPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchOwnerUser = async () => {
      const invoices = await getInvoices()
      setInvoices(invoices)
    }
    if (currentUser.id) {
      if(currentUser.role !== 'owner') {
        navigate('/dashboard')
      }
      fetchOwnerUser()
    }
  }, [currentUser, navigate])

  const [invoices, setInvoices] = useState<Invoice[]>([])

  const submitInvoice = (invoice: Invoice) => {
    const newInvoice = {...invoice, confirmed: true}
    const invoiceIndex = invoices.findIndex(inv => inv.id === invoice.id)
    const invoicesClone = [...invoices]
    invoicesClone.splice(invoiceIndex, 1 ,newInvoice)
    setInvoices(invoicesClone)
  }
  
  console.log(invoices)
  return (
    <Fragment>
      <section className="mb-4 pb-8 border-b-2">
        <h2 className="text-center font-bold text-2xl mb-6">Pet Care Invoices</h2>
        <ul className="flex flex-col gap-4">
          {!invoices.filter(invoice => !invoice.confirmed).length && <li className="text-center font-medium">No invoices yet</li>}
          {invoices.filter(invoice => !invoice.confirmed).map((invoice) => (
            <li key={invoice.id} className="flex flex-wrap gap-4 justify-between items-center border-2 p-3">
            <div className="flex gap-2">
              <span className="text-primary">Pet Name:</span>
              <span className="font-medium">{invoice.petName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">Expense:</span>
              <span className="font-medium">${invoice.expense}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">Type:</span>
              <span className="font-medium">${invoice.type}</span>
            </div>
            <button onClick={submitInvoice.bind(null, invoice)} className="bg-primary text-secondary p-2 rounded">Confirm</button>
          </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-medium text-2xl mb-2">History</h2>
        <ul className="flex flex-col gap-4">
          {invoices.filter(invoice => invoice.confirmed).map(invoice => (
            <li key={invoice.id} className="flex justify-between items-center border-2 p-3">
            <div className="flex gap-2">
              <span className="text-primary">Pet Name:</span>
              <span className="font-medium">{invoice.petName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">Expense:</span>
              <span className="font-medium">${invoice.expense}</span>
            </div>
          </li>
          ))}
        </ul>
      </section>
    </Fragment>
  )
}
export default InvoicesPage