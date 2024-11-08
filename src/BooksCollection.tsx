import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import colors from "./color";

export interface Book {
    id: string;
    title: string;
    image: string | null | undefined;
}
export interface BooksCollectionProps {
    books: Book[];
}

const BooksCollection: React.FC<BooksCollectionProps> = ({ books }) => {
    // If there aren't enough books, repeat them to fill grid
    const displayBooks = [...books];
    while (displayBooks.length < 9) {
        displayBooks.push(...books);
    }
    displayBooks.length = 9;

    return (
        <div style={{
            width: '200px',
            height: '200px',
            margin: '0 auto',
            backgroundColor: colors.white,
            borderRadius: '40px',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'relative',
                top: '-40px',
                left: '-40px',
                width: '280px',
                height: '280px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                transform: 'rotate(32deg)',
                gap: '4px',
            }}>
                {displayBooks.map((book, index) => (
                    <div
                        key={`${book.id}-${index}`}
                        style={{
                            aspectRatio: '1',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#f3f4f6',
                        }}
                    >
                        {book.image ? (
                            <img
                                src={book.image}
                                alt={book.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.tan,
                                fontSize: '24px',
                                color: colors.blue,
                            }}>
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksCollection