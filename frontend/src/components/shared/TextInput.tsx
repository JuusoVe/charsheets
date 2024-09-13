import { Input, FormControl, FormLabel, InputProps } from '@chakra-ui/react'

interface TextInputProps extends InputProps {
  label?: string
}

export const TextInput = ({ label, ...rest }: TextInputProps) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Input type="text" {...rest} />
    </FormControl>
  )
}
