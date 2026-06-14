import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Create the standard DynamoDB client
const client = new DynamoDBClient({});

// The DocumentClient automatically converts Javascript objects to DynamoDB format and back
export const ddbDocClient = DynamoDBDocumentClient.from(client);