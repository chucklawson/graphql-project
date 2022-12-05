const graphql = require('graphql');
var _ = require('lodash');


var usersData=[
    {id: '1', name: 'Bond', age: 36, profession: 'teacher'},
    {id: '13', name: 'Anna', age: 26, profession: 'developer'},
    {id: '211', name: 'Bella', age: 16, profession: 'musician'},
    {id: '19', name: 'Gina', age: 26, profession: 'race car driver'},
    {id: '150', name: 'Georgina', age: 36, profession: 'digger'},
    {id: '2', name: 'Chuck', age: 46, profession: 'just does'},
    {id: '3', name: 'Lyn', age: 47, profession: 'boss'},
    {id: '4', name: 'Summer', age: 15, profession: 'student'}
];

var hobbiesData=[
    {id: '1', title: 'Programming', desdescriptioncrition: 'Using computers to make the world a better place', userId: '1'},
    {id: '2', title: 'Rowing', description: 'Sweat and fell better before eating donouts', userId: '13'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become a fish', userId: '1'},
    {id: '4', title: 'Fencing', description: 'A hobby for crazy people who like to play with swords', userId: '211'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'}    
];

var postsData=[
    {id: '1', comment: 'Buiding a mind', userId: '1'},
    {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
    {id: '3', comment: 'How to Change the way we think', userId: '19'},
    {id: '4', comment: 'How to Change the world', userId: '211'},
    {id: '5', comment: 'How to Change the way we walk', userId: '1'}
];

const {
GraphQLObjectType,
GraphQLID,
GraphQLString,
GraphQLInt,
GraphQLSchema

}=graphql

// create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Description of UserType',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type:GraphQLString},
        age:{type: GraphQLInt},
        profession:{type: GraphQLString},
        posts:{
            type: new graphql.GraphQLList(PostType),
            resolve(parent,args){
                return _.filter(postsData, {userId: parent.id});
            }
        },
        hobbies:{
            type: new graphql.GraphQLList(HobbyType),
            resolve(parent,args){
                return _.filter(hobbiesData, {userId: parent.id});
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Description of Hobby',
    fields:()=>({
        id: {type: GraphQLID},
        title: {type:GraphQLString},
        description:{type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent,args){
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Description of Post',
    fields:()=>({
        id: {type: GraphQLID},
        comment: {type:GraphQLString},
        user: {
            type: UserType,
            resolve(parent,args){
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
});
//RootQuery

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description of Root Query Type',
    fields:{
        user: {
            type: UserType,
            args:{id:{type: GraphQLID}
            },
            resolve(parent, args){
                // resolve with data
                // get and return data from a data source
                return _.find(usersData, {id: args.id})
            }
        },
        users:{
            type: new graphql.GraphQLList(UserType),
            resolve(parent, args){
                return usersData;
            }
        },
        hobby: {
            type: HobbyType,
            args:{id:{type: GraphQLID}
            },
            resolve(parent, args){
                // resolve with data
                // get and return data from a data source
                return _.find(hobbiesData, {id: args.id})
            }
        },
        hobbies:{
            type: new graphql.GraphQLList(HobbyType),
            resolve(parent, args){
                return hobbiesData;
            }
        },
        post: {
            type: PostType,
            args:{id:{type: GraphQLID}
            },
            resolve(parent, args){
                // resolve with data
                // get and return data from a data source
                return _.find(postsData, {id: args.id})
            }
        },
        posts:{
            type: new graphql.GraphQLList(PostType),
            resolve(parent, args){
                return postsData;
            }
        }
    }    
});

// Mutations

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        CreateUser:{
            type: UserType,
            args: {
                //id: {tpye: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },
            resolve(parent, args){
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },
        CreatePost:{
            type: PostType,
            args: {
                //id: {type: GraphQLID},
                comment: {type:GraphQLString},
            userId: {type: GraphQLID}
            },
            resolve(parent, args){
                let post = {
                    comment: args.comment,
                    userId: args.userId                    
                }
                return post;
            }
        },
        CreateHobby:{
            type: HobbyType,
            args: {
                //id: {type: GraphQLID},
                title: {type:GraphQLString},
                description:{type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args){
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId                    
                }
                return hobby;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})