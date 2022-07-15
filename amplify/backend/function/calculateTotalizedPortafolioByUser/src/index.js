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
const FUNCTION_GETASSETPRICEBYDATE_NAME = process.env.FUNCTION_GETASSETPRICEBYDATE_NAME

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
        _version
        _deleted
        _lastChangedAt
        userPortafolioSymbolId
      }
      nextToken
      startedAt
    }
  }
`;

async function graphqlFetch(query, variables) {
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query, variables })
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  }
  catch (error) {
    statusCode = 400;
    body = {
      errors: [{
        status: response.status,
        message: error.message,
        stack: error.stack
      }]
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body)
  };
}

function getRequest(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        }
        catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`calculateTotalizedPortafolioByUser EVENT: ${JSON.stringify(event)}`);
  console.log('node version: ', process.versions.node)
  try {
    const { user } = event.queryStringParameters;
    const userPortafolioItems = await graphqlFetch(listUserPortafolios, {});
    const priceInfo = await executeLambda(FUNCTION_GETASSETPRICEBYDATE_NAME, JSON.stringify({
        "queryStringParameters": {
          "assetType": "CRYPTO",
          "date": "2022-07-15",
          "symbol": "COINBASE:ADA-USD"
        }
    }));

    console.log('userPortafolioItems: ', userPortafolioItems)
    console.log('priceInfo: ', priceInfo)

    /*let res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(price)
    };

    return res;*/
  }
  catch (err) {
    return { error: err };
  }
};
