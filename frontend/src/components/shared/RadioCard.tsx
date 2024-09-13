import {
  BoxProps,
  UseRadioProps,
  useRadio,
  useStyleConfig,
  Stack,
  Box,
  Card,
  Tag,
  Center,
} from '@chakra-ui/react'
import { useId } from 'react'

export interface RadioCardProps extends BoxProps {
  value: string
  radioProps?: UseRadioProps
}
export const RadioCard = (props: RadioCardProps) => {
  const { radioProps, children, ...rest } = props
  const { getInputProps, getRadioProps, getLabelProps, state } =
    useRadio(radioProps)
  const id = useId()

  const styles = useStyleConfig('RadioCard', props)
  const inputProps = getInputProps()
  const checkboxProps = getRadioProps()
  const labelProps = getLabelProps()
  return (
    <Card
      as="label"
      cursor="pointer"
      {...labelProps}
      aspectRatio={1}
      sx={{
        '.focus-visible + [data-focus]': {
          boxShadow: 'outline',
          zIndex: 1,
        },
        borderRadius: 'lg',
        borderWidth: '1px',
        borderColor: 'gray.200',
        _checked: {
          backgroundColor: 'gray.100',
          color: 'orange.400',
        },
      }}>
      <input {...inputProps} aria-labelledby={id} />
      <Center sx={styles} {...checkboxProps} {...rest}>
        <Stack direction="row">
          <Box flex="1">{children}</Box>
          {state.isChecked && (
            <Tag
              color="white"
              backgroundColor={'orange.400'}
              position={'absolute'}
              top={{ base: 2, md: 4 }}
              left={{ base: 2, md: 4 }}
              py={{ base: 1, md: 2 }}
              px={2}
              size={{ base: 'sm', md: 'lg' }}
              fontWeight={'bold'}>
              Valittu
            </Tag>
          )}
        </Stack>
      </Center>
    </Card>
  )
}
