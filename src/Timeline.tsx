import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { PhilosophersTimelineQuery } from './gql/graphql';
import colors from './color';
import LoadingBounce from './LoadingBounce';
import QuoteImage from './QuoteImage';
import { getColorForUUID } from './colorForUUID';
import Spacer from './Spacer';

type Philosopher = NonNullable<PhilosophersTimelineQuery['allPhilosophers'][number]>;

const PHILOSOPHERS_TIMELINE_QUERY = gql`
  query PhilosophersTimeline {
    allPhilosophers {
      id
      name
      username
      images {
        thumbnailIllustrations {
          thumbnailIll150x150
        }
      }
      birthYear
      deathYear
      life
    }
  }
`;

const CONSTANTS = {
    yearToPointScale: 1.5,
    additionYears: 27,
    lineXInset: 16,
    labelXInset: 25,
    cellXInset: 80,
    cellPadding: 8,
    heightPadding: 30,
    cellWidth: 60,
    cellHeight: 100,
    verticalCellPadding: 50, // Added padding between cells
};

interface TimelineDimensions {
    width: number;
    height: number;
}

interface TimelineCell {
    philosopher: Philosopher;
    top: number;
    column: number;
}

interface TimelineCellProps {
    philosopher: Philosopher;
    top: number;
    left: number;
    firstYear: number;
    onClick: () => void;
}

const parseYear = (yearStr: string | null | undefined): number => {
    if (!yearStr) return 0;
    const num = parseInt(yearStr.replace(/[^-\d]/g, ''));
    const isBC = yearStr.includes('BC');
    return isBC ? -num : num;
};

const formatYear = (yearStr: string | null | undefined): string => {
    if (!yearStr) return '';
    const year = yearStr.replace(/[^-\d]/g, '');
    const isBC = yearStr.includes('BC');
    // Remove leading zeros
    const cleanYear = parseInt(year).toString();
    return `${cleanYear} ${isBC ? 'BC' : 'AD'}`;
};

const TimelineCell: React.FC<TimelineCellProps> = ({ philosopher, top, left, firstYear, onClick }) => {
    const birthYear = parseYear(philosopher.birthYear);
    const deathYear = parseYear(philosopher.deathYear);
    const lifespan = deathYear - birthYear;
    const lineHeight = lifespan * CONSTANTS.yearToPointScale;

    return (
        <div
            onClick={onClick}
            style={{
                position: 'absolute',
                top,
                left,
                width: CONSTANTS.cellWidth,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '4px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
                height: lineHeight < CONSTANTS.cellHeight ? CONSTANTS.cellHeight : lineHeight,
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = `${colors.black}10`}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 2,
                height: lineHeight,
                backgroundColor: getColorForUUID(philosopher.id ?? ""),
            }} />
            
            <div style={{
                position: 'absolute',
                top: 0,
                left: '4px',
                fontSize: '12px',
                color: colors.black,
                opacity: 0.7,
            }}>
                {formatYear(philosopher.birthYear)}
            </div>
            <Spacer />

            <QuoteImage
                philosopher={philosopher}
                width="40px"
                height="40px"
            />
            
            <div style={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.black,
                textAlign: 'left',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                {philosopher.name.split(' ').pop()}
            </div>
            <Spacer />

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '4px',
                fontSize: '12px',
                color: colors.black,
                opacity: 0.7,
            }}>
                {formatYear(philosopher.deathYear)}
            </div>
        </div>
    );
};

