const express = require("express");
const bodyParser = require("body-parser");
const { URLSearchParams } = require('url');
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require('graphql');


const app = express();
global.URLSearchParams = URLSearchParams;
app.use(bodyParser.json());

const eventsList = [
	{
		_id: "1",
		title: "Name is Rocky",
		desciption: "Yashraj production film",
		price: 12000000,
		date: "12/12/21"
	},
	{
		_id: "2",
		title: "Name is Rocky",
		desciption: "Yashraj production film",
		price: 12000100,
		date: "12/12/31"
	},
]

app.use('/graphql', graphqlHttp({
	schema: buildSchema(`

		type Event  {
			_id: ID
			title: String
			desciption: String!
			price: Float
			date: String!
		}

		input EventInput {
			title: String
			description: String!
			price: Float!
			date: String!
		}

		type RootQuery {
			events: [Event!]!
		}

		type RootMutation {
			createEvent(event: EventInput): Event
		}

		schema {
			query: RootQuery 
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return eventsList;
		},
		createEvent: (args) => {
			const event = {
				_id: Math.random().toString(),
				title: args.event.title,
				description: args.event.description,
				price: args.event.price,
				date: args.event.date
			}

			return event;
		}
	},
	graphiql: true,
}));


app.listen(3000);
