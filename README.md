# Remote data store

A small project which generates The Spectator Events REST API using Serverless, AWS Lambda and DynamoDB

# Bulding steps

There were a few steps to create this API <br />

I've created new IAM user, gave it the right permissions and got credentials <br />

I've installed serverless globally in the project's root directory
`npm install serverless -g`

Generated serverless aws-nodejs boilerplate
`serverless create -t aws-nodejs`

There are two main files: `serverless.yml` and `handler.js`

### serverless.yml

Serverless.yml file has settings, functions and resources properties where we can save instructions. I've created two lambda functions there. They will cover `Add a resource to database` and `Get all resources from database` routes.

### handler.js

Handler.js file has functions which handle adding data to the database and getting all events from the database. <br />
Handler also has `response` function where we can send responses statusCode, a body of the response and allow CORS. <br />
Getting all events from the database is sorted by `createdAt` field. They're being sorted by `sortByDate` function.

## Provide AWS credentials to Serverless config

Before deploying serverless functions, I had to provide config credentials for serverless
`serverless config credentials --provider aws --key <YOUR_AWS_KEY> --secret <YOUR_AWS_SECRET>`

## Deploying Serverless to AWS

To deploy AWS Lambda functions I used `serverless deploy` command. To update it I used `serverless deploy -v` <br />

## Check the logs

To debug my Lambda functions I used `serverless logs --function <FUNCTION_NAME>` command. It helped me to see where I made an error in my handlers.

# Routes

After `serverless deploy` command I got URLs for my routes <br />

`/event` route is for POST request which will update the database with the new event generated by the front end you've supplied for me <br />
`/events` route is for GET request which will query the database and return all events being saved to our database.

# Links to the live app

I'll provide them in the email which I'll send to Catherine.

# Future improvements

If I had more time I'd add the whole CRUD routes to this API. For example, getting one event, delete an event, update event.
