import { get, post } from "./service";

export interface Token {
  id: number;
  token_id?: string;
  alpha_id?: string;
  symbol: string;
  name: string;
  contract_address: string;
  chain_id: string;
  chain_name?: string;
  icon_url?: string;
  status: "pending" | "listed" | "monitoring";
  listing_time: string | null;
  listing_time_unknown: boolean;
  listing_cex?: boolean;
  cex_coin_name?: string;
  offline?: boolean;
  current_price: number | null;
  price_usd: number | null;
  percent_change_24h?: number | null;
  price_high_24h?: number | null;
  price_low_24h?: number | null;
  volume_24h?: number | null;
  market_cap?: number | null;
  fdv?: number | null;
  liquidity?: number | null;
  count_24h?: number | null;
  total_supply?: string;
  circulating_supply?: string;
  holders?: number | null;
  decimals?: number;
  trade_decimal?: number;
  hot_tag?: boolean;
  online_airdrop?: boolean;
  online_tge?: boolean;
  bn_exclusive_state?: boolean;
  mul_point?: number;
  score?: number | null;
  can_transfer?: boolean;
  denomination?: number;
  offsell?: boolean;
  cex_off_display?: boolean;
  source: string;
  detected_at: string;
}

export interface TokenListResponse {
  total?: number;
  items: Token[];
}

export const fetchTokens = (params?: {
  status?: string;
  source?: string;
  skip?: number;
  limit?: number;
}) => {
  return get<TokenListResponse | Token[]>("/tokens", { params });
};

export const monitorAlphaTokens = () => post("/monitor/alpha-tokens");

export const monitorTwitter = () => post("/monitor/twitter");

export const updatePrices = () => post("/monitor/update-prices");
