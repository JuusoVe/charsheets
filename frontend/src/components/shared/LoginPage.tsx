import { useState, useContext } from 'react'
import { Box, Button, Input, VStack, Divider, Center } from '@chakra-ui/react'
import { AuthContext } from '../../services/auth'

export const LoginPage = () => {
  const [magicLinkEmail, setMagicLinkEmail] = useState('')
  const { sendMagicLink } = useContext(AuthContext)

  const handleMagicLinkLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (magicLinkEmail) {
      sendMagicLink(magicLinkEmail)
      //   setMagicLinkEmail('')
    }
  }

  return (
    <Center>
      <Box textAlign="center" fontSize="xl" w={'xl'} pt={'12'}>
        <form onSubmit={handleMagicLinkLogin} id="magic-link-form">
          <VStack spacing={4} p={5}>
            <Input
              placeholder="Email for sign in link"
              value={magicLinkEmail}
              onChange={(e) => setMagicLinkEmail(e.target.value)}
              type="email"
              required
              id="magic-link-email"
            />
            <Button colorScheme="blue" size="md" type="submit">
              Send sign in link
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}
