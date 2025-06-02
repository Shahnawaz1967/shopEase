import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-white/20 mb-4">404</div>
          <div className="text-6xl mb-6">🛍️</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-display font-bold text-white mb-4 text-shadow-lg">Page Not Found</h1>
          <p className="text-white/80 text-lg mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate(-1)} className="btn-secondary inline-flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            <Link to="/" className="btn-primary inline-flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
