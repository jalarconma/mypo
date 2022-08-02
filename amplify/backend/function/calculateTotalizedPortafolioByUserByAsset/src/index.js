/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_MYPOV1_GRAPHQLAPIIDOUTPUT
	API_MYPOV1_GRAPHQLAPIENDPOINTOUTPUT
	API_MYPOV1_GRAPHQLAPIKEYOUTPUT
	FUNCTION_GETASSETPRICEBYDATE_NAME
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';
import AWS from '/var/runtime/node_modules/aws-sdk/lib/aws.js';

AWS.config.update({ region: process.env['REGION'] });

const lambda = new AWS.Lambda();
const GRAPHQL_ENDPOINT = process.env.API_MYPOV1_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MYPOV1_GRAPHQLAPIKEYOUTPUT;
const FUNCTION_GETASSETPRICEBYDATE_NAME = process.env.FUNCTION_GETASSETPRICEBYDATE_NAME;

const listUserPortafolios = /* GraphQL */ `
  query ListUserPortafolios(
    $filter: ModelUserPortafolioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPortafolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        owner
        action
        asset_quantity
        action_date
        current_asset_price
        createdAt
        updatedAt
        userPortafolioSymbolId
      }
      nextToken
    }
  }
`;

const getSymbol = /* GraphQL */ `
  query GetSymbol($id: ID!) {
    getSymbol(id: $id) {
      id
      symbol
      type
      displaySymbol
      description
      createdAt
      updatedAt
    }
  }
`;

function formatNumberTo2Digits(input) {

  if (!input) {
    return null;
  }

  const value = Math.abs(input);

  return value > 9 ? `${value}` : `0${value}`;
}

function dateToString(date) {
  if (!date) {
    return null;
  }

  const day = formatNumberTo2Digits(date.getDate());
  const month = formatNumberTo2Digits(date.getMonth() + 1);
  const year = formatNumberTo2Digits(date.getFullYear());

  return `${year}-${month}-${day}`;
}

async function graphqlFetch(query, variables) {
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query, variables })
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();

    if (body.errors) {
      console.log(`graphqlFetch error: ${JSON.stringify(body.errors)}`);
      throw new Error(`graphqlFetch error: ${JSON.stringify(body.errors)}`);
    }

  }
  catch (error) {
    console.log('graphqlFetch error: ', error);
    throw new Error(`graphqlFetch error: ${error}`);
  }

  return body;
}

function executeLambda(lambdaName, lambdaPayload) {
  const params = {
    FunctionName: lambdaName,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: lambdaPayload
  };

  return new Promise((resolve, reject) => {
    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log('LAMBDA ERROR: ', err);
        reject(new Error(err));
      }
      else {
        try {
          resolve(JSON.parse(data.Payload));
        }
        catch (err) {
          reject(new Error(err));
        }
      }
    });
  });
}

async function getUserPortafolio(user, symbol) {
  const filter = {
    and: [{
        user: {
          eq: user
        }
      },
      {
        userPortafolioSymbolId: {
          eq: symbol
        }
      }
    ]
  };

  const userPortafolioQuery = await graphqlFetch(listUserPortafolios, { filter: filter });

  console.log('userPortafolioQuery: ', userPortafolioQuery);

  if (!userPortafolioQuery.data) {
    return [];
  }

  return userPortafolioQuery.data.listUserPortafolios.items;
}

function groupAssetsBySymbol(assets) {
  const grouped = assets.reduce((acc, obj) => {
    const symbol = obj.userPortafolioSymbolId;

    if (!acc[symbol]) {
      acc[symbol] = [obj];
    }
    else {
      acc[symbol].push(obj);
    }

    return acc;
  }, {});

  return grouped;
}

async function calculateTotalizedAssets(symbol, assets) {

  if (!assets) {
    return {
      symbol,
      assetQuantity: 0,
      assetMidPrice: 0,
      assetCurrentPrice: 0
    };
  }
  
  const assetPriceQuery = await executeLambda(FUNCTION_GETASSETPRICEBYDATE_NAME, JSON.stringify({
    "queryStringParameters": {
      "assetType": symbol.type,
      "date": dateToString(new Date()),
      "symbol": symbol.id
    }
  }));

  const assetCurrentPrice = +assetPriceQuery.body;

  console.log('priceInfo: ', assetCurrentPrice);

  const totalAssetQuantity = assets.reduce((acc, obj) => {
    return obj.action === 'BUY' ? acc + obj.asset_quantity : acc - obj.asset_quantity;
  }, 0);

  const totalAssetQuantityByBuyAction = assets.reduce((acc, obj) => {
    return obj.action === 'BUY' ? acc + obj.asset_quantity : acc;
  }, 0);

  if (totalAssetQuantity <= 0) {
    return {
      symbol,
      assetQuantity: 0,
      assetMidPrice: 0,
      assetCurrentPrice: 0
    };
  }

  const midAssetBuyPrice = assets.reduce((acc, obj) => {
    return obj.action === 'BUY' ? acc + ((obj.current_asset_price * obj.asset_quantity) / totalAssetQuantityByBuyAction) : acc;
  }, 0);

  return {
    symbol,
    assetQuantity: totalAssetQuantity,
    assetMidPrice: midAssetBuyPrice,
    assetCurrentPrice: assetCurrentPrice,
  };
}

async function getSymbolById(symbolId) {
  const fullSymbolQuery = await graphqlFetch(getSymbol, { id: symbolId });
  console.log('symbol symbolId: ', fullSymbolQuery);

  if (!fullSymbolQuery.data) {
    return null;
  }

  return fullSymbolQuery.data.getSymbol;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`calculateTotalizedPortafolioByUserByAsset EVENT: ${JSON.stringify(event)}`);

  try {
    const { user, symbol } = event.queryStringParameters;
    const userPortafolioItems = await getUserPortafolio(user, symbol);
    console.log('userPortafolioItems: ', userPortafolioItems);
    const groupedAssets = groupAssetsBySymbol(userPortafolioItems);
    console.log('groupedAssets: ', groupedAssets);

    let totalizedAsset = undefined;

    const fullSymbol = await getSymbolById(symbol);

    if (fullSymbol) {
      totalizedAsset = await calculateTotalizedAssets(fullSymbol, groupedAssets[symbol]);
    }

    console.log('totalizedAssets: ', totalizedAsset);

    let res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(totalizedAsset)
    };

    return res;
  }
  catch (err) {
    return { error: err };
  }
};
