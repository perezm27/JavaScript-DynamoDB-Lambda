console.log('Loading function');

const uuid = require('uuid/v4');

const AWS = require('aws-sdk');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

AWS.config.update({ region: 'us-west-2' });

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 *
 * Modifications Have been made to the individual Methods to reflect the backend for Taskmaster Application.
 */
exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const done = (err, res) =>
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      }
    });

  switch (event.httpMethod) {
    case 'DELETE':
      dynamo.deleteItem(JSON.parse(event.body), done);
      break;
    case 'GET':
      if (event.pathParameters) {
        let params = {
          TableName: 'Taskmaster',
          FilterExpression: '#assignee = :user',
          ExpressionAttributeNames: {
            '#assignee': 'assignee'
          },
          ExpressionAttributeValues: {
            ':user': event.pathParameters.user
          }
        };
        return dynamo.scan(params, done);
      } else {
        return dynamo.scan({ TableName: 'Taskmaster' }, done);
      }
    case 'POST':
      let newItem = JSON.parse(event.body);
      newItem.id = uuid();
      newItem.status = 'assigned';

      let params = {
        TableName: 'Taskmaster',
        Item: newItem
      };

      dynamo.putItem(params, done);
      break;
    case 'PUT':
      console.log({ event });
      let paramaters = {
        TableName: 'Taskmaster',
        Key: {
          id: event.pathParameters.id
        },
        UpdateExpression: 'set assignee = :a',
        ExpressionAttributeValues: { ':a': event.pathParameters.assignee }
      };
      dynamo.updateItem(paramaters, done);
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
