import axios from "axios";
import { binance_config } from "../constants/ApiUrlConfigs";

export const binanceApi = axios.create({ baseURL: binance_config.baseUrl });
