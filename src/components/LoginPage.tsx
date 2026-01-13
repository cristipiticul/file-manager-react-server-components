'use client'

import { Box, Button, Container, Heading, Input, Stack, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { loginUser } from '@/actions/auth'
import { toaster } from '@/components/ui/toaster'

export function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleLogin = async () => {
    // Reset error state
    setError(null)

    // Validate input
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    setIsLoading(true)

    try {
      // Call server action
      const result = await loginUser(username)

      if (result.success && result.username) {
        // Save username to localStorage
        localStorage.setItem('logged_in_user', result.username)

        // Show success toast
        toaster.create({
          title: 'Login successful',
          description: `Welcome, ${result.username}!`,
          type: 'success',
          duration: 3000
        })

        // Clear the form
        setUsername('')

        // Redirect to dashboard after successful login
        window.history.pushState(null, '', '/dashboard')
      } else {
        // Handle error
        const errorMessage = result.error || 'Login failed'
        setError(errorMessage)
        toaster.create({
          title: 'Login failed',
          description: errorMessage,
          type: 'error',
          duration: 5000
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin()
    }
  }

  return (
    <Container
      maxW="md"
      centerContent
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="full"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack gap={6} align="stretch">
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
          >
            Login
          </Heading>

          <Stack gap={4}>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              size="lg"
              aria-label="Username"
              disabled={isLoading}
            />

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}

            <Button
              size="lg"
              colorScheme="blue"
              width="full"
              onClick={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  )
}
