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
Amplify Params - DO NOT EDIT */// This is sample code. Please update this to suite your schema
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

async function getPrice(inputDate) {
  /*const finnHubApiKey = await getFinnHubApiKey();
  const result = await getRequest(`https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=${finnHubApiKey}`);

  console.log('result data ok... filtering....');

  const data = result.filter(symbolData => symbolData.symbol.includes('USDT'));
  const symbols = data.map(symbolData => ({ id: symbolData.symbol, symbol: symbolData.symbol, type: 'CRYPTO' }));

  return symbols;*/
}

/**
* @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
exports.handler = async (event) => {
  try {
    const price = await getPrice();
    return { body: 'Successfully created crypto symbols!' };
  }
  catch (err) {
    return { error: err };
  }
};
