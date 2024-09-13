import {
  RadioGroup,
  Stack,
  Radio,
  RadioGroupProps,
  FormControl,
  Flex,
  FlexProps,
  FormLabelProps,
  RadioProps,
  chakra,
} from '@chakra-ui/react'

export interface RadioSelectProps extends Omit<RadioGroupProps, 'children'> {
  options: { value: string; label: string }[]
  label?: string | JSX.Element
  labelProps?: FormLabelProps
  containerProps?: FlexProps
  optionProps?: RadioProps
}

export const RadioSelect = ({
  options,
  label,
  labelProps,
  containerProps,
  optionProps,
  ...rest
}: RadioSelectProps) => {
  return (
    <FormControl>
      <Flex {...containerProps}>
        <chakra.span {...labelProps}>{label}</chakra.span>
        <RadioGroup {...rest}>
          <Stack direction="row">
            {options.map((option) => (
              <Radio key={option.value} value={option.value} {...optionProps}>
                {option.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Flex>
    </FormControl>
  )
}
