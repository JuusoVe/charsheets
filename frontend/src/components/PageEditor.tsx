import React, { useState } from 'react'
import { Box, useToast, Flex } from '@chakra-ui/react'
import GridLayout, { Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { SectionEditor } from './SectionEditor'
import { SectionPopoverMenu } from './SectionPopoverMenu'
import { ai_layout } from '../constats'
import { Section, Page } from '../types'

const DEFAULT_SECTIONS: Section[] = ai_layout

export const PageEditor: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS)

  const [selectedPage, setSelectedPage] = useState<Page>({
    id: '1',
    sections: DEFAULT_SECTIONS.map(({ id }) => id),
  })

  const toast = useToast()

  const handleDeleteSection = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId),
    )
    setSelectedPage((prevPage) => ({
      ...prevPage,
      sections: prevPage.sections.filter((id) => id !== sectionId),
    }))
  }

  const handleDuplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find(
      (section) => section.id === sectionId,
    )
    if (!sectionToDuplicate) return

    const newSectionId = `s${Date.now()}`
    const availableSpot = findAvailableSpot(sections, sectionToDuplicate)

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

    const newSection: Section = {
      ...sectionToDuplicate,
      id: newSectionId,
      x: availableSpot.x,
      y: availableSpot.y,
    }

    setSections((prevSections) => [...prevSections, newSection])
    setSelectedPage((prevPage) => ({
      ...prevPage,
      sections: [...prevPage.sections, newSectionId],
    }))
  }

  const findAvailableSpot = (
    layout: Section[],
    originalItem: Section,
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
    layout: Section[],
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

    setSections((prevSections) =>
      prevSections.map((section) => {
        const updatedLayout = validLayout.find((item) => item.i === section.id)
        return updatedLayout
          ? {
              ...section,
              x: updatedLayout.x,
              y: updatedLayout.y,
              w: updatedLayout.w,
              h: updatedLayout.h,
            }
          : section
      }),
    )
  }

  const ROWS = 16
  const ROW_HEIGHT = 60
  const totalHeight = ROWS * ROW_HEIGHT + 200

  const pageSections = selectedPage.sections
    .map((sectionId) => sections.find((section) => section.id === sectionId))
    .filter(Boolean) as Section[]

  return (
    <Flex
      boxShadow={'md'}
      bgColor={'white'}
      borderRadius={'md'}
      p={4}
      h={`${totalHeight}px`}
      w={1200 + 32}
      flex={1}>
      <GridLayout
        className="layout"
        layout={pageSections.map(({ id, x, y, w, h }) => ({
          i: id,
          x,
          y,
          w,
          h,
        }))}
        cols={12}
        maxRows={16}
        rowHeight={ROW_HEIGHT}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
        compactType={null}
        preventCollision={true}
        autoSize={false}>
        {pageSections.map((section) => (
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
              content={section.title}
            />
          </Box>
        ))}
      </GridLayout>
    </Flex>
  )
}
