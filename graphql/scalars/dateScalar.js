import { GraphQLScalarType, Kind } from "graphql";

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",

  serialize(value) {
    // Convert outgoing Date to ISO String for JSON
    return value instanceof Date ? value.toISOString() : value;
  },

  parseValue(value) {
    // Convert incoming JSON value to Date
    return new Date(value);
  },

  parseLiteral(ast) {
    // Convert AST literal to Date
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export default DateScalar;
