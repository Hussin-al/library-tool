package dev.rest;

import dev.controller.AutorController;
import dev.entity.Autor;
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

class AutorRestTest {

    @Mock
    AutorController autorController;

    @InjectMocks
    AutorRest autorRest;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddAutor() {
        Autor autor = new Autor();
        Response response = autorRest.addAutor(autor);
        verify(autorController).createAutor(autor);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }

    @Test
    void testGetAutors() {
        List<Autor> autors = Arrays.asList(new Autor(), new Autor());
        when(autorController.getAllAutors()).thenReturn(autors);
        List<Autor> result = autorRest.getAutors();
        assertEquals(2, result.size());
        verify(autorController).getAllAutors();
    }

    @Test
    void testGetAutorDetails() {
        Autor autor = new Autor();
        when(autorController.getAutorById(1)).thenReturn(autor);
        Autor result = autorRest.getAutorDetails(1);
        assertEquals(autor, result);
        verify(autorController).getAutorById(1);
    }

}

