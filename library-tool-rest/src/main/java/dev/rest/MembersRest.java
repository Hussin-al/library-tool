package dev.rest;

import dev.controller.MembersController;
import dev.entity.Members;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/v1")
public class MembersRest {

    @Inject
    MembersController membersController;

    @POST
    @Path("/createMember")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addMembers(Members members) {
        membersController.createMember(members);
        return Response.ok().build();
    }

    @GET
    @Path("/members")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Members> getMembers() {
        return membersController.getAllMembers();
    }

    @GET
    @Path("/memberDetails/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Members findMembersById(@PathParam("id") int id) {
        return membersController.findMembersById(id);
    }

    @PUT
    @Path("/updateMember")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateMembers(Members members) {
        membersController.updateMember(members);
        return Response.ok().build();
    }


    @DELETE
    @Path("/deleteMember/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteMembers(@PathParam("id") int id) {
        membersController.deleteMember(id);
        return Response.ok().build();
    }


}