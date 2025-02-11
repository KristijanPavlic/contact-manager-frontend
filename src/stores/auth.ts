import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post('/api/auth/login', { email, password })

        const { token, user } = response.data
        this.token = token
        this.user = user
        localStorage.setItem('token', token)

        // Configure axios defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error: unknown) {
        console.error('Login failed:', error)

        // Check if error is an AxiosError
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            throw new Error('Invalid email or password')
          } else if (error.response?.data) {
            // Ensure the error message is a string
            throw new Error(String(error.response.data))
          }
        }
        // Fallback for non-Axios errors or if no specific error message is provided
        throw new Error('An error occurred during login. Please try again.')
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },
  },
})
