'use server'

import { db } from '@/db/index'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface LoginResult {
  success: boolean
  username?: string
  error?: string
}

export async function loginUser(username: string): Promise<LoginResult> {
  try {
    // Validate username
    if (!username || username.trim().length === 0) {
      return {
        success: false,
        error: 'Username is required'
      }
    }

    const trimmedUsername = username.trim()

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, trimmedUsername))
      .limit(1)

    if (existingUser.length > 0) {
      // User exists, return success
      return {
        success: true,
        username: existingUser[0].username
      }
    }

    // User doesn't exist, create new user
    const newUser = await db
      .insert(users)
      .values({ username: trimmedUsername })
      .returning()

    return {
      success: true,
      username: newUser[0].username
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during login'
    }
  }
}
