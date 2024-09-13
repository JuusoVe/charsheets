import React from 'react'
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  CollisionDetection,
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
  arrayMove,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable'
import { SimpleGrid } from '@chakra-ui/react'

interface SortableBoxProps {
  items: string[]
  onDragEnd: (newOrder: string[]) => void
  children: React.ReactNode
  strategy?: 'vertical' | 'horizontal' | 'grid'
  gridProps?: React.ComponentProps<typeof SimpleGrid>
}

export const SortableContainer: React.FC<SortableBoxProps> = ({
  items,
  onDragEnd,
  children,
  strategy = 'vertical',
  gridProps,
}) => {
  const strategyMap = {
    vertical: verticalListSortingStrategy,
    horizontal: horizontalListSortingStrategy,
    grid: rectSwappingStrategy,
  }
  const sortStrategy = strategyMap[strategy]
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const collisionDetection: CollisionDetection = closestCorners

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id && over) {
      const oldIndex = items.indexOf(active.id)
      const newIndex = items.indexOf(over.id)
      const newOrder = arrayMove(items, oldIndex, newIndex)
      onDragEnd(newOrder)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={sortStrategy}>
        <SimpleGrid columns={6} spacing={4} {...gridProps}>
          {children}
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  )
}
