import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function QuizzScreen() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [subject, setSubject] = useState("Frontend")
  const [loading, setLoading] = useState(false)
  const [level, setLevel] = useState(1)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  const handleStartQuiz = () => {
    setLoading(true)
    
    // Navigate to quiz with subject and level
    navigate('/Quizz', { 
      state: { 
        subject, 
        level 
      } 
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-500">AI Tech Quizz</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              {currentUser?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome to AI Tech Quizz!</h2>
          <p className="text-gray-300 text-center mb-8">
            Test your knowledge with AI-powered questions about software development.
          </p>

          <div>
            <label className="block text-md font-medium text-gray-400 mb-1">Select Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="game-select"
            >
              <option value="Frontend">Frontend Development</option>
              <option value="Backend">Backend Development</option>
              <option value="System Design">System Design</option>
              <option value="DSA">Data Structures & Algorithms</option>
              <option value="DevOps">DevOps & Cloud</option>
              <option value="Database">Database Systems</option>
              <option value="Security">Cybersecurity</option>
              <option value="Mobile">Mobile Development</option>
              <option value="Testing">Software Testing</option>
              <option value="Git">Git & Version Control</option>
            </select>
          </div>

          <div>
            <label className="block text-md font-medium text-gray-400 mb-1 mt-5">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`p-3 rounded-lg transition-all ${
                    level === lvl 
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  Level {lvl}
                  <div className="text-sm mt-1">
                    {lvl === 1 && 'Beginner'}
                    {lvl === 2 && 'Intermediate'}
                    {lvl === 3 && 'Advanced'}
                  </div>
                </button>
              ))}
            </div>
          </div>  

          {/* Start Quiz Button */}
          <div className="flex justify-center">
            <button 
              className="game-button mt-5"
              onClick={handleStartQuiz}
              disabled={loading}
            >
              {loading ? 'Generating Quiz...' : 'Start Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizzScreen