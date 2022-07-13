import { GraphQLResult, GraphQLOptions } from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify';

export async function graphqlQueryWrapper<T extends object>(options: GraphQLOptions, additionalHeaders?: {
  [key: string]: string;
}): Promise<GraphQLResult<T>> {
  const query = API.graphql(options, additionalHeaders) as Promise<GraphQLResult<T>>
  return query
}