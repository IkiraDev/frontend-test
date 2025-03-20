"use server";

import { GetBinanceExchengeInfo } from "@/services/queries/GetBinanceExchengeInfo";
import { SymbolListView } from "@/views/Home/SymbolListView";
import { QueryError } from "@/views/Errors/QueryError";

export default async function Home() {
  const exchangeInfo = await GetBinanceExchengeInfo();
  if (!exchangeInfo?.length || !exchangeInfo)
    return (
      <QueryError msg="Desculpe, não foi possível completar a requisição necessária para continuarmos. (req: GetBinanceExchengeInfo)" />
    );
  return <SymbolListView list={exchangeInfo} />;
}
