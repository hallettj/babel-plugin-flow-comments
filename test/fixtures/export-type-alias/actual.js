export type GraphQLFormattedError = {
  message: string,
  locations?: Array<{
    line: number,
    column: number
  }>
};