import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js';
import Book from './Book'

class SearchPage extends Component {
    state = {
        query: "",
        results: [],
        catchError: false
    }

    searchResults = (q) => {
        BooksAPI.search(q).then((books) => {
            books.length > 0 ? this.setState({ results: books, catchError: false }) 
            : this.setState({ results: [], catchError: true })
        })
    }
    updateQuery = (e) => {
        this.setState(() => ({
            query: e
        }))
        if (e) {
        this.searchResults(e)
        } else {
            this.setState({ results: [], searchErr: false })
        }
    }
    render() {
        const { query, results, catchError } = this.state
        const { shelves } = this.props
        return(
            <div id="search-pg">
            <input
                id="search-bar"
                type="text"
                value={query}
                placeholder="Search for books"
                onChange={(e) => this.updateQuery(e.target.value)}
            />
    
                
                {results.map((book, id) => (
                <div className="book">
                        <Book 
                            key={id}
                            book={book}
                            shelves={shelves}
                            onMove={this.props.onMove}
                        />
                </div> 
                ))}
                
               
                
                
            
            {catchError && (
                <h3>Your search - "{query}" - did not match any books.</h3>
            )}
            </div>
        )
    }
}

export default SearchPage