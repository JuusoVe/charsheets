import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconButton, Box, BoxProps } from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'

interface SortableItemProps {
  id: string
  children: React.ReactNode
  size?: { w: number; h: number }
  containerProps?: BoxProps
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  children,
  size = { w: 1, h: 1 },
  containerProps = {
    borderWidth: '1px',
    borderRadius: 'md',
    p: 2,
  },
}) => {
  const [isDragHovered, setIsDragHovered] = useState(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    gridColumnEnd: `span ${size.w}`,
    gridRowEnd: `span ${size.h}`,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      borderColor={isDragHovered ? 'blue.400' : 'inherit'}
      {...containerProps}>
      <Box display="flex" alignItems="flex-start">
        <IconButton
          icon={<DragHandleIcon />}
          {...listeners}
          {...attributes}
          aria-label="Drag handle"
          size="xs"
          mr={2}
          variant="ghost"
          onMouseEnter={() => setIsDragHovered(true)}
          onMouseLeave={() => setIsDragHovered(false)}
        />
        <Box flexGrow={1}>{children}</Box>
      </Box>
    </Box>
  )
}
