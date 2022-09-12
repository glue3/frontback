import * as React from 'react'
import Head from 'next/head'
import { Box, Text, Button, Select } from 'grommet'
import { TextInput } from 'src/components/TextInput'

const Distribute: React.FC = () => {
  return (
    <>
      <Head>
        <title>GLU3 - Distribute a token</title>
        <meta name="description" content="Distribute your tokens with GLU3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        alignContent="center"
        width="100%"
        height="91vh"
        align="center"
        flex
        direction="column"
      >
        <Text
          as="h2"
          size="xxlarge"
          margin={{ bottom: 'medium', top: 'small' }}
          textAlign="center"
        >
          Distribute your token <br />
          {'on Near Protocol'}
        </Text>
        <Box
          width={{ max: '500px', width: '90%' }}
          background="background-front"
          gap="small"
          pad="medium"
          round="small"
          margin="0 auto"
        >
          <Box
            margin="5px auto 0 auto"
            // border={{ size: 'xsmall' }}
            width="90%"
            flex
            direction="column"
            round="small"
            pad="0"
            background="background-back"
          >
            <Select
              options={['Test Token - TST', 'Staging Token - STG']}
              placeholder="choose the token"
              // width="100%"
              // height="400px"
              // margin="0"
              // pad="xsmall"
              // value={value}
              // onChange={({ option }) => setValue(option)}
            />
          </Box>
          <TextInput
            plain={true}
            focusIndicator={false}
            name="tokenSymbol"
            placeholder="destination wallet"
            size="large"
            textAlign="start"
          />
          <TextInput
            plain={true}
            focusIndicator={false}
            name="tokenName"
            type="number"
            step="0.1"
            placeholder="1000000 (amount)"
            size="large"
            textAlign="start"
            min={0}
          />

          <Button
            primary
            // disabled={!depositAmnt || isDepositing}
            // icon={isCreating ? <Spinner /> : undefined}
            label="Send"
            alignSelf="center"
            size="large"
            style={{
              width: '90%',
              margin: '0 auto',
              textAlign: 'center',
            }}
            // onClick={handleDeposit}
          />
        </Box>
        <Box
          width={{ max: '500px', width: '90%' }}
          background="background-front"
          gap="small"
          pad="medium"
          round="small"
          margin="40px auto 0 auto"
        >
          <Text size="small">YOUR API KEY:</Text>
          <Text weight="bold">ewfn23-23423nkj-234234-sdfdsf</Text>
        </Box>
      </Box>
    </>
  )
}

export default Distribute
