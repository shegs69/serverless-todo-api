import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../utils/dynamodb.mjs';
import { formatResponse } from '../utils/response.mjs';

export const handler = async (event) => {
    try {
        const todoId = event.pathParameters.id;
        const body = JSON.parse(event.body);

        const result = await ddbDocClient.send(new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id: todoId },
            // We only update the 'title' and 'completed' fields
            UpdateExpression: 'set title = :t, completed = :c',
            ExpressionAttributeValues: {
                ':t': body.title,
                ':c': body.completed
            },
            ReturnValues: 'ALL_NEW' // Returns the updated item back to us
        }));

        return formatResponse(200, result.Attributes);
    } catch (err) {
        console.error(err);
        return formatResponse(500, { error: 'Failed to update todo' });
    }
};