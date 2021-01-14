const express = require("express");
const bodyParser = require("body-parser");
const { URLSearchParams } = require('url');
const mongoose = require('mongoose');
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require('graphql');
const Event = require("./models/events");

const app = express();
global.URLSearchParams = URLSearchParams;
app.use(bodyParser.json());

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
			const event = new Event({
				title: args.event.title,
				description: args.event.description,
				price: args.event.price,
				date: new Date(args.event.date)
			});

			return event.save().then(res => {
				return {...result._doc};
			}).catch( err => {
				console.log(err);
				throw err;
			});
		}
	},
	graphiql: true,
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@cluster0.xyqf5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
	app.listen(3000);
}).catch((err) => {
	console.log(err);
})

