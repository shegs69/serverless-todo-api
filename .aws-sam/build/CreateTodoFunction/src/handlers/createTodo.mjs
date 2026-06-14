import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { ddbDocClient } from '../utils/dynamodb.mjs';
import { formatResponse } from '../utils/response.mjs';

export const handler = async (event) => {
    try {
        // The user sends data in the 'body' of the request
        const body = JSON.parse(event.body);

        const todoItem = {
            id: randomUUID(), // Generate a unique ID
            title: body.title,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Save it to DynamoDB
        await ddbDocClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME, // Remember this from our YAML file?
            Item: todoItem
        }));

        return formatResponse(201, todoItem);
    } catch (err) {
        console.error(err);
        return formatResponse(500, { error: 'Failed to create todo' });
    }
};