import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match!')
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters long')
    }

    const toastId = toast.loading('Creating your account...')

    try {
      setLoading(true)
      await signup(formData.email, formData.password)
      
      toast.success('Account created successfully! 🎉', {
        id: toastId,
        duration: 5000
      })

      // Clear form data
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      })

      // Wait for the success message to be shown before redirecting
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (error) {
      let errorMessage = 'Failed to create account'
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak'
      }

      toast.error(errorMessage, {
        id: toastId
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-blue-500 pt-10 text-center">Join AI Tech Quizz</h1>
        <p className="text-2xl text-gray-500 mt-2 text-center">Test your tech knowledge with AI-powered questions</p>
        <div className="text-center text-sm text-gray-500 mt-2">
          Built by Abdallah Massarwe
        </div>
        
        <div className="flex justify-center items-center min-h-[70vh]">  
          <div className="game-card">
            <h2 className="text-blue-400 font-bold text-3xl mb-6 text-center">Register</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2">Email</label>
                <input 
                  className="game-input" 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input 
                  className="game-input" 
                  type="password"
                  name="password" 
                  placeholder="Create password (min. 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <div>
                <label className="block mb-2">Confirm Password</label>
                <input 
                  className="game-input" 
                  type="password"
                  name="confirmPassword" 
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <button 
                type="submit" 
                className="game-button mt-6"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </button>
              <p className="text-center mt-4 text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-400">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Register