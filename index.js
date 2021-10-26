const {ApolloServer, gql} = require("apollo-server")

//Schemas
// Resolvers

const books = [
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K Rowlings",
        ISBN: "1-333-5833-3"
    },
    {
        title: "Jurassic Park",
        author: "Micheal Crichton",
        ISBN: "1-333-5833-3"
    },
];


const schemas = gql`
    type Book {
        title: String!
        author: String!
        ISBN: String
    }

    type Query {
        books: [Book]
        book(title: String!): Book
    }

    type Mutation {
        createBook(title: String!, author: String!, ISBN: String): Book
    }
`;   

const booksResolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.title === args.title)
    },
    Mutation: {
        createBook:  (parent, args) => {
            const { title, author, ISBN } = args;
            const book = { title, author, ISBN };
            books.push(book);
            return book;
        }
    }
}

const server = new ApolloServer({ typeDefs: schemas, resolvers: booksResolvers });

server.listen(8000).then(({ url, port }) => {
    console.log(`Server ready at ${url}`)
}).catch(err => console.log(err));

