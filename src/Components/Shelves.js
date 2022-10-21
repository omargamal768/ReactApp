import React from 'react';
import Shelf from './Shelf';


const Shelves = ({books , updatebookshelf}) => {

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
        <div>
            <Shelf title="Currently Reading" books={currentlyReading} updatebookshelf={updatebookshelf} />
            <Shelf title="Want To Read" books={wantToRead} updatebookshelf={updatebookshelf} />
            <Shelf title="Read" books={read} updatebookshelf={updatebookshelf} />
        </div>
    )

}

export default Shelves;