const Timeline: React.FC = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery<PhilosophersTimelineQuery>(PHILOSOPHERS_TIMELINE_QUERY);
    const [dimensions, setDimensions] = useState<TimelineDimensions>({ width: 0, height: 0 });
    const [cells, setCells] = useState<TimelineCell[]>([]);

    useEffect(() => {
        if (!data?.allPhilosophers) return;

        const philosophers = data.allPhilosophers
            .filter(p => p.birthYear)
            .sort((a, b) => parseYear(a.birthYear) - parseYear(b.birthYear));

        const firstYear = Math.min(...philosophers.map(p => parseYear(p.birthYear))) - CONSTANTS.additionYears;
        const lastYear = Math.max(...philosophers.map(p => 
            parseYear(p.deathYear || new Date().getFullYear().toString())
        )) + CONSTANTS.additionYears;

        const height = (lastYear - firstYear) * CONSTANTS.yearToPointScale;

        // Calculate cell positions with collision avoidance
        const timelineCells: TimelineCell[] = [];
        const columnOccupancy: Map<number, Set<number>> = new Map();

        philosophers.forEach(philosopher => {
            const birthYear = parseYear(philosopher.birthYear);
            const deathYear = parseYear(philosopher.deathYear);
            const startY = (birthYear - firstYear) * CONSTANTS.yearToPointScale;
            const endY = deathYear ? 
                (deathYear - firstYear) * CONSTANTS.yearToPointScale :
                startY + CONSTANTS.cellHeight;

            // Add padding to the occupied space
            const paddedEndY = endY + CONSTANTS.verticalCellPadding;

            // Find first available column
            let column = 0;
            let foundSpot = false;

            while (!foundSpot) {
                foundSpot = true;
                
                // Check if this column exists in occupancy map
                if (!columnOccupancy.has(column)) {
                    columnOccupancy.set(column, new Set());
                }

                const columnPositions = columnOccupancy.get(column)!;

                // Check for overlap with existing cells in this column
                for (let y = Math.floor(startY); y <= Math.ceil(paddedEndY); y++) {
                    if (columnPositions.has(y)) {
                        foundSpot = false;
                        column++;
                        break;
                    }
                }

                if (foundSpot) {
                    // Mark all positions in this column as occupied (including padding)
                    for (let y = Math.floor(startY); y <= Math.ceil(paddedEndY); y++) {
                        columnPositions.add(y);
                    }
                }
            }

            timelineCells.push({
                philosopher,
                top: startY,
                column
            });
        });

        // Calculate max width based on number of columns needed
        const maxColumn = Math.max(...timelineCells.map(cell => cell.column));
        const width = CONSTANTS.cellXInset + (maxColumn + 1) * (CONSTANTS.cellWidth + CONSTANTS.cellPadding);

        setDimensions({ width, height });
        setCells(timelineCells);
    }, [data]);

    const renderTimelineTicks = () => {
        const ticks = [];
        const yearSpan = dimensions.height / CONSTANTS.yearToPointScale;
        const startYear = -650;
        const numTicks = Math.floor(yearSpan / 50);

        for (let i = 0; i <= numTicks; i++) {
            const year = startYear + (i * 50);
            const isBC = year < 0;
            const displayYear = `${Math.abs(year)} ${isBC ? 'BC' : 'AD'}`;
            const top = i * 50 * CONSTANTS.yearToPointScale;

            ticks.push(
                <React.Fragment key={year}>
                    <div style={{
                        position: 'absolute',
                        top: top - 3,
                        left: CONSTANTS.lineXInset - 3,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: colors.black,
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: top - 8,
                        left: CONSTANTS.labelXInset,
                        fontSize: '12px',
                        color: colors.black,
                    }}>
                        {displayYear}
                    </div>
                </React.Fragment>
            );
        }
        return ticks;
    };

    if (loading) return <LoadingBounce />;
    if (error) return null;
    if (!data?.allPhilosophers) return null;

    const renderPhilosophers = () => {
        return cells.map(({ philosopher, top, column }) => (
            <TimelineCell
                key={philosopher.id}
                philosopher={philosopher}
                top={top}
                left={CONSTANTS.cellXInset + column * (CONSTANTS.cellWidth + CONSTANTS.cellPadding)}
                firstYear={-650}
                onClick={() => navigate(`/profile/${philosopher.username}`)}
            />
        ));
    };

    return (
        <div style={{
            position: 'relative', 
            width: '100%',
            height: '100vh',
            overflowY: 'visible',
            overflowX: 'scroll',
            padding: '40px 0px',
        }}>
            <div style={{
                position: 'relative',
                width: dimensions.width,
                height: dimensions.height,
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: CONSTANTS.lineXInset - 1.5,
                    width: 3,
                    height: '100%',
                    backgroundColor: colors.black,
                    borderRadius: '1.5px',
                }} />

                {renderTimelineTicks()}
                {renderPhilosophers()}
            </div>
        </div>
    );
};

export default Timeline;

