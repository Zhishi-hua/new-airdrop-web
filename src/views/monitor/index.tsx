import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { fetchTokens, monitorAlphaTokens, type Token } from "../../api/monitor";

const statusOptions = [
  { label: "全部状态", value: "" },
  { label: "即将上币", value: "pending" },
  { label: "已上币", value: "listed" },
  { label: "监控中", value: "monitoring" },
];

function formatCurrency(num: number | null | undefined, decimals = 2) {
  if (num === null || num === undefined) return "-";
  if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
  return `$${num.toFixed(decimals)}`;
}

function formatCompact(num: number | null | undefined) {
  if (num === null || num === undefined) return "-";
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

const iconPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiMzNzQxNTEiLz4KPC9zdmc+";

const formatDateTime = (value: string | null | undefined) => {
  if (!value) return "-";
  const time = new Date(value);
  if (Number.isNaN(time.getTime())) return "-";
  return `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, "0")}-${String(
    time.getDate(),
  ).padStart(2, "0")} ${String(time.getHours()).padStart(2, "0")}:${String(
    time.getMinutes(),
  ).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}`;
};

function Monitor() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<
    null | "alpha" | "twitter" | "price"
  >(null);
  const [feedback, setFeedback] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  const showFeedback = (message: string, status: "success" | "error") => {
    setFeedback({ message, status });
    setTimeout(() => setFeedback(null), 3000);
  };

  const loadTokens = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchTokens({
        status: statusFilter || undefined,
        limit: 1000,
      });
      const data = Array.isArray(response) ? response : (response?.items ?? []);
      setTokens(data);
    } catch (error) {
      console.error(error);
      showFeedback("加载代币列表失败", "error");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  const handleAction = async (
    action: "alpha" | "twitter" | "price",
    apiCall: () => Promise<unknown>,
    successMessage: string,
  ) => {
    setActionLoading(action);
    try {
      await apiCall();
      showFeedback(successMessage, "success");
      setTimeout(loadTokens, 1500);
    } catch (error) {
      console.error(error);
      showFeedback("操作失败，请稍后再试", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Box>
      {feedback && (
        <Box
          mb={4}
          p={3}
          borderRadius="md"
          border="1px solid"
          borderColor={feedback.status === "success" ? "#10b981" : "#f87171"}
          color={feedback.status === "success" ? "#10b981" : "#f87171"}
          //   bg="rgba(16,185,129,0.08)"
        >
          {feedback.message}
        </Box>
      )}
      <Flex
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        flexWrap="wrap"
        gap={4}
        mb={6}
      >
        <Flex gap={3} flexWrap="wrap">
          <Button
            colorScheme="yellow"
            onClick={() =>
              handleAction("alpha", monitorAlphaTokens, "监控任务已启动")
            }
            disabled={actionLoading !== null}
          >
            监控Alpha
          </Button>
          <Button variant="ghost" onClick={loadTokens} disabled={loading}>
            刷新
          </Button>
        </Flex>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          style={{
            maxWidth: "200px",
            backgroundColor: "#111827",
            border: "1px solid #374151",
            color: "white",
            borderRadius: "8px",
            padding: "8px 12px",
          }}
        >
          {statusOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{ background: "#111827", color: "#f9fafb" }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </Flex>

      <Box
        border="1px solid"
        borderColor="#374151"
        borderRadius="md"
        overflow="hidden"
      >
        <Box overflowX="auto">
          <style>
            {`
              .monitor-table {
                width: 100%;
                border-collapse: collapse;
                min-width: 900px;
              }
              .monitor-table thead {
                background: #1f2937;
              }
              .monitor-table th,
              .monitor-table td {
                padding: 12px 16px;
                border-bottom: 1px solid #374151;
                text-align: left;
              }
              .monitor-table th {
                color: #fbbf24;
                font-weight: 600;
                white-space: nowrap;
              }
              .monitor-row:hover {
                background: rgba(237, 231, 199, 0.05);
              }
            `}
          </style>
          <table className="monitor-table">
            <thead>
              <tr>
                <th>代币</th>
                <th>链</th>
                <th>价格 / 24h</th>
                <th>市值</th>
                <th>24h交易量</th>
                <th>流动性</th>
                <th>评分</th>
                <th>状态</th>
                <th>上币时间</th>
                <th>持有者</th>
                <th>合约地址</th>
                <th>检测时间</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={12}
                    style={{ textAlign: "center", padding: "48px 0" }}
                  >
                    正在加载...
                  </td>
                </tr>
              ) : tokens.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    style={{
                      textAlign: "center",
                      padding: "48px 0",
                      color: "#9ca3af",
                    }}
                  >
                    暂无数据
                  </td>
                </tr>
              ) : (
                tokens.map((token) => (
                  <tr key={token.id} className="monitor-row">
                    <td>
                      <Flex align="center" gap={3}>
                        <img
                          src={token.icon_url || iconPlaceholder}
                          alt={token.symbol}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "1px solid #374151",
                            objectFit: "cover",
                          }}
                          onError={(event) => {
                            const img = event.currentTarget as HTMLImageElement;
                            if (img.src !== iconPlaceholder) {
                              img.src = iconPlaceholder;
                            }
                          }}
                        />
                        <Box>
                          <Text fontWeight="bold">{token.symbol}</Text>
                          <Text fontSize="xs" color="#9ca3af">
                            {token.name}
                          </Text>
                        </Box>
                      </Flex>
                    </td>
                    <td>{token.chain_name || "-"}</td>
                    <td>
                      <Text fontWeight="bold">
                        {token.price_usd
                          ? `$${token.price_usd.toFixed(6)}`
                          : "-"}
                      </Text>
                      {token.percent_change_24h !== null &&
                        token.percent_change_24h !== undefined && (
                          <Text
                            fontSize="xs"
                            color={
                              token.percent_change_24h >= 0
                                ? "#10b981"
                                : "#f87171"
                            }
                          >
                            {token.percent_change_24h >= 0 ? "+" : "-"}
                            {Math.abs(token.percent_change_24h).toFixed(2)}%
                          </Text>
                        )}
                    </td>
                    <td>{formatCurrency(token.market_cap)}</td>
                    <td>{formatCompact(token.volume_24h)}</td>
                    <td>{formatCurrency(token.liquidity)}</td>
                    <td>
                      {token.score ? (
                        <Badge
                          colorScheme={
                            token.score >= 1000
                              ? "green"
                              : token.score >= 100
                                ? "blue"
                                : "yellow"
                          }
                        >
                          {token.score}
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <Flex wrap="wrap" gap={2}>
                        <Badge
                          colorScheme={
                            token.status === "pending"
                              ? "yellow"
                              : token.status === "listed"
                                ? "green"
                                : "blue"
                          }
                        >
                          {token.status}
                        </Badge>
                        {token.listing_cex && (
                          <Badge colorScheme="blue">CEX</Badge>
                        )}
                        {token.online_airdrop && (
                          <Badge colorScheme="purple">空投</Badge>
                        )}
                        {token.bn_exclusive_state && (
                          <Badge colorScheme="red">币安独家</Badge>
                        )}
                        {token.hot_tag && (
                          <Badge colorScheme="orange">热门</Badge>
                        )}
                      </Flex>
                    </td>
                    <td>
                      {token.listing_time_unknown ? (
                        <Badge colorScheme="gray">未知</Badge>
                      ) : token.listing_time ? (
                        formatDateTime(token.listing_time)
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {token.holders !== null && token.holders !== undefined
                        ? token.holders.toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      <Text fontSize="xs" fontFamily="mono">
                        {token.contract_address
                          ? `${token.contract_address.slice(0, 6)}...${token.contract_address.slice(-4)}`
                          : "-"}
                      </Text>
                    </td>
                    <td>{formatDateTime(token.detected_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}

export default Monitor;
