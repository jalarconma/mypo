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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const AWS = require('aws-sdk');
 const https = require('https');
 const FINNHUB_API_KEY_NAME = 'FINNHUB_API_KEY';
 const TABLE_NAME = `Symbol-${process.env['API_MYPOV1_GRAPHQLAPIIDOUTPUT']}-${process.env['ENV']}`;
 
 const docClient = new AWS.DynamoDB.DocumentClient({ region: process.env['REGION'] });
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
 
 async function getSymbols() {
   const finnHubApiKey = await getFinnHubApiKey();
   const result = await getRequest(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${finnHubApiKey}`);
 
   console.log('result data ok... filtering....');
 
   const symbols = result.map(symbolData => ({
     id: symbolData.symbol,
     symbol: symbolData.symbol,
     type: 'STOCK',
     displaySymbol: symbolData.displaySymbol,
     description: symbolData.description
   }));
   
   console.log('stock symbols length', symbols.length);
   const symbolsToProcess = symbols.slice(7500, 30000);
   console.log('stock symbols to process length', symbolsToProcess.length);
 
   //return symbolsToProcess;
   return symbols;
 }
 
 async function storeOnDB(symbols25) {
   const params = {
     RequestItems: {
       [TABLE_NAME]: symbols25.map(symbol => ({
         PutRequest: {
           Item: {
             ...symbol,
             createdAt: new Date().toISOString(),
             updatedAt: new Date().toISOString(),
             _version: '1',
             _deleted: null,
             _lastChangedAt: Date.now()
           }
         }
       }))
     }
   };
 
   console.log('params', params);
 
   console.log('To store', symbols25);
   console.log('table name', TABLE_NAME);
 
   const storeResult = await docClient.batchWrite(params).promise();
   console.log('stored', JSON.stringify(storeResult));
 }
 
 
 async function createItems() {
   const symbols = await getSymbols();
 
   const chunckSize = 25;
   const loopLimit = Math.ceil(symbols.length / 25);
 
   for (let i = 0; i <= loopLimit; i++) {
     const initial = i * chunckSize;
     const end = initial + chunckSize;
     const symbols25 = symbols.slice(initial, end);
 
     if (symbols25.length <= 0) {
       console.log('loop data', { lenght: symbols.length, loopLimit, initial, end });
       continue;
     }
 
     await storeOnDB(symbols25);
   }
 
 }
 
 exports.handler = async (event) => {
   try {
     await createItems();
     return { body: 'Successfully created stock symbols!' };
   }
   catch (err) {
     return { error: err };
   }
 };