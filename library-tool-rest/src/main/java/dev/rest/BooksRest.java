package dev.rest;


import dev.controller.BookController;
import dev.entity.Book;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/v1")
public class BooksRest {

    @Inject
    BookController bookController;

    @POST
    @Path("/createBook")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addBook(Book book) {
        bookController.createBook(book);
        return Response.ok().build();
    }

    @GET
    @Path("/books")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> getBooks() {
        return bookController.getAllBooks();
    }

    @GET
    @Path("/bookDetails/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Book getBookDetails(@PathParam("id") int id) {
        return bookController.getBookById(id);
    }

    @DELETE
    @Path("/deleteBook/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteBook(@PathParam("id") int id) {
        bookController.deleteBook(id);
        return Response.ok().build();
    }


    @PUT
    @Path("/updateBook")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBook(Book book) {
        bookController.updateBook(book);
        return Response.ok().build();
    }

}
