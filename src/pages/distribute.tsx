import * as React from 'react'
import Head from 'next/head'
import { utils } from 'near-api-js'
import { Box, Text, Button, Spinner } from 'grommet'

import { TextInput } from 'src/components/TextInput'
import { NearContext } from 'src/near/nearContext'
import axios from 'axios'

const Distribute: React.FC = () => {
  const { contract, currentUser } = React.useContext(NearContext)
  const [amount, setAmount] = React.useState<string>('')
  const [walletAddress, setWalletAddress] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [apiKey, setApiKey] = React.useState<string>('')

  const getApiKey = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('api/apiKey', {
        params: { wallet: currentUser?.accountId },
      })
      const { apiKey: newApiKey } = res.data
      if (newApiKey) {
        setApiKey(newApiKey)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  // on Mount
  React.useEffect(() => {
    getApiKey()
  }, [])

  const isDisabled = !amount || !walletAddress

  const cleanForm = () => {
    setAmount('')
    setWalletAddress('')
  }

  const handleTransfer = async () => {
    try {
      setIsLoading(true)
      await contract?.ft_transfer(
        {
          receiver_id: walletAddress,
          amount: utils.format.parseNearAmount(amount),
        },
        '300000000000000'
      )
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
      cleanForm()
    }
  }

  return (
    <>
      <Head>
        <title>GLU3 - Distribute a token</title>
        <meta name="description" content="Distribute your tokens with GLU3" />
        <link rel="icon" href="/favicon.png" />
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
          {apiKey ? (
            <>
              <TextInput
                plain={true}
                focusIndicator={false}
                name="walletAddress"
                placeholder="destination wallet"
                size="large"
                textAlign="start"
                value={walletAddress}
                onChange={(evt) => setWalletAddress(evt.target.value)}
              />
              <TextInput
                plain={true}
                focusIndicator={false}
                name="amount"
                type="number"
                step="0.1"
                placeholder="1000000 (amount)"
                size="large"
                textAlign="start"
                min={0}
                value={amount}
                onChange={(evt) => setAmount(evt.target.value)}
              />
              <Button
                primary
                disabled={isDisabled || isLoading}
                icon={isLoading ? <Spinner /> : undefined}
                label="Send"
                alignSelf="center"
                size="large"
                margin="20px auto 0 auto"
                style={{
                  width: '90%',
                  textAlign: 'center',
                }}
                onClick={handleTransfer}
              />
            </>
          ) : (
            <Box
              height="400px"
              direction="column"
              justify="center"
              align="center"
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <Text>
                  Please, head to the create token section <br />
                  in order to create your first token.
                </Text>
              )}
            </Box>
          )}
        </Box>
        {apiKey ? (
          <Box
            width={{ max: '500px', width: '90%' }}
            background="background-front"
            gap="small"
            pad="medium"
            round="small"
            margin="40px auto 0 auto"
            justify="center"
            align="center"
          >
            <Text size="large">YOUR API KEY:</Text>
            <Text weight="bold" size="small">
              {apiKey}
            </Text>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Distribute
