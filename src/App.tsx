import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/UI/HomePage';
import LoginPage from './pages/Authentication/LoginPage';
import SignUpPage from './pages/Authentication/SignUpPage';
import ErrorPage from './pages/UI/ErrorPage';
import {action as signUpAction} from './pages/Authentication/SignUpPage'
import {action as loginAction} from './pages/Authentication/LoginPage'
import DashboardLayoutPage from './pages/UI/DashboardLayoutPage';
import PetsPage from './pages/PetOwner/PetsPage';
import ExpensesCategoryPage from './pages/PetOwner/ExpensesCategoryPage';
import SitterAssignationPage from './pages/PetOwner/SitterAssignationPage';
import ExpensesConfirmationPage from './pages/PetOwner/ExpensesConfirmationPage';
import ExpensesPage from './pages/PetOwner/ExpensesPage';
import { action as logoutAction } from './pages/Authentication/Logout'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import WelcomePage from "./pages/UI/WelcomePage";
import AddExpenses from "./pages/PetSitter/AddExpenses";
import ExpensesSitterPage from "./pages/PetSitter/ExpensesSitterPage";
import PetCareContributionPage from "./pages/PetSitter/PetCareContributionPage";
import ConfirmationStatusPage from "./pages/PetSitter/ConfirmationStatusPage";
import InvoicesPage from "./pages/PetOwner/InvoicesPage";
import SubmitInvoice from "./pages/Vet/SubmitInvoice";
import TrackInvoices from "./pages/Vet/TrackInvoices";
import { getCurrentUser } from "./apis/apis";
import { checkAuthentication } from "./pages/Authentication/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage /> },
      {'path': 'dashboard', element:<DashboardLayoutPage />, loader: checkAuthentication, children: [
        {index: true, element: <WelcomePage /> },
        // owner routes
        {path: 'pets', element:  <PetsPage /> },
        {path: 'expenses-categories', element: <ExpensesCategoryPage />},
        {path: 'assign-sitter', element: <SitterAssignationPage />},
        {path: 'expenses', element: <ExpensesPage />},
        {path: 'confirm-expense', element: <ExpensesConfirmationPage />},
        // sitter routes
        {path: 'add-expense', element: <AddExpenses />},
        {path: 'all-expenses', element: <ExpensesSitterPage />},
        {path: 'pet-care-contribution', element: <PetCareContributionPage />},
        {path: 'confirm-status', element: <ConfirmationStatusPage />},
        {path: 'all-invoices', element: <InvoicesPage />},
        // vet routes
        {path: 'submit-invoice', element: <SubmitInvoice />},
        {path: 'track-invoices', element: <TrackInvoices />},
      ]},
      {
        path: "auth",
        children: [
          { path: 'login', element: <LoginPage />, action: loginAction },
          { path: 'sign-up', element: <SignUpPage />, action: signUpAction },
        ]
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  },
]);

const App = () => {
  const dispatch = useDispatch()
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const userId = currentUser.uid
      const user = await getCurrentUser(userId)
      dispatch(authActions.login(user))
      localStorage.setItem("token", userId)
    }
  })

  return (
    <RouterProvider router={router} />
  )
}
export default App