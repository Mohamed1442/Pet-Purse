import axios from "axios"
import { API_URL } from "../environment/environment"

export const getCurrentUser = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/users/${id}`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getOwnerPets = async () => {
  try {
    const res = await axios.get(`${API_URL}/pets`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getOwnerCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getPetsAssignation = async () => {
  try {
    const res = await axios.get(`${API_URL}/assignation`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getOwnerExpenses = async () => {
  try {
    const res = await axios.get(`${API_URL}/owner-expenses`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getNeedToBeConfirmedExpenses = async () => {
  try {
    const res = await axios.get(`${API_URL}/confirm-expenses`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getInvoices = async () => {
  try {
    const res = await axios.get(`${API_URL}/confirm-invoices`)
    return res.data
  } catch(e) {
    return null
  }
}

export const getInvoicesState = async () => {
  try {
    const res = await axios.get(`${API_URL}/track-invoices`)
    return res.data
  } catch(e) {
    return null
  }
}