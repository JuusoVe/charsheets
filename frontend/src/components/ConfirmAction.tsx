import * as React from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

interface ConfirmActionProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  headerText: string
  bodyText: string
  confirmButtonText: string
  cancelButtonText?: string
  isLoading?: boolean
}

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  isOpen,
  onClose,
  onConfirm,
  headerText,
  bodyText,
  confirmButtonText,
  cancelButtonText = 'Cancel',
  isLoading = false,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {headerText}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyText}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelButtonText}
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
              isLoading={isLoading}>
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
