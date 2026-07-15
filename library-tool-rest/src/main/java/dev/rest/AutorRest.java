package dev.rest;




import dev.controller.AutorController;
import dev.entity.Autor;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/v1")
public class AutorRest {


    @Inject

    AutorController autorController;

    @POST
    @Path("/createAutor")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addAutor(Autor autor) {
        autorController.createAutor(autor);
        return Response.ok().build();
    }

    @GET
    @Path("/autors")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Autor> getAutors() {
        return autorController.getAllAutors();
    }


    @GET
    @Path("/autorDetails/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Autor getAutorDetails(@PathParam("id") int id) {
        return autorController.getAutorById(id);
    }


    @DELETE
    @Path("/deleteAutor/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteAutor(@PathParam("id") int id) {
        autorController.deleteAutor(id);
        return Response.ok().build();
    }

    @PUT
    @Path("/updateAutor")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAutor(Autor autor) {
        autorController.updateAutor(autor);
        return Response.ok().build();
    }


}
