"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const eventsTable = process.env.THE_SPECTATOR_EVENTS_TABLE;

const sortByDate = (a, b) => {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
};

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(message),
  };
}

module.exports.createEvent = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const eventItem = {
    id: reqBody.id,
    createdAt: reqBody.createdAt,
    title: reqBody.title,
    description: reqBody.description,
    tags: reqBody.tags,
    userId: reqBody.userId,
    userCreatedAt: reqBody.userCreatedAt,
  };

  return db
    .put({
      TableName: eventsTable,
      Item: eventItem,
    })
    .promise()
    .then(() => {
      callback(null, response(201, eventItem));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.getAllEvents = (event, context, callback) => {
  return db
    .scan({
      TableName: eventsTable,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};
