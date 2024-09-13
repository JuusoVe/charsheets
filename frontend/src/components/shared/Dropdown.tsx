import { Select, SelectProps } from '@chakra-ui/react'

interface DropdownProps extends SelectProps {
  options: { value: string; label: JSX.Element | string }[]
}

export const Dropdown = (props: DropdownProps) => {
  const { options, ...rest } = props
  return (
    <Select {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}
