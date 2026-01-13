'use server'

import { db } from '@/db/index'
import { datarooms, users } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export interface Dataroom {
  id: number
  name: string
  owner: number
}

interface GetDataroomsResult {
  success: boolean
  datarooms?: Dataroom[]
  error?: string
}

interface CreateDataroomResult {
  success: boolean
  error?: string
}

export async function getDatarooms(username?: string): Promise<GetDataroomsResult> {
  try {
    // If no username provided, user is not logged in
    if (!username) {
      return {
        success: false,
        error: 'User not logged in'
      }
    }

    // Join datarooms with users table and filter by username
    const result = await db
      .select({
        id: datarooms.id,
        name: datarooms.name,
        owner: datarooms.owner
      })
      .from(datarooms)
      .innerJoin(users, eq(datarooms.owner, users.id))
      .where(eq(users.username, username))
      .orderBy(datarooms.name)

    return {
      success: true,
      datarooms: result
    }
  } catch (error) {
    console.error('Error fetching datarooms:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch datarooms'
    }
  }
}


export async function createDataroom(username: string, name: string): Promise<CreateDataroomResult> {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (user.length === 0) {
      return {
        success: false,
        error: "User does not exist"
      }
    }

    const existingDataroom = await db
      .select({
        id: datarooms.id,
        name: datarooms.name,
        owner: datarooms.owner
      })
      .from(datarooms)
      .where(and(eq(datarooms.owner, user[0].id), eq(datarooms.name, name)))

    if (existingDataroom.length > 0) {
      return {
        success: false,
        error: "Dataroom already exists!"
      }
    }

    // Dataroom doesn't exist, create new
    await db
      .insert(datarooms)
      .values({ name, owner: user[0].id })
      .returning()

    return {
      success: true
    }
  } catch (error) {
    console.error('Error fetching datarooms:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch datarooms'
    }
  }
}