import { Box, Text, Button } from "@chakra-ui/react";

function Home() {
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
  };

  const tdStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid #374151",
  };

  return (
    <Box>
      <Box mb={8}>
        {/* 今日打新 */}
        <Text fontSize="xl" fontWeight="bold" color="#fbbf24" mb={4}>
          🎁 今日打新
        </Text>
        <Box
          border="1px solid"
          borderColor="#374151"
          borderRadius="md"
          overflow="hidden"
        >
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>项目</th>
                <th style={thStyle}>默认购买额度 (USDT)</th>
                <th style={thStyle}>确认购买额度 (USDT)</th>
                <th style={thStyle}>可购买数量</th>
                <th style={thStyle}>时间</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <Text fontWeight="bold">XXX</Text>
                </td>
                <td style={tdStyle}>100</td>
                <td style={tdStyle}>
                  <Text color="#fbbf24">1000</Text>
                </td>
                <td style={tdStyle}>30231</td>
                <td style={tdStyle}>20251212 12:00:00</td>
                <td style={tdStyle}>
                  <Button
                    size="sm"
                    bg="#fbbf24"
                    color="black"
                    _hover={{ bg: "#f59e0b" }}
                    fontWeight="600"
                  >
                    确定执行
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>

      {/* 打新预告 */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="#fbbf24" mb={4}>
          📅 打新预告
        </Text>
        <Box
          border="1px solid"
          borderColor="#374151"
          borderRadius="md"
          overflow="hidden"
        >
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>项目</th>
                <th style={thStyle}>默认购买额度 (USDT)</th>
                <th style={thStyle}>确认购买额度 (USDT)</th>
                <th style={thStyle}>可购买数量</th>
                <th style={thStyle}>时间</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <Box>
                    <Text fontWeight="bold">GAIX</Text>
                    <Text fontSize="xs" color="#9ca3af">
                      GaiAi
                    </Text>
                  </Box>
                </td>
                <td style={tdStyle}>100</td>
                <td style={tdStyle}>-</td>
                <td style={tdStyle}>
                  <Text color="#9ca3af">未知</Text>
                </td>
                <td style={tdStyle}>明天</td>
                <td style={tdStyle}>
                  <Button
                    size="sm"
                    bg="#fbbf24"
                    color="black"
                    _hover={{ bg: "#f59e0b" }}
                    fontWeight="600"
                  >
                    确定执行
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
