import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Dropdown } from '../shared/Dropdown'
import { DefaultLayout } from '../DefaultLayout'
import { SheetEditor } from '../CharacterSheetEditor'

const SHEETS = [
  {
    id: '1',
    name: 'Sheet 1',
  },
  {
    id: '2',
    name: 'Sheet 2',
  },
]

export const CharacterSheetsPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Box mx="auto" p={4}>
        <Flex>
          <Box flex="1" mr={4}>
            <SheetEditor />
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}
