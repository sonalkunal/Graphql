const graphql=require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;
var _=require('lodash');

//dummy data

var books = [
   {name:'abc', id:'2',genre:"health"},
   {name:'xyz', id:'1'},
   {name:'123', id:'3'},
]

const BookType = new GraphQLObjectType({
	name:'Book',
	fields:()=>({
		id:{type:GraphQLString},
		name:{type:GraphQLString},
		genre:{type:GraphQLString},
	})
})

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		book:{
			type:BookType,
			args:{id:{type:GraphQLString}},
			resolve(parent,args){

				//code to get data from db.
				return _.find(books,{id:args.id});

			}
		}
	}
})


module.exports = new GraphQLSchema({
	query:RootQuery
});