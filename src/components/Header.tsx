import { Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  const linkStyle = {
    textDecoration: "none",
    padding: "8px 16px",
    borderBottom: "2px solid transparent",
    color: "#9ca3af",
    cursor: "pointer",
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* 顶部标题和账户信息 */}
      <Flex
        className="flex-row items-center mb-8"
        pt={4}
        w="100%"
        position="relative"
        justify="center"
      >
        <Flex
          className="flex-col justify-between items-center"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="#fbbf24">
            币安打新日历
          </Text>
          <Flex>
            <Link
              to="/monitor"
              style={{
                ...linkStyle,
                borderBottomColor: isActive("/monitor")
                  ? "#fbbf24"
                  : "transparent",
                color: isActive("/monitor") ? "#fbbf24" : "#9ca3af",
              }}
            >
              监控
            </Link>
            <Link
              to="/"
              style={{
                ...linkStyle,
                borderBottomColor: isActive("/") ? "#fbbf24" : "transparent",
                color: isActive("/") ? "#fbbf24" : "#9ca3af",
              }}
            >
              今日
            </Link>
            <Link
              to="/history"
              style={{
                ...linkStyle,
                borderBottomColor: isActive("/history")
                  ? "#fbbf24"
                  : "transparent",
                color: isActive("/history") ? "#fbbf24" : "#9ca3af",
              }}
            >
              历史
            </Link>
            <Link
              to="/trade"
              style={{
                ...linkStyle,
                borderBottomColor: isActive("/trade")
                  ? "#fbbf24"
                  : "transparent",
                color: isActive("/trade") ? "#fbbf24" : "#9ca3af",
              }}
            >
              交易设置
            </Link>
          </Flex>
        </Flex>
        <Flex
          className="flex flex-col items-end"
          textAlign="right"
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          pr={4}
        >
          <Text fontSize="sm" color="#9ca3af" mb={1}>
            账户余额:{" "}
            <Text as="span" color="#fbbf24">
              {/* 4124 USDT */}
            </Text>
          </Text>
          <Text fontSize="sm" color="#9ca3af">
            账户总价值:{" "}
            <Text as="span" color="#fbbf24">
              {/* 4124 USDT */}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Header;
