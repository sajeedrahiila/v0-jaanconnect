// Configure your on-premise Odoo instance URL

// Replace with your Odoo instance URL
const ODOO_BASE_URL = process.env.NEXT_PUBLIC_ODOO_URL || "http://localhost:8069"
const ODOO_DB = process.env.NEXT_PUBLIC_ODOO_DB || "odoo"

export interface User {
  id: number
  name: string
  email: string
  partner_id: number
}

// Types for Odoo API responses
interface OdooAuthResponse {
  success: boolean
  user?: User
  session_id?: string
  error?: string
}

interface OdooRegisterResponse {
  success: boolean
  user?: User
  error?: string
}

/**
 * Login to Odoo backend
 * Endpoint: /web/session/authenticate
 */
export async function loginUser(email: string, password: string): Promise<OdooAuthResponse> {
  try {
    const response = await fetch(`${ODOO_BASE_URL}/web/session/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        params: {
          db: ODOO_DB,
          login: email,
          password: password,
        },
      }),
      credentials: "include", // Important for session cookies
    })

    const data = await response.json()

    if (data.error) {
      return {
        success: false,
        error: data.error.data?.message || "Authentication failed",
      }
    }

    if (data.result && data.result.uid) {
      // Store session info
      if (typeof window !== "undefined") {
        localStorage.setItem("odoo_session_id", data.result.session_id || "")
        localStorage.setItem(
          "odoo_user",
          JSON.stringify({
            id: data.result.uid,
            name: data.result.name,
            email: data.result.username,
            partner_id: data.result.partner_id,
          }),
        )
      }

      return {
        success: true,
        user: {
          id: data.result.uid,
          name: data.result.name,
          email: data.result.username,
          partner_id: data.result.partner_id,
        },
        session_id: data.result.session_id,
      }
    }

    return {
      success: false,
      error: "Invalid credentials",
    }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return {
      success: false,
      error: "Connection error. Please check your Odoo backend is running.",
    }
  }
}

/**
 * Register new user in Odoo
 * Creates a res.partner record
 */
export async function registerUser(data: {
  name: string
  email: string
  password: string
}): Promise<OdooRegisterResponse> {
  try {
    // Create user via Odoo signup endpoint
    const response = await fetch(`${ODOO_BASE_URL}/web/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        params: {
          db: ODOO_DB,
          name: data.name,
          login: data.email,
          password: data.password,
        },
      }),
      credentials: "include",
    })

    const result = await response.json()

    if (result.error) {
      return {
        success: false,
        error: result.error.data?.message || "Registration failed. Email may already exist.",
      }
    }

    // After successful registration, log the user in
    return await loginUser(data.email, data.password)
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return {
      success: false,
      error: "Connection error. Please check your Odoo backend is running.",
    }
  }
}

/**
 * Logout from Odoo
 */
export async function logoutUser(): Promise<void> {
  try {
    await fetch(`${ODOO_BASE_URL}/web/session/destroy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("odoo_session_id")
      localStorage.removeItem("odoo_user")
    }
  } catch (error) {
    console.error("[v0] Logout error:", error)
  }
}

/**
 * Get current user session
 */
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("odoo_user")
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("odoo_session_id")
}

/**
 * Generic Odoo API call helper
 * Use this for custom Odoo REST API endpoints
 */
export async function callOdooAPI(endpoint: string, method = "GET", body?: any) {
  try {
    const sessionId = typeof window !== "undefined" ? localStorage.getItem("odoo_session_id") : null

    const response = await fetch(`${ODOO_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(sessionId && { "X-Openerp-Session-Id": sessionId }),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Odoo API call error:", error)
    throw error
  }
}
