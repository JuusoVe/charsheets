import {
  RadioGroup,
  Stack,
  Radio,
  RadioGroupProps,
  FormControl,
  FormLabel,
  Flex,
  Image,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react'

interface RadioSelectProps extends Omit<RadioGroupProps, 'children'> {
  options: {
    value: string
    label: string
    imageSrc: string
    description: string
  }[]
  label?: string
}

export const RadioSelectWithImage = ({
  options,
  label,
  ...rest
}: RadioSelectProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...rest}>
        <Stack direction="column" spacing={10}>
          {options.map((option) => (
            <VStack key={option.value} align="left" spacing={2}>
              <Flex align="center">
                <Radio value={option.value}>{option.label}</Radio>
                <Box ml={2}>
                  <Image
                    src={option.imageSrc}
                    alt={`${option.label} Image`}
                    boxSize="50px"
                  />
                </Box>
              </Flex>
              <Text fontSize="sm">{option.description}</Text>
            </VStack>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}
