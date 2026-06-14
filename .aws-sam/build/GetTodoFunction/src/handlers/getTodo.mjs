import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../utils/dynamodb.mjs';
import { formatResponse } from '../utils/response.mjs';

export const handler = async (event) => {
    try {
        // API Gateway passes the {id} from the URL into event.pathParameters
        const todoId = event.pathParameters.id;

        const result = await ddbDocClient.send(new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id: todoId }
        }));

        if (!result.Item) {
            return formatResponse(404, { error: 'Todo not found' });
        }

        return formatResponse(200, result.Item);
    } catch (err) {
        console.error(err);
        return formatResponse(500, { error: 'Failed to get todo' });
    }
};