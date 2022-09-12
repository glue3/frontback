import * as React from 'react'
import Head from 'next/head'
// import { utils } from 'near-api-js'
import { Box, Text, Button, CheckBox, Spinner } from 'grommet'

import { TextInput } from 'src/components/TextInput'
import { NearContext } from 'src/near/nearContext'
// import { useGetNearQuoteQuery } from 'src/redux/api/nearQuote'
import { useGetBalance } from 'src/hooks/useGetBalance'
// import { useGetStats } from 'src/hooks/useGetStats'
// import { toNumber } from 'src/utils/numbers'

// import { SwapInput } from 'src/components/SwapInput'

const Create: React.FC = () => {
  const { contract } = React.useContext(NearContext)
  const [tokenName, setTokenName] = React.useState<string>('')
  const [tokenSymbol, setTokenSymbol] = React.useState<string>('')
  const [tokenSupply, setTokenSupply] = React.useState<string>('')
  const [tokenDecimals, setTokenDecimals] = React.useState<string>('')
  const [canMint, setCanMint] = React.useState<boolean>(false)
  const [canBurn, setCanBurn] = React.useState<boolean>(false)
  const [canChangeOwnwer, setCanChangeOwnwer] = React.useState<boolean>(false)

  const [isLoading, setIsLoading] = React.useState(false)
  const { nearBalance } = useGetBalance()
  // const { stats } = useGetStats()

  const isDisabled =
    !tokenName || !tokenSymbol || !tokenSupply || !tokenDecimals

  // const { data: nearQuote } = useGetNearQuoteQuery(undefined, {
  //   pollingInterval: 60000, // set to 60 seconds
  // })

  const handleCreate = async () => {
    setIsLoading(true)
    await contract?.createToken({
      tokenName,
      symbol: tokenSymbol,
      supply: tokenSupply,
      decimals: tokenDecimals,
      canBurn,
      canMint,
    })
    console.log({ tokenName, tokenSymbol, tokenSupply, tokenDecimals })
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>GLU3 - Create a token</title>
        <meta name="description" content="Create your own tokens with GLU3" />
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
          Create your token <br />
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
          <TextInput
            plain={true}
            focusIndicator={false}
            name="tokenName"
            placeholder="token name"
            size="large"
            textAlign="start"
            onChange={(evt) => setTokenName(evt.target.value)}
          />
          <TextInput
            plain={true}
            focusIndicator={false}
            name="tokenSymbol"
            placeholder="token symbol"
            size="large"
            textAlign="start"
            onChange={(evt) => setTokenSymbol(evt.target.value)}
          />
          <TextInput
            plain={true}
            focusIndicator={false}
            name="tokenSupply"
            type="number"
            step="1"
            placeholder="1000000 (initial supply)"
            size="large"
            textAlign="start"
            min={0}
            onChange={(evt) => setTokenSupply(evt.target.value)}
          />
          <TextInput
            plain={true}
            focusIndicator={false}
            name="tokenDecimals"
            type="number"
            step="1"
            placeholder="18 (decimals)"
            size="large"
            textAlign="start"
            min={0}
            onChange={(evt) => setTokenDecimals(evt.target.value)}
          />
          <Box
            direction="column"
            justify="start"
            gap="small"
            background="background-back"
            pad="small"
            round="small"
            width="90%"
            margin={'0px auto 10px auto'}
          >
            <Box direction="row">
              <CheckBox
                pad="0 8px 0 0"
                checked={canMint}
                onChange={() => setCanMint(!canMint)}
              />
              <Text size="small" textAlign="center">
                Can Mint
              </Text>
            </Box>
            <Box direction="row">
              <CheckBox
                pad="0 8px 0 0"
                checked={canBurn}
                onChange={() => setCanBurn(!canBurn)}
              />
              <Text size="small" textAlign="center">
                Can Burn
              </Text>
            </Box>
            <Box direction="row">
              <CheckBox
                pad="0 8px 0 0"
                checked={canChangeOwnwer}
                onChange={() => setCanChangeOwnwer(!canChangeOwnwer)}
              />
              <Text size="small" textAlign="center">
                Can change owner
              </Text>
            </Box>
          </Box>
          <Button
            primary
            disabled={isDisabled || isLoading}
            icon={isLoading ? <Spinner /> : undefined}
            label="Create"
            alignSelf="center"
            size="large"
            style={{
              width: '90%',
              margin: '0 auto',
              textAlign: 'center',
            }}
            onClick={handleCreate}
          />
        </Box>
      </Box>
    </>
  )
}

export default Create
