import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const linkStyle = {
    textDecoration: 'none',
    padding: '8px 16px',
    borderBottom: '2px solid transparent',
    color: '#9ca3af',
    cursor: 'pointer',
  }

  return (
    <>
      {/* 顶部标题和账户信息 */}
      <Flex className='flex-row items-center mb-8' pt={4} w="100%">
        <Flex
          className='flex-col justify-between items-center'
          flex="1"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="#fbbf24">
            币安打新日历
          </Text>
          <Flex>
            <Link
              to="/"
              style={{
                ...linkStyle,
                borderBottomColor: isHome ? '#fbbf24' : 'transparent',
                color: isHome ? '#fbbf24' : '#9ca3af',
              }}
            >
              今日
            </Link>
            <Link
              to="/history"
              style={{
                ...linkStyle,
                borderBottomColor: !isHome ? '#fbbf24' : 'transparent',
                color: !isHome ? '#fbbf24' : '#9ca3af',
              }}
            >
              历史
            </Link>
          </Flex>
        </Flex>
        <Box
          className='flex flex-col items-end'
          textAlign="right"
          ml="auto"
          mr={6}
        >
          <Text fontSize="sm" color="#9ca3af" mb={1}>
            账户余额: <Text as="span" color="#fbbf24">4124 USDT</Text>
          </Text>
          <Text fontSize="sm" color="#9ca3af">
            账户总价值: <Text as="span" color="#fbbf24">4124 USDT</Text>
          </Text>
      </Box>
        
      </Flex>
    </>
  )
}

export default Header

