import React, { useState } from 'react'
import { Box, VStack, HStack, useToast } from '@chakra-ui/react'
import GridLayout, { Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { SectionEditor } from './SectionEditor'
import { SectionPopoverMenu } from './SectionPopoverMenu'

type Section = {
  id: string
  content: string
}

type Page = {
  id: string
  type: 'uploaded' | 'custom'
  sections: Section['id'][]
  layout: Layout[]
}

export const PageEditor: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: 's1', content: 'Section 1' },
    { id: 's2', content: 'Section 2' },
    { id: 's3', content: 'Section 3' },
    { id: 's4', content: 'Section 4 (Large)' },
    { id: 's5', content: 'Section 5' },
    { id: 's6', content: 'Section 6' },
    { id: 's7', content: 'Section 7' },
  ])

  const [selectedPage, setSelectedPage] = useState<Page>({
    id: '1',
    type: 'custom',
    sections: ['s1', 's2', 's3', 's4', 's5', 's6', 's7'],
    layout: [
      { i: 's1', x: 0, y: 0, w: 2, h: 2 },
      { i: 's2', x: 2, y: 0, w: 2, h: 2 },
      { i: 's3', x: 4, y: 0, w: 2, h: 2 },
      { i: 's4', x: 0, y: 2, w: 4, h: 2 },
      { i: 's5', x: 4, y: 2, w: 2, h: 4 },
      { i: 's6', x: 0, y: 4, w: 2, h: 2 },
      { i: 's7', x: 2, y: 4, w: 2, h: 2 },
    ],
  })

  const toast = useToast()

  const handleDeleteSection = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId),
    )
    setSelectedPage((prevPage) => ({
      ...prevPage,
      sections: prevPage.sections.filter((id) => id !== sectionId),
      layout: prevPage.layout.filter((item) => item.i !== sectionId),
    }))
  }

  const handleDuplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find(
      (section) => section.id === sectionId,
    )
    if (!sectionToDuplicate) return

    const newSectionId = `s${Date.now()}`
    const newSection: Section = {
      id: newSectionId,
      content: sectionToDuplicate.content,
    }

    const originalLayout = selectedPage.layout.find(
      (item) => item.i === sectionId,
    )
    if (!originalLayout) return

    const availableSpot = findAvailableSpot(selectedPage.layout, originalLayout)

    if (!availableSpot) {
      toast({
        title: 'No space available',
        description: "There's no space to duplicate this section.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setSections((prevSections) => [...prevSections, newSection])

    setSelectedPage((prevPage) => {
      const sectionIndex = prevPage.sections.indexOf(sectionId)
      const newSections = [...prevPage.sections]
      newSections.splice(sectionIndex + 1, 0, newSectionId)

      const newLayout: Layout = {
        ...originalLayout,
        i: newSectionId,
        x: availableSpot.x,
        y: availableSpot.y,
      }

      return {
        ...prevPage,
        sections: newSections,
        layout: [...prevPage.layout, newLayout],
      }
    })
  }

  const findAvailableSpot = (
    layout: Layout[],
    originalItem: Layout,
  ): { x: number; y: number } | null => {
    const maxX = 12 - originalItem.w
    const maxY = 16 - originalItem.h

    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x <= maxX; x++) {
        if (isSpotAvailable(layout, x, y, originalItem.w, originalItem.h)) {
          return { x, y }
        }
      }
    }

    return null
  }

  const isSpotAvailable = (
    layout: Layout[],
    x: number,
    y: number,
    w: number,
    h: number,
  ): boolean => {
    return !layout.some(
      (item) =>
        x < item.x + item.w &&
        x + w > item.x &&
        y < item.y + item.h &&
        y + h > item.y,
    )
  }

  const onLayoutChange = (newLayout: Layout[]) => {
    const validLayout = newLayout.filter((item) => item.y + item.h <= 16)

    setSelectedPage((prev) => ({
      ...prev,
      layout: validLayout,
    }))
  }

  const ROWS = 16
  const ROW_HEIGHT = 60
  const totalHeight = ROWS * ROW_HEIGHT + 240

  const pageSections = selectedPage.sections
    .map((sectionId) => sections.find((section) => section.id === sectionId))
    .filter(Boolean) as Section[]

  return (
    <Box
      boxShadow={'md'}
      bgColor={'white'}
      borderRadius={'md'}
      p={4}
      h={`${totalHeight}px`}>
      <VStack align="start" spacing={4}>
        <HStack alignSelf="flex-end"></HStack>
        {selectedPage.type === 'custom' && (
          <GridLayout
            className="layout"
            layout={selectedPage.layout}
            cols={12}
            maxRows={16}
            rowHeight={ROW_HEIGHT}
            width={1200}
            onLayoutChange={onLayoutChange}
            draggableHandle=".drag-handle"
            compactType={null}
            preventCollision={true}
            autoSize={false}>
            {pageSections.map((section) => {
              return (
                <Box
                  key={section.id}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="white"
                  display="flex"
                  flexDirection="column"
                  boxShadow="sm">
                  <SectionPopoverMenu
                    sectionId={section.id}
                    onDeleteSection={handleDeleteSection}
                    onDuplicateSection={handleDuplicateSection}
                  />
                  <SectionEditor
                    key={section.id}
                    sectionId={section.id}
                    content={section.content}
                  />
                </Box>
              )
            })}
          </GridLayout>
        )}
      </VStack>
    </Box>
  )
}
