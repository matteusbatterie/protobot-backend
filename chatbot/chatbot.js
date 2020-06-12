'use strict';

const dialogflow = require('dialogflow');
const structjson = require('./structjson')
const config = require('../config/keys');

const projectID = config.googleProjectId;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });
const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionsId);

module.exports = {
    textQuery: async function (text, parameters = {}) {
        let self = module.exports;

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient
            .detectIntent(request);

        responses = await self.handleAction(responses);

        return responses;
    },

    eventQuery: async function (event, parameters = {}) {
        let self = module.exports;

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        };

        let responses = await sessionClient
            .detectIntent(request);
        responses = await self.handleAction(responses);

        return responses;
    },

    handleAction: async function (responses) {
        return responses;
    }
}