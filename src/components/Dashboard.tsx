'use client'

import { Box, Container, Heading, Table, VStack, Text, Spinner, Center, HStack, Input, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createDataroom, getDatarooms, type Dataroom } from '@/actions/datarooms'

export function Dashboard() {
    const username = localStorage.getItem('logged_in_user') || undefined
    const [newDataroomName, setNewDataroomName] = useState<string>('')
    const [datarooms, setDatarooms] = useState<Dataroom[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    const fetchDatarooms = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await getDatarooms(username)

            if (result.success && result.datarooms) {
                setDatarooms(result.datarooms)
            } else {
                setError(result.error || 'Failed to fetch datarooms')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCreateDataroom() {
        await createDataroom(username!, newDataroomName)
        await fetchDatarooms()
    }

    useEffect(() => {
        fetchDatarooms()
    }, [])

    return (
        <Container
            maxW="container.xl"
            py={8}
        >
            <VStack gap={6} align="stretch">
                {/* Header */}
                <Heading
                    as="h1"
                    size="2xl"
                    mb={4}
                >
                    Datarooms
                </Heading>

                {/* Loading State */}
                {isLoading && (
                    <Center py={10}>
                        <Spinner size="xl" color="blue.500" />
                    </Center>
                )}

                {/* Error State */}
                {!isLoading && error && (
                    <Box
                        textAlign="center"
                        py={10}
                        color="red.500"
                    >
                        <Text fontSize="lg" fontWeight="semibold">
                            Error loading datarooms
                        </Text>
                        <Text fontSize="sm" mt={2}>
                            {error}
                        </Text>
                    </Box>
                )}

                {/* Empty State */}
                {!isLoading && !error && datarooms.length === 0 && (
                    <Box
                        textAlign="center"
                        py={10}
                        color="gray.500"
                    >
                        <Text fontSize="lg">
                            No datarooms found. Create your first dataroom to get started.
                        </Text>
                    </Box>
                )}

                {/* Table Container - shown when we have datarooms */}
                {!isLoading && !error && datarooms.length > 0 && (
                    <Box
                        borderWidth={1}
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="sm"
                    >
                        <Table.Root
                            size={{ base: 'sm', md: 'md' }}
                            variant="outline"
                        >
                            <Table.Header>
                                <Table.Row bg="gray.50" _dark={{ bg: "gray.800" }}>
                                    <Table.ColumnHeader
                                        fontWeight="semibold"
                                        py={4}
                                    >
                                        Dataroom Name
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {datarooms.map((dataroom) => (
                                    <Table.Row
                                        key={dataroom.id}
                                        _hover={{
                                            bg: 'gray.50',
                                            _dark: { bg: 'gray.700' },
                                            cursor: 'pointer'
                                        }}
                                        transition="background-color 0.2s"
                                    >
                                        <Table.Cell py={4}>
                                            {dataroom.name}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                )}
            </VStack>
            <HStack gap={4}>
                <Input
                    placeholder="Enter dataroom name"
                    value={newDataroomName}
                    onChange={(e) => setNewDataroomName(e.target.value)}
                    aria-label="dataroomName"
                    disabled={isLoading}
                />
                <Button
                    size="lg"
                    colorScheme="blue"
                    onClick={handleCreateDataroom}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Dataroom...' : 'Create Dataroom'}
                </Button>
            </HStack>
        </Container>
    )
}
