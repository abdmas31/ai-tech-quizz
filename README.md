# 🚀 AI Tech Quiz

An interactive AI-powered educational quiz application for developers to test and improve their technical knowledge across various domains of software development.

## 🌟 Features

- 🤖 AI-Generated Questions: Dynamic quiz generation using OpenAI
- 🎯 Multiple Tech Domains: Frontend, Backend, System Design, DSA, and more
- 🔐 User Authentication: Secure login and registration with Firebase
- 📱 Responsive Design: Mobile-first approach with modern UI
- 🎨 Dark Mode: Easy on the eyes
- 🏆 Real-time Scoring: Immediate feedback on quiz performance

## 🛠️ Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **AI Integration**: OpenAI API
- **State Management**: React Context
- **Routing**: React Router
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API Key
- Firebase Project Credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdmas31/ai-tech-quizz.git
   cd ai-tech-quizz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📚 Available Quiz Topics

- **Frontend Development**
  - React fundamentals
  - JavaScript ES6+
  - HTML5 & CSS3
  - State management
  - And more...

- **Backend Development**
  - Node.js & Express
  - RESTful APIs
  - Database design
  - Authentication & Security
  - And more...

- **System Design**
  - Scalability
  - Load balancing
  - Microservices
  - Database sharding
  - And more...

- **Data Structures & Algorithms**
  - Arrays & Strings
  - Trees & Graphs
  - Dynamic Programming
  - Sorting & Searching
  - And more...

- **DevOps**
  - Docker & Kubernetes
  - CI/CD
  - Cloud Services
  - Infrastructure as Code
  - And more...

## 🔒 Security

- Environment variables are used for sensitive data
- Firebase Authentication for secure user management
- API keys are never exposed in the client-side code
- Protected routes for authenticated users only

## 🚀 Deployment

The application is deployed on Vercel. For your own deployment:

1. Fork this repository
2. Sign up on [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add the required environment variables
5. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the powerful GPT API
- Firebase for authentication services
- The React and Vite communities
- All contributors and users of this application

## 📧 Contact

For any queries or suggestions, please open an issue in the GitHub repository.
