import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { SearchCategoriesQuery, SearchCategoriesQueryVariables } from './gql/graphql';
import CategoryItem from './CategoryItem';

// Define your GraphQL query using the `gql` tag
export const SEARCH_CATEGORIES = gql`
  query SearchCategories($search: String!) {
    searchCategories(search: $search) {
      id
      description
      name
      images {
        banner800x600
      }
    }
  }
`;

interface CategoryListProps {
  searchTerm?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ searchTerm }) => {
  const [searchCategories, { loading, error, data }] = useLazyQuery<SearchCategoriesQuery, SearchCategoriesQueryVariables>(
    SEARCH_CATEGORIES
  );

  React.useEffect(() => {
    if (searchTerm) {
      const trimmedTerm = searchTerm.trim();
      if (trimmedTerm) {
        searchCategories({
          variables: { search: trimmedTerm }
        }).catch(err => {
          console.error('Error searching categories:', err);
        });
      }
    }
  }, [searchTerm, searchCategories]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: '12px'
    }}>
      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading categories...
        </div>
      )}

      {error && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: 'red'
        }}>
          Error: {error.message}
        </div>
      )}

      {data?.searchCategories.length === 0 && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#666'
        }}>
          No categories found matching "{searchTerm}"
        </div>
      )}

      {data?.searchCategories.map(category => (
        <div key={category.id} style={{
          width: '200px'
        }}>
          <CategoryItem category={category} imageWidth='200px' imageHeight='150px'/>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;