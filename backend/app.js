const express = require("express");
const bodyParser = require("body-parser");
const { URLSearchParams } = require('url');
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require('graphql');


const app = express();
global.URLSearchParams = URLSearchParams;
app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
	schema: buildSchema(`
		type RootQuery {
			events: [String!]!
		}

		type RootMutation {
			createEvent(name: String): String
		}

		schema {
			query: RootQuery 
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return [
				"Jhabar",
				"Ram",
				"Jethu"
			]
		},
		createEvent: (args) => {
			const eventName = args.name;
			return eventName;
		}
	},
	graphiql: true,
}));


app.listen(3000);
