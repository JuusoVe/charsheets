import React, { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, Button, Text } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SortableContainer } from './grid/SortableContainer'
import { SortableItem } from './grid/SortableItem'
import { SectionEditor } from './SectionEditor'

type Section = {
  id: string
  content: string
  size: { w: number; h: number } // Width and height in grid cells
}

type Page = {
  id: string
  type: 'uploaded' | 'custom'
  sections: Section[]
}

export const PageEditor: React.FC = () => {
  const [isDeleteHovered, setIsDeleteHovered] = useState<boolean>(false)
  const [selectedPage, setSelectedPage] = useState<Page>({
    id: '1',
    type: 'custom',
    sections: [
      { id: 's1', content: 'Section 1', size: { w: 1, h: 1 } },
      { id: 's2', content: 'Section 2', size: { w: 2, h: 1 } },
      { id: 's3', content: 'Section 3', size: { w: 1, h: 2 } },
      { id: 's4', content: 'Section 4', size: { w: 2, h: 2 } },
      { id: 's5', content: 'Section 5', size: { w: 3, h: 1 } },
      { id: 's6', content: 'Section 6', size: { w: 1, h: 3 } },
      // Add more sections with varying sizes
    ],
  })

  const handleDelete = () => {
    console.log('Delete page')
  }

  const handleMoveTowardsStart = () => {
    console.log('Move page towards start')
  }

  const handleMoveTowardsEnd = () => {
    console.log('Move page towards end')
  }

  const handleSectionOrderChange = (newOrder: string[]) => {
    const newSections = newOrder
      .map((id) => selectedPage.sections.find((section) => section.id === id))
      .filter((section): section is Section => section !== undefined)

    setSelectedPage((prev) => ({
      ...prev,
      sections: newSections,
    }))
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={2}
      borderColor={isDeleteHovered ? 'red' : 'inherit'}>
      <VStack align="start" spacing={4}>
        <HStack alignSelf={'flex-end'}>
          <>
            <Button
              leftIcon={<FaArrowLeft />}
              size="xs"
              onClick={handleMoveTowardsStart}
              isDisabled={false}>
              Move
            </Button>
            <Button
              rightIcon={<FaArrowRight />}
              size="xs"
              onClick={handleMoveTowardsEnd}
              isDisabled={false}>
              Move
            </Button>
          </>

          <Button
            onClick={handleDelete}
            leftIcon={<DeleteIcon />}
            size="xs"
            alignSelf={'flex-end'}
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}>
            Delete Page
          </Button>
        </HStack>

        {selectedPage.type === 'uploaded' && (
          <Text>Premade pages are not editable.</Text>
        )}

        {selectedPage.type === 'custom' && (
          <SortableContainer
            strategy="grid"
            gridProps={{ columns: 6, spacing: 4 }}
            items={selectedPage.sections.map((section) => section.id)}
            onDragEnd={handleSectionOrderChange}>
            {selectedPage.sections.map(({ id, content, size }) => (
              <SortableItem key={id} id={id} size={size}>
                <SectionEditor key={id} sectionId={id} />
              </SortableItem>
            ))}
          </SortableContainer>
        )}
      </VStack>
    </Box>
  )
}
