package dev.rest;

import dev.controller.BookController;
import dev.entity.Book;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BooksRestTest {

    @Mock
    BookController bookController;

    @InjectMocks
    BooksRest booksRest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddBook() {
        Book book = new Book();
        Response response = booksRest.addBook(book);
        verify(bookController).createBook(book);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }

    @Test
    void testGetBooks() {
        List<Book> books = Arrays.asList(new Book(), new Book());
        when(bookController.getAllBooks()).thenReturn(books);
        List<Book> result = booksRest.getBooks();
        assertEquals(2, result.size());
        verify(bookController).getAllBooks();
    }

    @Test
    void testGetBookDetails() {
        Book book = new Book();
        when(bookController.getBookById(1)).thenReturn(book);
        Book result = booksRest.getBookDetails(1);
        assertEquals(book, result);
        verify(bookController).getBookById(1);
    }

    @Test
    void testDeleteBook() {
        Response response = booksRest.deleteBook(1);
        verify(bookController).deleteBook(1);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }

    @Test
    void testUpdateBook() {
        Book book = new Book();
        Response response = booksRest.updateBook(book);
        verify(bookController).updateBook(book);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }
}

