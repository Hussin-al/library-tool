package dev.rest;

import dev.controller.LenderController;
import dev.entity.Lender;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/v1")
public class LenderRest {

    @Inject
    LenderController lenderController;

    @POST
    @Path("/createLender")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addLender(Lender lender) {
        lenderController.createLender(lender);
        return Response.ok().build();
    }

    @GET
    @Path("/Lenders")
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Lender> getLenders() {
        return lenderController.getLenders();
    }


    @GET
    @Path("/lenderDetails/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Lender deleteLender(@PathParam("id") int id) {
        return lenderController.getLenderById(id);
    }

    @DELETE
    @Path("/deletLender/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteLenderById(@PathParam("id") int id) {
        lenderController.deleteLender(id);
        return Response.ok().build();
    }


    @PUT
    @Path("/updateLender")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateLender(Lender lender) {
        lenderController.updateLender(lender);
        return Response.ok().build();
    }

}
