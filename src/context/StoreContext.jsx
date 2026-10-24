/**
 * Client-side store for cart, wishlist, orders and the signed-in customer.
 *
 * ⚠️ TEMPORARY DATA LAYER. This project has no server/database connected, so
 * these records live in the browser's localStorage. That is fine for browsing
 * and demoing the flow, but it is NOT production storage:
 *   - carts/wishlists are per-browser, not per-account across devices
 *   - orders are only visible in the browser that created them
 *   - sign-in is a local demo: password digests are stored with SHA-256 and a
 *     random salt (never plain text), but there is no server-side session,
 *     rate limiting or password reset. Replace with real server-side auth
 *     before going live.
 * Swapping this module for API calls is the single integration point.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { products } from '../data/products'

const STORAGE_KEY = 'hisarma.store.v1'

const StoreContext = createContext(null)

const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

const randomId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const digest = async (text) => {
  const bytes = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => ({
    cart: [],
    wishlist: [],
    orders: [],
    users: [],
    user: null,
    ...loadState(),
  }))
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const patch = useCallback((next) => setState((s) => ({ ...s, ...next })), [])

  /* ------------------------------------------------------------- toasts */
  const toast = useCallback((message) => {
    const id = randomId()
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  /* --------------------------------------------------------------- cart */
  const addToCart = useCallback(
    (productId, qty = 1) => {
      setState((s) => {
        const existing = s.cart.find((i) => i.id === productId)
        const cart = existing
          ? s.cart.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i))
          : [...s.cart, { id: productId, qty }]
        return { ...s, cart }
      })
      const product = products.find((p) => p.id === productId)
      toast(`«${product?.name || 'محصول'}» به سبد خرید اضافه شد.`)
    },
    [toast]
  )

  const setQty = useCallback((productId, qty) => {
    setState((s) => ({
      ...s,
      cart:
        qty <= 0
          ? s.cart.filter((i) => i.id !== productId)
          : s.cart.map((i) => (i.id === productId ? { ...i, qty } : i)),
    }))
  }, [])

  const removeFromCart = useCallback((productId) => {
    setState((s) => ({ ...s, cart: s.cart.filter((i) => i.id !== productId) }))
  }, [])

  const clearCart = useCallback(() => patch({ cart: [] }), [patch])

  /* ----------------------------------------------------------- wishlist */
  const toggleWishlist = useCallback(
    (productId) => {
      setState((s) => {
        const has = s.wishlist.includes(productId)
        return {
          ...s,
          wishlist: has
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        }
      })
      const product = products.find((p) => p.id === productId)
      setState((s) => {
        toast(
          s.wishlist.includes(productId)
            ? `«${product?.name}» به علاقه‌مندی‌ها اضافه شد.`
            : `«${product?.name}» از علاقه‌مندی‌ها حذف شد.`
        )
        return s
      })
    },
    [toast]
  )

  const isWished = useCallback(
    (productId) => state.wishlist.includes(productId),
    [state.wishlist]
  )

  /* --------------------------------------------------------------- auth */
  const register = useCallback(async ({ name, email, password, phone }) => {
    const normalized = email.trim().toLowerCase()
    let result = { ok: true }
    setState((s) => {
      if (s.users.some((u) => u.email === normalized)) {
        result = { ok: false, error: 'این ایمیل قبلاً ثبت شده است.' }
        return s
      }
      return s
    })
    if (!result.ok) return result
    const salt = randomId()
    const passwordHash = await digest(`${salt}:${password}`)
    const user = { id: randomId(), name, email: normalized, phone, salt, passwordHash }
    setState((s) => ({ ...s, users: [...s.users, user], user: publicUser(user) }))
    return { ok: true }
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const normalized = email.trim().toLowerCase()
    const user = state.users.find((u) => u.email === normalized)
    if (!user) return { ok: false, error: 'کاربری با این ایمیل یافت نشد.' }
    const passwordHash = await digest(`${user.salt}:${password}`)
    if (passwordHash !== user.passwordHash)
      return { ok: false, error: 'رمز عبور نادرست است.' }
    patch({ user: publicUser(user) })
    return { ok: true }
  }, [state.users, patch])

  const signOut = useCallback(() => patch({ user: null }), [patch])

  /* ------------------------------------------------------------- orders */
  const placeOrder = useCallback(
    ({ customer, note, deliveryMethod }) => {
      const items = state.cart.map((line) => {
        const product = products.find((p) => p.id === line.id)
        return {
          id: line.id,
          name: product?.name,
          sku: product?.sku,
          price: product?.price ?? null,
          qty: line.qty,
        }
      })
      const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0)
      const order = {
        id: randomId(),
        createdAt: new Date().toISOString(),
        customer,
        note: note || '',
        deliveryMethod: deliveryMethod || 'coordination',
        items,
        subtotal,
        shipping: null,
        total: subtotal,
        status: 'requested',
        payment: 'unpaid',
      }
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }))
      return order
    },
    [state.cart]
  )

  /** Look up a single order (used by the confirmation page). */
  const getOrder = useCallback(
    (id) => state.orders.find((o) => o.id === id) || null,
    [state.orders]
  )

  const myOrders = useMemo(() => {
    if (!state.user) return []
    return state.orders.filter((o) => o.customer?.email === state.user.email)
  }, [state.orders, state.user])

  /* ------------------------------------------------------------ derived */
  const cartDetailed = useMemo(
    () =>
      state.cart
        .map((line) => {
          const product = products.find((p) => p.id === line.id)
          if (!product) return null
          return { ...line, product, lineTotal: (product.price || 0) * line.qty }
        })
        .filter(Boolean),
    [state.cart]
  )

  const cartCount = useMemo(
    () => state.cart.reduce((n, i) => n + i.qty, 0),
    [state.cart]
  )
  const subtotal = useMemo(
    () => cartDetailed.reduce((sum, l) => sum + l.lineTotal, 0),
    [cartDetailed]
  )

  const value = {
    cart: state.cart,
    cartDetailed,
    cartCount,
    subtotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    wishlist: state.wishlist,
    toggleWishlist,
    isWished,
    user: state.user,
    register,
    signIn,
    signOut,
    orders: myOrders,
    getOrder,
    placeOrder,
    toasts,
    toast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

/** Never expose the stored salt/hash to the UI layer. */
const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
})

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
