const graphql=require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;
var _=require('lodash');

//dummy data

var books = [
   {name:'abc', id:'2',genre:"health", authorId:'1'},
   {name:'xyz', id:'1',genre:"sports", authorId:'2'},
   {name:'123', id:'3',genre:"film", authorId:'3'},
   {name:'Five', id:'4',genre:"health", authorId:'2'},
   {name:'Six', id:'5',genre:"sports", authorId:'3'},
   {name:'Seven', id:'6',genre:"film", authorId:'3'}
]

var authors = [
   {name:'Kaushik Kunal', id:'2',age:38},
   {name:'Sam S', id:'1',age:19},
   {name:'Reeva K', id:'3',age: 20},
]

const BookType = new GraphQLObjectType({
	name:'Book',
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		genre:{type:GraphQLString},
		author:{
			type:AuthorType,
			resolve(parent,args){
				console.log(parent)
				return _.find(authors,{id:parent.authorId})
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name:'Author',
	fields:()=>({
		id:{type:GraphQLID},
		name:{type:GraphQLString},
		age:{type:GraphQLInt},
		books:{
			type: new GraphQLList(BookType),
			resolve(parent,args){
				return _.filter(books,{authorId:parent.id})
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		book:{
			type:BookType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				console.log(typeof(args.id))
				//code to get data from db.
				return _.find(books,{id:args.id});

			}
		},
		author:{
			type:AuthorType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				return _.find(authors,{id:args.id})
			}
		},
		books:{
			type: new GraphQLList(BookType),
			resolve(parent,args){
				return books;
			}
		},
		authors:{
			type: new GraphQLList(AuthorType),
			resolve(parent,args){
				return authors
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query:RootQuery
});