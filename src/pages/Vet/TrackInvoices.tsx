import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store" 
import { getInvoicesState } from "../../apis/apis"
type Invoice = {
  type: string, petName: string, expense: string, pending: boolean, id: string
}

const TrackInvoices = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    const fetchOwnerUser = async () => {
      const invoices = await getInvoicesState()
      setInvoices(invoices)
    }
    if (currentUser.id) {
      fetchOwnerUser()
    }
  }, [currentUser])

  const [invoices, setInvoices] = useState<Invoice[]>([])

  return (
    <Fragment>
    <section className="mb-4 pb-8 border-b-2">
      <h2 className="text-center font-bold text-2xl mb-6">Pet Care Invoices</h2>
      <ul className="flex flex-col gap-4">
        {!invoices.filter(invoice => !invoice.pending).length && <li className="text-center font-medium">No invoices yet</li>}
        {invoices.filter(invoice => !invoice.pending).map((invoice) => (
          <li key={invoice.id} className="flex justify-between items-center border-2 p-3">
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
          <span className="text-pending font-medium">Pending</span>
        </li>
        ))}
      </ul>
    </section>
    <section>
      <h2 className="font-medium text-2xl mb-2">Submitted Invoices</h2>
      <ul className="flex flex-col gap-4">
        {invoices.filter(invoice => invoice.pending).map(invoice => (
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
    </Fragment>)
}
export default TrackInvoices