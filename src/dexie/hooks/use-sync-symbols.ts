import { useCallback } from "react";

import { GraphQLResult } from "@aws-amplify/api-graphql";

import { Symbol, ListSymbolsQuery } from "../../API";
import { graphqlQueryWrapper } from "../../core/utils/graphql-query-wrapper";
import { listSymbols } from "../../graphql/queries";
import { mypoDB } from "../db";

const useSyncSymbols = () => {

  const sync = useCallback(() => {
    syncSymbolsHandler();
  }, []);

  const isSymbol = (item: Symbol | null): item is Symbol => {
    return (item as Symbol) !== null;
  }

  const syncSymbolsHandler = async () => {
    const totalSyncSymbols = await mypoDB.symbols.count();

    if(totalSyncSymbols > 25000) {
      return;
    }

    const result =  await fetchSymbols();
    storeDataAndcallNextSyncIteration(result);
  }

  const storeDataAndcallNextSyncIteration = (result: GraphQLResult<ListSymbolsQuery>) => {
    if(!result.data || !result.data.listSymbols) {
      return;
    }

    storeSymbolsOnDB(result.data.listSymbols.items);

    if(!result.data.listSymbols.nextToken) {
      return;
    }

    syncNextSymbols(result.data.listSymbols.nextToken);
  }

  const syncNextSymbols = async (nextToken: string | null) => {

    if(!nextToken) {
      return;
    }

    const result =  await fetchSymbols(nextToken);

    storeDataAndcallNextSyncIteration(result);
  }

  const fetchSymbols = async (nextToken: string | null = null) => {
    console.log('starting to sync symbols....');
    return graphqlQueryWrapper<ListSymbolsQuery>({ query: listSymbols, variables: { nextToken }});
  }

  const storeSymbolsOnDB = async (data: (Symbol | null)[]) => {
    console.log('symbols to sync: ', data.length);
    const filteredSymbols: Symbol[] = data.filter<Symbol>(isSymbol);
    mypoDB.symbols.bulkPut(filteredSymbols);
  }

  return sync;
}

export default useSyncSymbols;