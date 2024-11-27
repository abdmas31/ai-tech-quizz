import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      await login(formData.email, formData.password)
      toast.success('Successfully logged in!')
      navigate('/QuizzScreen')
    } catch (error) {
      toast.error(error.message)
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
        <h1 className="text-5xl font-bold text-blue-500 pt-10 text-center">Welcome to AI Tech Quizz</h1>
        <p className="text-2xl text-gray-500 mt-2 text-center">Test your tech knowledge with AI-powered questions</p>
        <div className="text-center text-sm text-gray-500 mt-2">
          Built by Abdallah Massarwe
        </div>
        
        <div className="flex justify-center items-center min-h-[70vh]">  
          <div className="game-card">
            <h2 className="text-blue-400 font-bold text-3xl mb-6 text-center">Login</h2>
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
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input 
                  className="game-input" 
                  type="password"
                  name="password" 
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="game-button mt-6"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className="text-center mt-4 text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:text-blue-400">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Login