import { Box, Text, Flex } from "@chakra-ui/react";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = {
  padding: "12px 16px",
  textAlign: "left" as const,
  backgroundColor: "#1f2937",
  color: "#d1d5db",
  fontWeight: "600",
  borderBottom: "1px solid #374151",
  cursor: "pointer",
};

const tdStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #374151",
  color: "#d1d5db",
};

// 历史空投数据
const historyData = [
  {
    id: 1,
    symbol: "VSN",
    name: "Vision",
    score: 252,
    scoreUnit: "4.3万份",
    quantity: 400,
    quantityValue: "$36.6",
    mc: "314.8M",
    date: "11-28",
    pinned: true,
  },
  {
    id: 2,
    symbol: "GUA",
    name: "SUPERFORTUNE",
    score: 256,
    scoreUnit: "2万份",
    quantity: 750,
    quantityValue: "$87.9",
    mc: "5.3M",
    date: "11-27",
    pinned: true,
  },
  {
    id: 3,
    symbol: "SOON",
    name: "SOON",
    score: 241,
    scoreUnit: "3万份",
    quantity: 55,
    quantityValue: "$29.9",
    mc: "161.4M",
    date: "11-26",
    pinned: true,
  },
  {
    id: 4,
    symbol: "IRYS",
    name: "Irys",
    score: 241,
    scoreUnit: "7.5万份",
    quantity: 1200,
    quantityValue: "$41.1",
    mc: "71.6M",
    date: "11-25",
    pinned: true,
  },
  {
    id: 5,
    symbol: "SSS",
    name: "Sparkle Token",
    score: 256,
    scoreUnit: "1.6万份",
    quantity: 640,
    quantityValue: "$3.9",
    mc: "750.8K",
    date: "11-24",
    pinned: true,
  },
  {
    id: 6,
    symbol: "KO",
    name: "Kyuzo's Friends",
    score: 256,
    scoreUnit: "1.6万份",
    quantity: 640,
    quantityValue: "$11.8",
    mc: "4.0M",
    date: "11-23",
    pinned: true,
  },
  {
    id: 7,
    symbol: "DIGI",
    name: "MineD",
    score: 256,
    scoreUnit: "1.3万份",
    quantity: 75000,
    quantityValue: "$4.9",
    mc: "1.5M",
    date: "11-22",
    pinned: true,
  },
  {
    id: 8,
    symbol: "ARTX",
    name: "ULTILAND",
    score: 255,
    scoreUnit: "1.4万份",
    quantity: 200,
    quantityValue: "$30.0",
    mc: "6.4M",
    date: "11-21",
    pinned: true,
  },
  {
    id: 9,
    symbol: "BOB",
    name: "BOB",
    score: 240,
    scoreUnit: "6.3万份",
    quantity: 1600,
    quantityValue: "$23.7",
    mc: "32.9M",
    date: "11-20",
    pinned: true,
  },
];

function History() {
  return (
    <Box>
      {/* 标题 */}
      <Flex alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" color="#fbbf24" mr={2}>
          🕐
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="#fbbf24">
          历史空投
        </Text>
      </Flex>

      {/* 表格 */}
      <Box
        border="1px solid"
        borderColor="#374151"
        borderRadius="md"
        overflow="hidden"
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>
                <Flex alignItems="center" gap={1}>
                  项目
                  <Text fontSize="xs" color="#9ca3af">
                    ▼
                  </Text>
                </Flex>
              </th>
              <th style={thStyle}>
                <Flex alignItems="center" gap={1}>
                  积分
                  <Text fontSize="xs" color="#9ca3af">
                    ▼
                  </Text>
                </Flex>
              </th>
              <th style={thStyle}>
                <Flex alignItems="center" gap={1}>
                  数量
                  <Text fontSize="xs" color="#9ca3af">
                    ▼
                  </Text>
                </Flex>
              </th>
              <th style={{ ...thStyle, color: "#fbbf24" }}>
                <Flex alignItems="center" gap={1}>
                  MC
                  <Text fontSize="xs" color="#fbbf24">
                    ▼
                  </Text>
                </Flex>
              </th>
              <th style={thStyle}>日期</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>
                  <Flex alignItems="center" gap={2}>
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="2px"
                      bg={
                        item.symbol === "IRYS" || item.symbol === "BOB"
                          ? "#10b981"
                          : "#6b7280"
                      }
                    />
                    <Box>
                      <Text fontWeight="bold">{item.symbol}</Text>
                      <Text fontSize="xs" color="#9ca3af">
                        {item.name}
                      </Text>
                    </Box>
                  </Flex>
                </td>
                <td style={tdStyle}>
                  <Text>{item.score}</Text>
                  <Text fontSize="xs" color="#9ca3af">
                    {item.scoreUnit}
                  </Text>
                </td>
                <td style={tdStyle}>
                  <Text>{item.quantity.toLocaleString()}</Text>
                  <Text fontSize="xs" color="#fbbf24">
                    {item.quantityValue}
                  </Text>
                </td>
                <td style={tdStyle}>
                  <Text>{item.mc}</Text>
                </td>
                <td style={tdStyle}>
                  <Text>{item.date}</Text>
                </td>
                <td style={tdStyle}>
                  <Text fontSize="lg" color="#fbbf24" cursor="pointer">
                    📌
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default History;
