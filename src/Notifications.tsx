import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { parsePhilosopherDate, categorizeEvents, formatEventDate } from './dateUtils';
import QuoteImage from './QuoteImage';
import colors from './color';
import { NavLink } from 'react-router-dom';
import LoadingBounce from './LoadingBounce';
import { AllPhilosophersNotificationsDocument, AllPhilosophersNotificationsQuery } from './gql/graphql';

interface PhilosopherImages {
    thumbnailIllustrations?: {
        thumbnailIll150x150?: string;
    } | null;
}

interface Philosopher {
    id: string;
    name: string;
    username: string;
    images?: PhilosopherImages | null;
    birthDate?: string | null;
    deathDate?: string | null;
}

interface AllPhilosophersData {
    allPhilosophers: Philosopher[];
}

const ALL_PHILOSOPHERS_QUERY = gql`
  query AllPhilosophersNotifications {
    allPhilosophers {
      id
      name
      username
      images {
        thumbnailIllustrations {
          thumbnailIll150x150
        }
      }
      birthDate
      deathDate
    }
  }
`;

const NotificationItem: React.FC<{
    philosopherId: string;
    name: string;
    username: string;
    thumbnailUrl?: string;
    date: Date;
    type: 'birth' | 'death';
    showDate?: boolean;
}> = ({ philosopherId, name, username, thumbnailUrl, date, type, showDate = true }) => {
    return (
        <NavLink
            to={`/profile/${username}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                gap: '12px',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
            }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = `${colors.black}10`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <QuoteImage
                    philosopher={{
                        id: philosopherId,
                        name,
                        username,
                        images: {
                            thumbnailIllustrations: {
                                thumbnailIll150x150: thumbnailUrl ?? ''
                            }
                        }
                    }}
                    width="50px"
                    height="50px"
                />
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{name}</div>
                    <div style={{ fontSize: '0.9em', color: colors.black, opacity: 0.7 }}>
                        {type === 'birth' ? 'Birthday' : 'Death Anniversary'}
                        {showDate && ` on ${formatEventDate(date)}`}
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

const NotificationSection: React.FC<{
    title: string;
    events: Array<{
        id: string;
        philosopherId: string;
        name: string;
        username: string;
        thumbnailUrl?: string;
        date: Date;
        type: 'birth' | 'death';
    }>;
    showDates?: boolean;
}> = ({ title, events, showDates = true }) => {
    if (events.length === 0) return null;

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                marginBottom: '12px',
                paddingLeft: '12px'
            }}>
                {title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {events.map(event => (
                    <NotificationItem
                        key={`${event.id}-${event.type}`}
                        {...event}
                        showDate={showDates}
                    />
                ))}
            </div>
        </div>
    );
};

const Notifications: React.FC = () => {
    const { loading, error, data } = useQuery(ALL_PHILOSOPHERS_QUERY);

    if (loading) return <LoadingBounce />;
    if (error) return <div>Error loading notifications</div>;

    const events = data.allPhilosophers.flatMap((philosopher: Philosopher) => {
        const events = [];
        const birthDate = parsePhilosopherDate(philosopher.birthDate);
        const deathDate = parsePhilosopherDate(philosopher.deathDate);

        if (birthDate) {
            events.push({
                id: philosopher.id,
                philosopherId: philosopher.id,
                name: philosopher.name,
                username: philosopher.username,
                thumbnailUrl: philosopher.images?.thumbnailIllustrations?.thumbnailIll150x150,
                date: birthDate,
                type: 'birth' as const
            });
        }

        if (deathDate) {
            events.push({
                id: philosopher.id,
                philosopherId: philosopher.id,
                name: philosopher.name,
                username: philosopher.username,
                thumbnailUrl: philosopher.images?.thumbnailIllustrations?.thumbnailIll150x150,
                date: deathDate,
                type: 'death' as const
            });
        }

        return events;
    });

    const { current, upcoming, past } = categorizeEvents(events);

    return (
        <div>
            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: `${colors.white}aa`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 10,
                height: '62px',
                width: '100%',
                borderBottomColor: colors.tan,
                borderBottomWidth: '4px',
                borderBottomStyle: 'solid',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px'
            }}>
                <div style={{
                    fontWeight: 700,
                    fontSize: '1.4em',
                    color: colors.black,
                    paddingLeft: '20px',
                }}>
                    {loading ? 'Loading...' : 'Notifications'}
                </div>
            </div>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                margin: '0 auto',
                padding: '20px',
            }}>

                <NotificationSection
                    title="Today"
                    events={current}
                    showDates={false}
                />
                <NotificationSection
                    title="Upcoming"
                    events={upcoming}
                />
                <NotificationSection
                    title="Past"
                    events={past}
                />
                {current.length === 0 && upcoming.length === 0 && past.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        color: colors.black,
                        opacity: 0.7,
                        marginTop: '40px'
                    }}>
                        No recent or upcoming events
                    </div>
                )}
            </div>
        </div>

    );
};

export default Notifications;