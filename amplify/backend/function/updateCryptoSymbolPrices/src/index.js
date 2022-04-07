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
	API_MYPOV1_GRAPHQLAPIENDPOINTOUTPUT
	API_MYPOV1_GRAPHQLAPIIDOUTPUT
	API_MYPOV1_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const AWS = require('aws-sdk');
 const https = require('https');
 const FINNHUB_API_KEY_NAME = 'FINNHUB_API_KEY';
 const TABLE_NAME = `CurrentPrice-${process.env['API_MYPOV1_GRAPHQLAPIIDOUTPUT']}-${process.env['ENV']}`;
 
 const docClient = new AWS.DynamoDB.DocumentClient();
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
 
 async function getLastOutdatedPrice() {
   
   const params = {
     TableName: TABLE_NAME,
     IndexName: 'id',
     KeyConditionExpression: '#name = :value',
     ExpressionAttributeValues: { ':value': 'false' },
     ExpressionAttributeNames: { '#name': 'updated' }
   };
 
   const data = await docClient.query(params).promise();
   
   console.log('prices outdated', data)
   
   if(data.length <= 0) {
     //update all prices to false
     return null;
   }
   
   return data[0];
 }
 
 async function getPrices() {
   const finnHubApiKey = await getFinnHubApiKey();
   const currentPrice = await getLastOutdatedPrice();
   console.log('price to update', currentPrice);
   
   if(!currentPrice) {
     console.log('no price to update');
     return [];
   }
   
   const result = await getRequest(`https://finnhub.io/api/v1/crypto/candle?symbol=${currentPrice.symbol.symbol}&resolution=D&from=1572651390&to=1575243390&token=${finnHubApiKey}`);
   
   console.log('last price', result);
 
   /*console.log('prices to');
 
   const data = result.filter(symbolData => symbolData.symbol.includes('USDT'));
   const prices = data.map(symbolData => ({ id: symbolData.symbol, symbol: symbolData.symbol, type: 'CRYPTO' }));
 
   return prices;*/
   
   return [];
 }
 
 async function storeOnDB(prices25) {
   const params = {
     RequestItems: {
       [TABLE_NAME]: prices25.map(symbol => ({
         PutRequest: {
           Item: { ...symbol }
         }
       }))
     }
   };
 
   console.log('params', params);
 
   console.log('To store', prices25);
 
   const storeResult = await docClient.batchWrite(params).promise();
   console.log('stored', storeResult);
 }
 
 
 async function updateItems() {
   const prices = await getPrices();
 
   const chunckSize = 25;
   const loopLimit = Math.ceil(prices.length / 25);
 
   for (let i = 0; i <= loopLimit; i++) {
     const initial = i * chunckSize;
     const end = initial + chunckSize;
     const prices25 = prices.slice(initial, end);
 
     if (prices25.length <= 0) {
       console.log('loop data', { lenght: prices.length, loopLimit, initial, end });
       continue;
     }
 
     storeOnDB(prices25);
   }
 }
 
 exports.handler = async (event) => {
   try {
     await updateItems();
     return { body: 'Successfully updated crypto prices!' };
   }
   catch (err) {
     return { error: err };
   }
 };
 