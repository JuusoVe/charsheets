import {
  User,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner, useToast } from '@chakra-ui/react'
import { auth } from './firebase'
import { PATHS } from '../routes'

interface Props {
  children?: ReactNode
}

const EMAIL_SIGN_IN_KEY = 'emailForSignIn'

export const AuthContext = createContext({
  currentUser: null as User | null,
  logout: () => {},
  authLoading: true,
  sendMagicLink: (_email: string) => {},
})

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const navigate = useNavigate()

  const toast = useToast()

  const handleLoggedInUser = async (user: User) => {
    setCurrentUser(user)
    if (window.location.pathname === '/login') {
      navigate(PATHS.SHEETS)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const emailForSignIn = window.localStorage.getItem(EMAIL_SIGN_IN_KEY)
        if (!emailForSignIn) {
          console.error('No email for sign in.')
          toast({
            title: 'Unable to complete email sign in.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          return
        }
        const result = await signInWithEmailLink(
          auth,
          emailForSignIn,
          window.location.href,
        )
        if (result.user) {
          await handleLoggedInUser(result.user)
        }
      } else if (user) {
        await handleLoggedInUser(user)
      } else {
        setCurrentUser(null)
      }
      setAuthLoading(false)
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = async () => {
    await auth.signOut()
    setCurrentUser(null)
    navigate('/login')
  }

  const sendMagicLink = async (email: string) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      window.localStorage.setItem(EMAIL_SIGN_IN_KEY, email)
      toast({
        title: 'If an account with the email exists, we sent a login link.',
        description:
          'Remember to check your spam folder if you don’t see a link within a minute.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error sending email link', error)
      toast({
        title: 'Error sending email link',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const value = {
    currentUser,
    logout,
    sendMagicLink,
    authLoading,
  }

  return (
    <AuthContext.Provider value={value}>
      {authLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  )
}
