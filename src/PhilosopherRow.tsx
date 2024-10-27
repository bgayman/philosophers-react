import { SearchPhilosopherQuery, SearchPhilosopherQueryVariables } from './gql/graphql';
import React from 'react';
import QuoteHeader from './QuoteHeader';
import colors from './color';

const PhilosopherRow: React.FC<{ philosopher: SearchPhilosopherQuery['searchPhilosophers'][number] }> = React.memo(({ philosopher }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        margin: '10px',
    }}>
        <QuoteHeader philosopher={philosopher} />
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            fontSize: '0.8em',
            color: '#666',
        }}>
            <div>
                {philosopher.life}
            </div>
        </div>
        <div style={{
            fontSize: '0.9em',
            color: '#666',
        }}>
            {philosopher.interests}
        </div>
        <div style={{
            color: '#666',
            fontSize: '0.9em',
            fontWeight: 600,
        }}>
            {philosopher.works?.map((work, index, array) => (
                <React.Fragment key={work.title}>
                    <a
                        href={work.link ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: colors.blue,
                            textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                        }}
                    >
                        {work.title}
                    </a>
                    {index < array.length - 1 && ', '}
                </React.Fragment>
            ))}
        </div>
    </div>
));

export default PhilosopherRow;