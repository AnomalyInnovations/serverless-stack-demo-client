const AWS = require('aws-sdk')

const params = { region: 'localhost', endpoint: 'http://localhost:8000' };

const dynamodb = new AWS.DynamoDB.DocumentClient(params);

const createTable = async () => {
  const tableName = 'dev-notes'
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'PK', AttributeType: 'S' },
      { AttributeName: 'SK', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' },
      { AttributeName: 'SK', KeyType: 'RANGE' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  }

  await dynamodb.createTable(params).promise()

  console.log('waiting for table to be created')

  await dynamodb.waitFor('tableExists', { TableName: tableName }).promise()

  console.log('table is completed')
}

createTable().catch(console.error)
