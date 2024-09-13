import {
  InputGroup,
  Input,
  InputRightAddon,
  InputProps,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react'

interface NumericInputProps extends InputProps {
  label?: string
  unit?: string
  description?: JSX.Element
}

export const NumericInput = ({
  label,
  unit,
  description,
  ...rest
}: NumericInputProps) => {
  return (
    <FormControl>
      <InputGroup>
        <FormLabel m={0}>{label}</FormLabel>
        <Input type="number" {...rest} />
        {unit && <InputRightAddon>{unit}</InputRightAddon>}
      </InputGroup>
      {description && <Text>{description}</Text>}
    </FormControl>
  )
}
