import { useRadioGroup, Grid, GridProps } from '@chakra-ui/react'
import {
  useMemo,
  Children,
  ReactElement,
  isValidElement,
  cloneElement,
} from 'react'
import { RadioCardProps } from './RadioCard'

interface RadioCardGroupProps<T> extends Omit<GridProps, 'onChange'> {
  name?: string
  value?: T
  defaultValue?: string
  onChange?: (value: T) => void
}

export const RadioCardGroup = <T extends string>(
  props: RadioCardGroupProps<T>,
) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  })

  const cards = useMemo(
    () =>
      Children.toArray(children)
        .filter<ReactElement<RadioCardProps>>(isValidElement)
        .map((card) => {
          return cloneElement(card, {
            radioProps: getRadioProps({
              value: card.props.value,
            }),
          })
        }),
    [children, getRadioProps],
  )

  return <Grid {...getRootProps(rest)}>{cards}</Grid>
}
