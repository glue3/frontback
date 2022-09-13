import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Text, Box } from 'grommet'
import styled from 'styled-components'

const MainContainer = styled.div`
  padding: 0 2rem;
`

const Home: NextPage = () => {
  return (
    <>
      <MainContainer>
        <Head>
          <title>GLU3</title>
          <meta name="description" content="Web3 for the masses" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Box
          align="center"
          flex
          justify="center"
          direction="column"
          gap="big"
          height="calc(100vh - 75px)"
        >
          <Text size="5xl" weight="bolder">
            GLU3
          </Text>
          <br />
          <Box width="90%">
            <Image
              src="/images/two_worlds_transparent.png"
              alt="Web2 and Web3 united by GLU3"
              width={2304}
              height={916}
              objectFit="scale-down"
            />
          </Box>
          <Text
            as="h1"
            textAlign="center"
            size="3xl"
            weight="lighter"
            color="text-weak"
          >
            Closing the gap
            <br />
            from <b>Web2</b> to <b>Web3</b>
            <br />
            with
            <Image
              src="/images/near_logo.svg"
              alt="Near Protocol"
              width={250}
              height={90}
              objectPosition="15px 20px"
              objectFit="scale-down"
            />
          </Text>
          <br />
        </Box>
      </MainContainer>
    </>
  )
}

export default Home
