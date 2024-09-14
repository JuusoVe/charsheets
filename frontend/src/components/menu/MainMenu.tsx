import {
  Box,
  Flex,
  Stack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { GrDocumentPdf } from 'react-icons/gr'
import { useNavigate, useLocation } from 'react-router-dom'
import { AccountMenu } from './AccountMenu'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'
import { PATHS } from '../../routes'

interface MenuItem {
  icon: JSX.Element
  label: string
  path: string
}

const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    icon: <GrDocumentPdf />,
    label: 'My sheets',
    path: PATHS.SHEETS,
  },
]

const BOTTOM_MENU_ITEMS: MenuItem[] = []

export const MainMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isDrawerMenu = useBreakpointValue({ base: true, md: false })

  const menuContent = (
    <Flex h="full" direction="column" px="4" py="4">
      <AccountMenu />
      <Stack spacing="8" flex="1" overflow="auto" pt="8">
        <NavGroup label="Pages">
          {MAIN_MENU_ITEMS.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                navigate(item.path)
                onClose()
              }}
              isActive={location.pathname === item.path}
            />
          ))}
        </NavGroup>
      </Stack>
      <Box>
        <Stack spacing="1">
          {BOTTOM_MENU_ITEMS.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                navigate(item.path)
                onClose()
              }}
              isActive={location.pathname === item.path}
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  )

  return (
    <>
      {isDrawerMenu ? (
        <>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            size="lg"
            onClick={onOpen}
            bg="gray.900"
            color="white"
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="gray.900" color="white">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>{menuContent}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Box w="64" bg="gray.900" color="white" fontSize="sm" h="full">
          {menuContent}
        </Box>
      )}
    </>
  )
}
