import { binance_config } from "@/core/constants/ApiUrlConfigs";
import { CacheDefaultTTL } from "@/core/constants/CacheConfigs";
import { CacheInstance } from "@/core/repositories/Repository";
import { Crypto } from "@/core/types/Crypto";
import { binanceApi } from "@/core/utils/axiosInstances";

const exchange_info_cache = CacheInstance<{
  binance_exchange_info_data: Crypto.CryptoSymbols[];
  binance_exchange_info_rate_limits: Crypto.CryptoRateLimits[];
}>();

const BinanceExchengeInfoDataCache = async (): Promise<Crypto.CryptoSymbols[] | null> =>
  (await exchange_info_cache.get("binance_exchange_info_data")) as Crypto.CryptoSymbols[];

const UpdateExchangeInfoCache = async () => {
  try {
    console.log("Gerando novo cache de ExchangeInfo");
    const { data: exchangeInfo } = await binanceApi.get<Crypto.ExchangeInfoList>(
      binance_config.queries.exchangeInfo
    );
    await exchange_info_cache.set(
      "binance_exchange_info_rate_limits",
      exchangeInfo.rateLimits,
      CacheDefaultTTL
    );
    await exchange_info_cache.set(
      "binance_exchange_info_data",
      exchangeInfo.symbols,
      CacheDefaultTTL
    );
    return exchangeInfo.symbols;
  } catch (err) {
    console.error("Não foi possível atualizar o cache de ExchangeInfo");
  }
};

export const GetBinanceExchengeInfo = async (): Promise<Crypto.CryptoSymbols[] | undefined> => {
  const data = await BinanceExchengeInfoDataCache();
  if (!data) return await UpdateExchangeInfoCache();
  return data;
};
