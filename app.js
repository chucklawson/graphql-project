const express = require( 'express' );
const { graphqlHTTP } = require( 'express-graphql' );
const schema = require('./server/schema/schema');
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 4000

// mongodb+srv://chuck:<password>@graphqlcluster.lfpsbaz.mongodb.net/?retryWrites=true&w=majority

app.use( '/graphql', graphqlHTTP( { 
    graphiql: true,
    schema: schema 
} ) );

mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphqlcluster.lfpsbaz.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true}).then (() => {

app.listen( {port: port}, () =>  //localhost:4000
{
    console.log( 'Listening for requests on port port: ' +port);
} );
}).catch((e)=> console.log("Error::" + e));