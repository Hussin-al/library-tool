package dev.controller;


import dev.entity.Autor;
import dev.entity.Book;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class BookController {


    @Transactional
    public Book createBook(Book book) {
        book.persist();
        return book;
    }

    public List<Book> getAllBooks() {
        return Book.listAll();
    }

    public Book getBookById(int id) {
        return Book.findById(id);
    }

    @Transactional
    public void deleteBook(int id) {
        Book book = Book.findById(id);
        if (book != null) {
            book.delete();
        }
    }


    @Transactional
    public void updateBook(Book book) {
        Book updateBook = Book.findById(book.getId());
        if (updateBook != null) {
            updateBook.setTitle(book.getTitle());
            updateBook.setIsbn(book.getIsbn());
            updateBook.setPublicationDate(book.getPublicationDate());
            updateBook.setPublisher(book.getPublisher());
            if (book.getAutor() != null && book.getAutor().getId() != null) {
                updateBook.setAutor(Autor.findById(book.getAutor().getId()));
            }
        }
    }

}
