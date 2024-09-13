import React from 'react'
import { DeleteIcon, DragHandleIcon, CopyIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Popover,
  PopoverTrigger,
  Button,
  PopoverBody,
  PopoverContent,
  VStack,
} from '@chakra-ui/react'

type SectionPopoverMenuProps = {
  sectionId: string
  onDeleteSection: (sectionId: string) => void
  onDuplicateSection: (sectionId: string) => void
}

export const SectionPopoverMenu: React.FC<SectionPopoverMenuProps> = ({
  sectionId,
  onDeleteSection,
  onDuplicateSection,
}) => {
  return (
    <Popover placement="top-start" closeOnBlur={true} trigger="hover">
      <PopoverTrigger>
        <IconButton
          h={4}
          w={2}
          className="drag-handle"
          icon={<DragHandleIcon h={2} />}
          aria-label="Drag handle"
          variant="ghost"
          size="2xs"
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverBody p={1} m={0}>
          <VStack align="stretch" spacing={0}>
            <Button
              leftIcon={<CopyIcon />}
              size="2xs"
              onClick={() => onDuplicateSection(sectionId)}
              variant="ghost"
              justifyContent="flex-start"
              px={8}>
              Duplicate
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              leftIcon={<DeleteIcon />}
              size="2xs"
              onClick={() => onDeleteSection(sectionId)}
              justifyContent="flex-start"
              px={8}>
              Delete
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
