import { Box, Text } from "@chakra-ui/react";

function History() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="#fbbf24" mb={4}>
        历史记录
      </Text>
      <Text color="#9ca3af">暂无历史记录</Text>
    </Box>
  );
}

export default History;
