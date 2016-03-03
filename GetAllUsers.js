console.log('Loading function');

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var apiRequest, async, dynamodbRequest, _, eventHandler;
    dynamodbRequest = require('./src/dynamodbRequests');
    async = require('async');
    _ = require('lodash');

    async.waterfall([
           function getPageNo(next) {

                var page = event.page;
                next(null, event, page);

           }, function getUserData(event, page, next) {

                dynamodbRequest.getRecords("users", [["userID", "GT", 0], ["Timestamp", 'GT', 0]], page, next);

            }, function sendResponse(response, next) {

                context.done(response);

            } ], function(err) {
            if (err) {
                console.error(
                    err
                );
                context.done(err);
            }
        }
    );
};