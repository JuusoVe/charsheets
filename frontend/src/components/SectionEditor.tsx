import React from 'react'
import { Box, Text } from '@chakra-ui/react'

interface SectionEditorProps {
  sectionId: string
  content: string
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  sectionId,
  content,
}) => {
  return (
    <Box>
      <Text contentEditable>{content}</Text>
    </Box>
  )
}
