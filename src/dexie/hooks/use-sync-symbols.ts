import { useCallback, useState } from "react";

import { GraphQLResult } from "@aws-amplify/api-graphql";

import { Symbol, ListSymbolsQuery } from "../../API";
import { graphqlQueryWrapper } from "../../core/utils/graphql-query-wrapper";
import { listSymbols } from "../../graphql/queries";
import { mypoDB } from "../db";

const useSyncSymbols = () => {

  const sync = useCallback(() => {
    syncSymbolsHandler();
  }, []);

  const clear = useCallback(() => {
    clearSymbolsHandler();
  }, []);

  const isSymbol = (item: Symbol | null): item is Symbol => {
    return (item as Symbol) !== null;
  }

  const clearSymbolsHandler = async () => {
    mypoDB.symbols.clear();
  }

  const syncSymbolsHandler = async () => {
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

    const timmer = setTimeout(async () => {
      const result =  await fetchSymbols(nextToken);
      storeDataAndcallNextSyncIteration(result);
      clearTimeout(timmer);
    }, 200)
  }

  const fetchSymbols = async (nextToken: string | null = null) => {
    console.log('starting to sync symbols....');
    return graphqlQueryWrapper<ListSymbolsQuery>({ query: listSymbols, variables: { limit: 4000, nextToken }});
  }

  const storeSymbolsOnDB = async (data: (Symbol | null)[]) => {
    console.log('symbols to sync: ', data.length);
    const filteredSymbols: Symbol[] = data.filter<Symbol>(isSymbol);
    mypoDB.symbols.bulkPut(filteredSymbols);
  }

  return { sync, clear };
}

export default useSyncSymbols;