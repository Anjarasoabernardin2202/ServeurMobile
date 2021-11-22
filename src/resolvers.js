const messageHello = "Hello Bernardin"

const resolvers = {
    Query: {
        titre: () => messageHello
    }
}

export default resolvers;