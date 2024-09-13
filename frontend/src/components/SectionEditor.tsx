import React, { useState } from 'react'
import { Box, IconButton, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { RadioSelect } from './shared/RadioSelect'
import { Section } from '../types'

type SectionEditorProps = {
  sectionId: string
}

const SECTION_TYPE_OPTIONS = [
  { label: 'Text Area', value: 'textArea' },
  { label: 'Products', value: 'products' },
  { label: 'Modules Table', value: 'modulesTable' },
]

export const SectionEditor: React.FC<SectionEditorProps> = ({ sectionId }) => {
  const [isDeleteHovered, setIsDeleteHovered] = useState(false)
  const [section, setSection] = useState<Section>({
    id: sectionId,
    content: '',
    type: 'textArea',
  })

  const handleSectionTypeChange = (newType: string) => {
    setSection((prev) => ({ ...prev, type: newType as Section['type'] }))
  }

  const deleteSection = (id: string) => {
    console.log('Delete section with id:', id)
  }

  return (
    <Box
      key={section.id}
      borderWidth="1px"
      borderRadius="md"
      p={2}
      width="100%"
      position="relative"
      borderColor={isDeleteHovered ? 'red' : 'inherit'}>
      <Flex justifyContent="flex-end">
        <RadioSelect
          value={section.type}
          options={SECTION_TYPE_OPTIONS}
          onChange={handleSectionTypeChange}
          mr={2}
        />
        <IconButton
          aria-label="Delete section"
          icon={<DeleteIcon />}
          size="xs"
          onClick={() => deleteSection(section.id)}
          mb={2}
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
        />
      </Flex>

      {section.type === 'textArea' && <div>Text Area Editor Placeholder</div>}
    </Box>
  )
}
