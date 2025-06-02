import User from "../models/User.js"

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("cart")
    res.json({
      items: user.cart || [],
    })
  } catch (error) {
    console.error("Get cart error:", error)
    res.status(500).json({
      message: "Server error while fetching cart",
    })
  }
}

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, image, quantity = 1 } = req.body

    if (!productId || !title || !price || !image) {
      return res.status(400).json({
        message: "Missing required fields",
      })
    }

    const user = await User.findById(req.user._id)

    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex((item) => item.productId === productId)

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      user.cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      user.cart.push({
        productId,
        title,
        price,
        image,
        quantity,
      })
    }

    await user.save()

    res.json({
      message: "Item added to cart successfully",
      cart: user.cart,
    })
  } catch (error) {
    console.error("Add to cart error:", error)
    res.status(500).json({
      message: "Server error while adding to cart",
    })
  }
}

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params

    const user = await User.findById(req.user._id)
    user.cart = user.cart.filter((item) => item.productId !== productId)

    await user.save()

    res.json({
      message: "Item removed from cart successfully",
      cart: user.cart,
    })
  } catch (error) {
    console.error("Remove from cart error:", error)
    res.status(500).json({
      message: "Server error while removing from cart",
    })
  }
}

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      })
    }

    const user = await User.findById(req.user._id)
    const itemIndex = user.cart.findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      })
    }

    user.cart[itemIndex].quantity = quantity
    await user.save()

    res.json({
      message: "Cart item updated successfully",
      cart: user.cart,
    })
  } catch (error) {
    console.error("Update cart error:", error)
    res.status(500).json({
      message: "Server error while updating cart",
    })
  }
}

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.cart = []
    await user.save()

    res.json({
      message: "Cart cleared successfully",
      cart: user.cart,
    })
  } catch (error) {
    console.error("Clear cart error:", error)
    res.status(500).json({
      message: "Server error while clearing cart",
    })
  }
}
