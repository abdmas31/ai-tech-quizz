import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'
import { generateQuestions } from '../../services/openai'

function Quizz() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!location.state?.subject || !location.state?.level) {
          toast.error('Missing quiz parameters')
          navigate('/QuizzScreen')
          return
        }

        console.log('Fetching questions for:', location.state);
        const generatedQuestions = await generateQuestions(
          location.state.subject,
          location.state.level
        )

        if (!generatedQuestions || generatedQuestions.length === 0) {
          throw new Error('No questions were generated')
        }

        setQuestions(generatedQuestions)
        toast.success('Questions generated successfully!')
      } catch (error) {
        console.error('Error in fetchQuestions:', error);
        toast.error(error.message || 'Failed to generate questions. Please try again.')
        setTimeout(() => navigate('/QuizzScreen'), 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [location.state, navigate])

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
      toast.success('Correct answer! 🎉')
    } else {
      toast.error('Wrong answer! Try again!')
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  const handleTryAgain = () => {
    navigate('/QuizzScreen')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Generating Your Quiz...</h2>
          <p className="text-gray-400">Please wait while we prepare your questions</p>
        </div>
      </div>
    )
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

        {/* Quiz Content */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          {showScore ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h2>
              <p className="text-2xl mb-8">
                You scored {score} out of {questions.length}
              </p>
              <button
                onClick={handleTryAgain}
                className="game-button"
              >
                Try Another Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-400">
                    Question {currentQuestion + 1}/{questions.length}
                  </span>
                  <span className="text-lg text-gray-400">
                    Score: {score}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-6">
                  {questions[currentQuestion]?.questionText}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {questions[currentQuestion]?.answerOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option.isCorrect)}
                      className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                    >
                      {option.answerText}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quizz