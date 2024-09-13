import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './components/shared/LoginPage'
import { AuthContext, AuthProvider } from './services/auth'
import { Spinner } from '@chakra-ui/react'
import { useContext } from 'react'
import { PATHS } from './routes'
import { CharacterSheetsPage } from './components/pages/CharacterSheetPage'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, authLoading } = useContext(AuthContext)

  if (authLoading) {
    return <Spinner />
  }

  return currentUser ? children : <Navigate to="/login" />
}

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path={PATHS.SHEETS}
            element={
              <PrivateRoute>
                <CharacterSheetsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={PATHS.SHEETS} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
