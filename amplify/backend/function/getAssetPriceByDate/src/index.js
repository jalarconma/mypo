/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["FINNHUB_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["FINNHUB_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */ // This is sample code. Please update this to suite your schema
const AWS = require('aws-sdk');
const https = require('https');
const FINNHUB_API_KEY_NAME = 'FINNHUB_API_KEY';

const ssm = new AWS.SSM();

AWS.config.update({ region: process.env['REGION'] });

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

async function getFinnHubApiKey() {
  const params = {
    Name: process.env[FINNHUB_API_KEY_NAME],
    WithDecryption: true
  };

  const request = await ssm.getParameter(params).promise();

  return request.Parameter.Value;
}

function getCurrentUnixDate(inputDate) {
  let date = inputDate;
  
  if(!inputDate) {
    date = new Date();
  }
  
  return Math.floor(new Date(date).getTime() / 1000) + new Date(date).getTimezoneOffset();
}

async function getCryptoPrice(priceDate, symbol) {
  const baseUrl = `https://finnhub.io/api/v1/crypto`;
  return await getAssetPrice(priceDate, symbol, baseUrl);
}

async function getStockPrice(priceDate, symbol) {
  const baseUrl = `https://finnhub.io/api/v1/stock`;
  return await getAssetPrice(priceDate, symbol, baseUrl);
}

async function getAssetPrice(priceDate, symbol, baseUrl) {
  const finnHubApiKey = await getFinnHubApiKey();
  const unixDateTo = getCurrentUnixDate(priceDate);
  const unixDateFrom = unixDateTo - 100000;

  const requestUrl = `${baseUrl}/candle?symbol=${symbol}&resolution=5&from=${unixDateFrom}&to=${unixDateTo}&token=${finnHubApiKey}`;
  
  console.log('requestUrl: ', requestUrl);
  
  const result = await getRequest(requestUrl);

  const { s: status, c: prices } = result;

  if (status !== 'ok') {
    console.log(`no price data to ${priceDate} ${symbol}`);
    return 0;
  }

  return prices[prices.length - 1];
}

async function getPrice(assetType, priceDate, symbol) {

  if (assetType === 'CRYPTO') {
    return await getCryptoPrice(priceDate, symbol);
  }
  else if (assetType === 'STOCK') {
    return await getStockPrice(priceDate, symbol);
  }

  console.log(`no price data to asset type ${assetType} `);
  return 0;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  try {
    const { assetType, date, symbol } = event.queryStringParameters;
    const price = await getPrice(assetType, date, symbol);
    console.log(`${assetType} ${symbol} to ${date} the price is: ${price}`);

    let res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // replace with hostname of frontend (CloudFront)
      },
      body: JSON.stringify(price)
    };

    return res;
  }
  catch (err) {
    return { error: err };
  }
};
