const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Booking {
           _id: ID!
           event: Event!
           user: User!
           createdAt: String!
           updatedAt: String!
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            poster: String!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        type authData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            poster: String!
            date: String! 
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery{
            events: [Event!]!
            bookings: [Booking!]!
            login(email: String!, password: String!): authData 
        }
        type RootMutations{
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
            deleteEvent(eventId: ID!): Event
            
        }
        schema {
            query: RootQuery
            mutation: RootMutations
        }
    `);
