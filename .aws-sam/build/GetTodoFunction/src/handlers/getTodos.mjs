import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../utils/dynamodb.mjs';
import { formatResponse } from '../utils/response.mjs';

export const handler = async (event) => {
    try {
        // 'Scan' grabs everything in the table. Good for small apps, bad for huge databases.
        const result = await ddbDocClient.send(new ScanCommand({
            TableName: process.env.TABLE_NAME
        }));

        return formatResponse(200, result.Items);
    } catch (err) {
        console.error(err);
        return formatResponse(500, { error: 'Failed to get todos' });
    }
};