import { useState } from 'react'
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { AddIcon, DownloadIcon } from '@chakra-ui/icons'
import { PDFPreview } from './pdf/PDFPreview'
import { CharacterSheet } from '../types'
import { PageEditor } from './PageEditor'

export const SheetEditor = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [selectedCharacterSheet, setSelectedCharacterSheet] =
    useState<CharacterSheet>({
      pages: ['1', '2'],
      id: '1',
    })
  const [singlePagePdfBlob, setSinglePagePdfBlob] = useState<Blob | null>(null)

  const handleTabChange = (index: number) => {
    setTabIndex(index)
  }

  const addNewPage = () => {
    console.log('addNewPage')
  }

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...')
  }

  return (
    <Box>
      <Tabs index={tabIndex} onChange={handleTabChange}>
        <VStack
          alignItems={'flex-start'}
          position={'sticky'}
          top={0}
          zIndex={10}
          bgColor={'gray.50'}>
          <HStack mb={4}>
            <Button onClick={addNewPage} leftIcon={<AddIcon />} size="xs">
              Add a custom page
            </Button>
            <Button
              onClick={handleDownloadPDF}
              leftIcon={<DownloadIcon />}
              colorScheme="green"
              size="xs"
              ml={2}
              isDisabled={!singlePagePdfBlob}>
              Download PDF
            </Button>
          </HStack>
          <TabList>
            {selectedCharacterSheet.pages.map((page, index) => (
              <Tab key={page}>{`Page ${index + 1}`}</Tab>
            ))}
          </TabList>
        </VStack>
        <HStack alignItems={'flex-start'}>
          <Box w={'60%'}>
            <TabPanels>
              {selectedCharacterSheet.pages.map((page) => (
                <TabPanel key={page}>
                  <PageEditor />
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
          <Box position={'sticky'} top={48} w={'40%'}>
            <PDFPreview pdfBlob={singlePagePdfBlob} />
          </Box>
        </HStack>
      </Tabs>
    </Box>
  )
}
