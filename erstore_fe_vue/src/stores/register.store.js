// src/stores/authStore.js
import { defineStore } from 'pinia'
import { api } from '../services/apiBaseSetup'
// import axios from 'axios'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    error: null
  }),
  actions: {
    async register(userDetails) {
      try {
        await api.post(`register`, userDetails)
        return true
      } catch (error) {
        // Error occurred
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 422) {
            // Assuming the error response structure is consistent
            const errorMessage = error.response.data.error.email[0]
            alert(errorMessage) // Display the error message to the user
          } else {
            // Handle other errors
            console.error('Error:', error.response.data.message)
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message)
        }
        return false
      }
    }
  }
})
