import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../utils/dynamodb.mjs';
import { formatResponse } from '../utils/response.mjs';

export const handler = async (event) => {
    try {
        const todoId = event.pathParameters.id;

        await ddbDocClient.send(new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id: todoId }
        }));

        return formatResponse(200, { message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        return formatResponse(500, { error: 'Failed to delete todo' });
    }
};