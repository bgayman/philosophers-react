/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query SearchCategories($search: String!) {\n    searchCategories(search: $search) {\n      id\n      description\n      name\n      images {\n        banner800x600\n      }\n    }\n  }\n": types.SearchCategoriesDocument,
    "\n  query GetQuotes {\n    randomQuotes(count: 15) {\n      id\n      quote\n      work\n      year\n      philosopher {\n        id\n        name\n        username\n        images {\n          thumbnailIllustrations {\n            thumbnailIll150x150\n          }\n        }\n      }\n    }\n  }\n": types.GetQuotesDocument,
    "\n  query SearchPhilosopher($search: String!) {\n  searchPhilosophers(search: $search) {\n    name\n    username\n    id\n    life\n    school\n    interests\n    images {\n      thumbnailIllustrations {\n        thumbnailIll150x150\n      }\n    }\n    works{\n      title\n      link\n    }\n  }\n}\n": types.SearchPhilosopherDocument,
    "\n  query PhilosopherByUsername($name: String!) {\n  philosopherByUsername(name: $name) {\n    id\n    name\n    username\n    life\n    arObjects {\n      id\n    }\n    birthLocation {\n      name\n      latitude\n      longitude\n    }\n    hasEBooks\n    iepLink\n    images {\n      illustrations {\n        ill500x500\n      }\n      fullImages {\n        full1200x1600\n      }\n    }\n    interests\n    libriVoxGetRequestLinks\n    quotes {\n      id\n      quote\n      year\n      work\n    }\n    school \n    speLink\n    wikiTitle\n    works {\n      title\n      link\n    }\n  }\n}\n": types.PhilosopherByUsernameDocument,
    "\n  query SearchQuotes($search: String!) {\n    searchQuotes(search: $search) {\n      id\n      quote\n      year\n      work\n      philosopher {\n        id\n        name\n        username\n        images {\n          thumbnailIllustrations {\n            thumbnailIll150x150\n          }\n        }\n      }\n    }\n  }\n": types.SearchQuotesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCategories($search: String!) {\n    searchCategories(search: $search) {\n      id\n      description\n      name\n      images {\n        banner800x600\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchCategories($search: String!) {\n    searchCategories(search: $search) {\n      id\n      description\n      name\n      images {\n        banner800x600\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuotes {\n    randomQuotes(count: 15) {\n      id\n      quote\n      work\n      year\n      philosopher {\n        id\n        name\n        username\n        images {\n          thumbnailIllustrations {\n            thumbnailIll150x150\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuotes {\n    randomQuotes(count: 15) {\n      id\n      quote\n      work\n      year\n      philosopher {\n        id\n        name\n        username\n        images {\n          thumbnailIllustrations {\n            thumbnailIll150x150\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchPhilosopher($search: String!) {\n  searchPhilosophers(search: $search) {\n    name\n    username\n    id\n    life\n    school\n    interests\n    images {\n      thumbnailIllustrations {\n        thumbnailIll150x150\n      }\n    }\n    works{\n      title\n      link\n    }\n  }\n}\n"): (typeof documents)["\n  query SearchPhilosopher($search: String!) {\n  searchPhilosophers(search: $search) {\n    name\n    username\n    id\n    life\n    school\n    interests\n    images {\n      thumbnailIllustrations {\n        thumbnailIll150x150\n      }\n    }\n    works{\n      title\n      link\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PhilosopherByUsername($name: String!) {\n  philosopherByUsername(name: $name) {\n    id\n    name\n    username\n    life\n    arObjects {\n      id\n    }\n    birthLocation {\n      name\n      latitude\n      longitude\n    }\n    hasEBooks\n    iepLink\n    images {\n      illustrations {\n        ill500x500\n      }\n      fullImages {\n        full1200x1600\n      }\n    }\n    interests\n    libriVoxGetRequestLinks\n    quotes {\n      id\n      quote\n      year\n      work\n    }\n    school \n    speLink\n    wikiTitle\n    works {\n      title\n      link\n    }\n  }\n}\n"): (typeof documents)["\n  query PhilosopherByUsername($name: String!) {\n  philosopherByUsername(name: $name) {\n    id\n    name\n    username\n    life\n    arObjects {\n      id\n    }\n    birthLocation {\n      name\n      latitude\n      longitude\n    }\n    hasEBooks\n    iepLink\n    images {\n      illustrations {\n        ill500x500\n      }\n      fullImages {\n        full1200x1600\n      }\n    }\n    interests\n    libriVoxGetRequestLinks\n    quotes {\n      id\n      quote\n      year\n      work\n    }\n    school \n    speLink\n    wikiTitle\n    works {\n      title\n      link\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchQuotes($search: String!) {\n    searchQuotes(search: $search) {\n      id\n      quote\n      year\n      work\n      philosopher {\n        id\n        name\n        username\n        images {\n          thumbnailIllustrations {\n            thumbnailIll150x150\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchQuotes($search: String!) {\n    searchQuotes(search: $search) {\n      id\n      quote\n      year\n      work\n      philosopher {\n        id\n        name\n        username\n        images {\n          thumbnailIllustrations {\n            thumbnailIll150x150\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;