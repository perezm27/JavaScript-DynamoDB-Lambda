## Lab: Lambda with API Gateway
Overview
In this lab, we will begin the task of migrating our application from a “monolithic” Java application into a truly cloud based application, with distributed functions, services, and events.

## Feature Tasks
* Migrate the functionality of your Create, Update, and Delete methods in your original Taskmaster Java application to their matching Lambda functions.
* You may use any language to create these functions!
* These endpoints should work ONLY with JSON data or URL Params
* Taskmaster functionality must remain the same
* With the exception of History (do not implement)
* Refactor your react application to send a JSON object to the server instead of raw form data

## Routes
GET:
```
/tasks
```
```
/tasks/{user}
```
POST:
```
/tasks
```
PUT:
```
/tasks/assign/{assignee}/{id} 
```

## Works Cited

[AWS Tutorial](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html)  
[How to Give your uploads public access](https://forums.aws.amazon.com/thread.jspa?threadID=116231)  
[Create, Read, Update, and Delete an Item](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Js.03.html#GettingStarted.Js.03.03)  
[UpdateItem Method](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)  
[Lambda Proxy Integration](https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration)

## Collaborative Efforts

Trevor Dobson
