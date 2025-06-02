import { motion } from "framer-motion"
import { User, Mail, Calendar, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (!user) {
    navigate("/login")
    return null
  }

  const stats = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      label: "Orders",
      value: "12",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      label: "Wishlist",
      value: "8",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      label: "Cart Items",
      value: getCartCount().toString(),
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4 text-shadow-lg">Profile</h1>
          <p className="text-white/80 text-lg">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="card p-8 mb-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600 text-lg">{user.email}</p>
                  <p className="text-gray-500">Member since 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-800">January 2024</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full btn-primary">
                    <Settings className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                  <button onClick={handleLogout} className="w-full btn-secondary text-red-600 hover:text-red-700">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">Order #00{order}</p>
                      <p className="text-gray-600">Delivered on Jan {order + 10}, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${(order * 25.99).toFixed(2)}</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Delivered
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>{stat.icon}</div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
