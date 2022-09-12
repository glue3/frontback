import { Box, TextInput as Input, TextInputProps } from 'grommet'
import * as React from 'react'

export const TextInput = (props: TextInputProps) => {
  return (
    <Box
      margin="5px auto 0 auto"
      border={{ size: 'xsmall' }}
      width="90%"
      flex
      direction="column"
      round="small"
      pad="xsmall"
      background="background-back"
    >
      <Input {...props} />
    </Box>
  )
}
