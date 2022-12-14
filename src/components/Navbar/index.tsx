import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Anchor,
  Box,
  Header,
  Menu,
  Nav,
  ResponsiveContext,
  Text,
} from 'grommet'
import { List, Unlink, Link as LinkIcon } from 'grommet-icons'
import Image from 'next/image'
import Link from 'next/link'
import { utils } from 'near-api-js'

import { NearContext } from 'src/near/nearContext'
import { CONTRACT_NAME } from 'src/near/config'

import { Clickable } from 'src/ui/Clickable'

export const Navbar: React.FC = () => {
  const router = useRouter()
  const { walletConnection, currentUser } = useContext(NearContext)
  const onConnectClick = async () => {
    await walletConnection?.requestSignIn(
      CONTRACT_NAME,
      `GLU3`,
      `${location.origin}/create`
    )
    // await walletConnection?.requestSignTransactions({
    //   transactions: ['deposit'],
    //   callbackUrl: `${location.origin}/stake`,
    // })
  }
  const onDisconnectClick = async () => {
    await walletConnection?.signOut()
    await router.push('/')
    router.reload()
  }
  return (
    <Header
      align="center"
      direction="row"
      flex={false}
      justify="between"
      gap="small"
      fill="horizontal"
      pad="small"
    >
      <Box align="center" flex justify="center" direction="row" gap="small">
        <Box align="center" flex justify="between" direction="row" gap="xsmall">
          {currentUser && currentUser?.isSignedIn ? (
            <ResponsiveContext.Consumer>
              {(responsive) =>
                responsive === 'small' ? (
                  <Menu
                    // label="Click me"
                    icon={<List />}
                    items={[
                      {
                        label: 'Create Token',
                        onClick: () => router.push('/stake'),
                      },
                      {
                        label: 'Distribute',
                        onClick: () => router.push('/stake'),
                      },
                      { label: 'Create NFT (soon)', disabled: true },
                    ]}
                  />
                ) : (
                  <Nav align="center" flex={false} direction="row">
                    <Clickable>
                      <Link href="/">
                        {/*<Text size="xsmall" weight="bolder">*/}
                        {/*  GLU3*/}
                        {/*</Text>*/}
                        <Image
                          src="/images/glue_logo.png"
                          width={75}
                          height={33}
                          alt="GLU3 logo"
                        />
                      </Link>
                    </Clickable>
                    <Anchor
                      label="create token"
                      reverse={false}
                      margin="xsmall"
                      weight="normal"
                      size="medium"
                      onClick={() => router.push('/create')}
                    />
                    <Anchor
                      label="distribute"
                      margin="xsmall"
                      weight="normal"
                      size="medium"
                      reverse={false}
                      onClick={() => router.push('/distribute')}
                    />
                    <Anchor
                      label="create NFT (soon)"
                      margin="xsmall"
                      weight="normal"
                      size="medium"
                      reverse={false}
                      onClick={() => router.push('/borrow')}
                      disabled
                    />
                  </Nav>
                )
              }
            </ResponsiveContext.Consumer>
          ) : (
            <Image
              alt="GLU3 small logo"
              src="/images/glue_logo.png"
              width={75}
              height={33}
              onClick={() => router.push('/')}
              // layout="fixed"
            />
          )}
          <div>
            {currentUser && currentUser?.isSignedIn ? (
              <Box
                round
                background="background-back"
                height="50px"
                alignContent="center"
                align="center"
                flex
                direction="row"
                gap="small"
                pad="medium"
              >
                <Text size="small">{currentUser?.accountId}</Text>
                <Box
                  round
                  height="40px"
                  justify="center"
                  pad="small"
                  background="gradient"
                  // background="linear-gradient(126deg, rgb(50.588% 99.608% 91.373%) 0%, rgb(56.144% 92.77% 92.417%) 6.25%, rgb(61.342% 86.373% 93.395%) 12.5%, rgb(66.181% 80.417% 94.305%) 18.75%, rgb(70.662% 74.902% 95.147%) 25%, rgb(74.784% 69.828% 95.922%) 31.25%, rgb(78.548% 65.196% 96.63%) 37.5%, rgb(81.953% 61.005% 97.27%) 43.75%, rgb(85% 57.255% 97.843%) 50%, rgb(87.688% 53.946% 98.349%) 56.25%, rgb(90.018% 51.078% 98.787%) 62.5%, rgb(91.99% 48.652% 99.157%) 68.75%, rgb(93.603% 46.667% 99.461%) 75%, rgb(94.858% 45.123% 99.697%) 81.25%, rgb(95.754% 44.02% 99.865%) 87.5%, rgb(96.291% 43.358% 99.966%) 93.75%, rgb(96.471% 43.137% 100%) 100% )"
                >
                  <Text size="medium" weight={200} alignSelf="center">
                    {Number(
                      utils.format.formatNearAmount(currentUser?.balance || '0')
                    ).toFixed(2)}
                  </Text>
                </Box>
                <Anchor onClick={onDisconnectClick} icon={<Unlink />} />
              </Box>
            ) : (
              <Box
                round
                background="background-back"
                height="50px"
                alignContent="center"
                align="center"
                flex
                direction="row"
                gap="small"
                pad="medium"
              >
                <Anchor
                  onClick={onConnectClick}
                  label="Connect"
                  icon={<LinkIcon />}
                />
              </Box>
            )}
          </div>
        </Box>
      </Box>
    </Header>
  )
}
