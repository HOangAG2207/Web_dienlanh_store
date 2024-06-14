import { defineStore } from 'pinia'
import { api } from '../services/apiBaseSetup'
export const useLoginStore = defineStore('login', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null
  }),
  actions: {
    async login(userData) {
      this.error = null
      try {
        const response = await api.post(`login`, userData)
        userData = response.data.auth_response
        this.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      } catch (error) {
        // Error occurred
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            // Assuming the error response structure is consistent
            const errorMessage = error.response.data.message
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
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
