/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Enum that represents the type of an AR Object */
export enum ArObjectType {
  /** AR Object is a book */
  Book = 'book',
  /** AR Object is an object */
  Object = 'object',
  /** AR Object is a statue */
  Statue = 'statue'
}

export type SearchCategoriesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCategoriesQuery = { __typename?: 'Query', searchCategories: Array<{ __typename?: 'CategoryDetailsResponse', id?: string | null, description: string, name: string, images: { __typename?: 'CategoryImages', banner800x600: string } }> };

export type GetQuotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuotesQuery = { __typename?: 'Query', randomQuotes: Array<{ __typename?: 'PhilosopherQuoteResponse', id?: string | null, quote: string, work?: string | null, year?: string | null, philosopher: { __typename?: 'PhilosopherResponse', id?: string | null, name: string, username: string, images: { __typename?: 'PhilosopherImages', thumbnailIllustrations: { __typename?: 'SmallIllustrationImages', thumbnailIll150x150: string } } } }> };

export type SearchPhilosopherQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchPhilosopherQuery = { __typename?: 'Query', searchPhilosophers: Array<{ __typename?: 'PhilosopherResponse', name: string, username: string, id?: string | null, life: string, school?: string | null, interests: string, images: { __typename?: 'PhilosopherImages', thumbnailIllustrations: { __typename?: 'SmallIllustrationImages', thumbnailIll150x150: string } }, works: Array<{ __typename?: 'PhilosophicalWork', title: string, link?: string | null }> }> };

export type PhilosopherByUsernameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type PhilosopherByUsernameQuery = { __typename?: 'Query', philosopherByUsername: { __typename?: 'PhilosopherResponse', id?: string | null, name: string, username: string, life: string, hasEBooks: boolean, iepLink?: string | null, interests: string, libriVoxGetRequestLinks: Array<string>, school?: string | null, speLink?: string | null, wikiTitle: string, arObjects: Array<{ __typename?: 'ARObjectResponse', id?: string | null }>, birthLocation?: { __typename?: 'PhilosopherLocation', name: string, latitude: number, longitude: number } | null, images: { __typename?: 'PhilosopherImages', illustrations: { __typename?: 'IllustrationImages', ill500x500: string }, fullImages: { __typename?: 'FullImages', full1200x1600: string } }, quotes: Array<{ __typename?: 'Quote', id?: string | null, quote: string, year?: string | null, work?: string | null }>, works: Array<{ __typename?: 'PhilosophicalWork', title: string, link?: string | null }> } };

export type SearchQuotesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchQuotesQuery = { __typename?: 'Query', searchQuotes: Array<{ __typename?: 'PhilosopherQuoteResponse', id?: string | null, quote: string, year?: string | null, work?: string | null, philosopher: { __typename?: 'PhilosopherResponse', id?: string | null, name: string, username: string, images: { __typename?: 'PhilosopherImages', thumbnailIllustrations: { __typename?: 'SmallIllustrationImages', thumbnailIll150x150: string } } } }> };


export const SearchCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner800x600"}}]}}]}}]}}]} as unknown as DocumentNode<SearchCategoriesQuery, SearchCategoriesQueryVariables>;
export const GetQuotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomQuotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"IntValue","value":"15"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quote"}},{"kind":"Field","name":{"kind":"Name","value":"work"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"philosopher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailIllustrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailIll150x150"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuotesQuery, GetQuotesQueryVariables>;
export const SearchPhilosopherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchPhilosopher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPhilosophers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"life"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailIllustrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailIll150x150"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"works"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<SearchPhilosopherQuery, SearchPhilosopherQueryVariables>;
export const PhilosopherByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PhilosopherByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"philosopherByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"life"}},{"kind":"Field","name":{"kind":"Name","value":"arObjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"birthLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasEBooks"}},{"kind":"Field","name":{"kind":"Name","value":"iepLink"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"illustrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ill500x500"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fullImages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"full1200x1600"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"libriVoxGetRequestLinks"}},{"kind":"Field","name":{"kind":"Name","value":"quotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quote"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"work"}}]}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"speLink"}},{"kind":"Field","name":{"kind":"Name","value":"wikiTitle"}},{"kind":"Field","name":{"kind":"Name","value":"works"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<PhilosopherByUsernameQuery, PhilosopherByUsernameQueryVariables>;
export const SearchQuotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchQuotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchQuotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quote"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"work"}},{"kind":"Field","name":{"kind":"Name","value":"philosopher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailIllustrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailIll150x150"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuotesQuery, SearchQuotesQueryVariables>;