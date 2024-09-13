import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  VStack,
  useMenuButton,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../../services/auth'

export const AccountMenuButton = (props: FlexProps) => {
  const { currentUser } = useContext(AuthContext)
  const displayName =
    currentUser?.displayName ?? currentUser?.email?.split('.')?.at(0)

  const buttonProps = useMenuButton(props)
  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: 'gray.600' }}
      _focus={{ shadow: 'outline' }}>
      <VStack spacing="2">
        <HStack flex="1" spacing="3">
          <Avatar name={displayName} src={currentUser?.photoURL || undefined} />
          <Box textAlign="start">
            <Box noOfLines={1} fontWeight="semibold">
              {displayName}
            </Box>
          </Box>
        </HStack>
        <Box fontSize="xs" color="gray.400">
          {currentUser?.email}
        </Box>
      </VStack>
    </Flex>
  )
}
