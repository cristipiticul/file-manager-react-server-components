'use client'

import { Box, Container, Heading, Table, VStack } from '@chakra-ui/react'

// Mock data type for Dataroom
interface Dataroom {
    id: string
    name: string
}

// Mock data - will be replaced with real data later
const mockDatarooms: Dataroom[] = [
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Client Documents' },
    { id: '3', name: 'Financial Reports Q4' },
    { id: '4', name: 'Marketing Assets' },
    { id: '5', name: 'Legal Contracts' },
]

export function Dashboard() {
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

                {/* Table Container */}
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
                            {mockDatarooms.map((dataroom) => (
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

                {/* Empty state - shown when no datarooms exist */}
                {mockDatarooms.length === 0 && (
                    <Box
                        textAlign="center"
                        py={10}
                        color="gray.500"
                    >
                        No datarooms found. Create your first dataroom to get started.
                    </Box>
                )}
            </VStack>
        </Container>
    )
}
