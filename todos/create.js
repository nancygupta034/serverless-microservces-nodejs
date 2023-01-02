'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.dynamoDb.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timeStamp = new Date();
    const data = JSON.parse(event.body);

    if(typeof data.text !== 'string') {
        console.log('Validation failed');
        callback('validation failed');
        return;
    }

    const params = {
        TableName: 'todos',
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timeStamp,
            updatedAt: timeStamp,
        }
    }

    dynamoDb.put(params, (error, result) => {
        if(error) {
            console.log(error);
            callback(new Error('Couldnt create a todo'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(results.Item)
        }

        callback(null, response)
    })
}