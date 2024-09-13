import { Menu, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react'
import { HiOutlineLogout } from 'react-icons/hi'
import { useContext } from 'react'
import { AccountMenuButton } from './AccountMenuButton'
import { AuthContext } from '../../services/auth'

export const AccountMenu = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Menu>
      <AccountMenuButton />
      <MenuList shadow="lg" color={useColorModeValue('gray.600', 'gray.200')}>
        <MenuItem rounded="md" icon={<HiOutlineLogout />} onClick={logout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
