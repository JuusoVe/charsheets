import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { MainMenu } from './menu/MainMenu'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Flex h="100vh">
      <MainMenu />
      <Box flex="1" overflowY="auto" bg="gray.50">
        {children}
      </Box>
    </Flex>
  )
}
