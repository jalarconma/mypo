/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const AWS = require('aws-sdk');
 const docClient = new AWS.DynamoDB.DocumentClient();
 const https = require('https');
 
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
 
 
 async function createItem() {
   const result = await getRequest('https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=c95gv0qad3i8q7sn6tcg');
   const data = result.filter(symbolData => symbolData.symbol.includes('USDT'));
   const symbols = data.map(symbolData => ({ id: symbolData.symbol, symbol: symbolData.symbol, type: 'CRYPTO' }));
 
   const chunckSize = 25;
   const loopLimit = Math.ceil(symbols.length/25);
 
   for (let i = 0; i <= loopLimit; i++) {
     const initial = i*chunckSize;
     const end = initial + chunckSize;
     const symbols25 = symbols.slice(initial, end);
     
     console.log('To store', symbols25);
     
     if(symbols25.length <= 0) {
       console.log('loop data', { lenght: symbols.length, loopLimit, initial, end });
       continue;
     }
     
     const params = {
       RequestItems: {
         "Symbol-3wefbaba7bc5tpd64l5yzdmmoy-dev": symbols25.map(symbol => ({
           PutRequest: {
             Item: { ...symbol }
           }
         }))
       }
     };
 
     const storeResult = await docClient.batchWrite(params).promise();
     console.log('stored', storeResult);
   }
 
 }
 
 exports.handler = async (event) => {
   try {
     await createItem();
     return { body: 'Successfully created crypto symbols!' };
   }
   catch (err) {
     return { error: err };
   }
 };