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
 
 async function getSymbols() {
   const finnHubApiKey = await getFinnHubApiKey();
   const result = await getRequest(`https://finnhub.io/api/v1/crypto/symbol?exchange=COINBASE&token=${finnHubApiKey}`);
 
   console.log('result data ok... filtering....');
 
   const data = result.filter(symbolData => symbolData.symbol.includes('USD'));
   const symbols = data.map(symbolData => (
       { 
           id: symbolData.symbol, 
           symbol: symbolData.symbol, 
           type: 'CRYPTO',
           displaySymbol: symbolData.displaySymbol,
           description: symbolData.description
        }
    ));
 
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
 
   const storeResult = await docClient.batchWrite(params).promise();
   console.log('stored', storeResult);
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
     return { body: 'Successfully created crypto symbols!' };
   }
   catch (err) {
     return { error: err };
   }
 };