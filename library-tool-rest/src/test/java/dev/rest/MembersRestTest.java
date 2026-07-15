package dev.rest;

import dev.controller.MembersController;
import dev.entity.Members;
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

class MembersRestTest {

    @Mock
    MembersController membersController;

    @InjectMocks
    MembersRest membersRest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddMembers() {
        Members members = new Members();
        Response response = membersRest.addMembers(members);
        verify(membersController).createMember(members);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }

    @Test
    void testGetMembers() {
        List<Members> membersList = Arrays.asList(new Members(), new Members());
        when(membersController.getAllMembers()).thenReturn(membersList);
        List<Members> result = membersRest.getMembers();
        assertEquals(2, result.size());
        verify(membersController).getAllMembers();
    }

    @Test
    void testFindMembersById() {
        Members members = new Members();
        when(membersController.findMembersById(1)).thenReturn(members);
        Members result = membersRest.findMembersById(1);
        assertEquals(members, result);
        verify(membersController).findMembersById(1);
    }

    @Test
    void testUpdateMembers() {
        Members members = new Members();
        Response response = membersRest.updateMembers(members);
        verify(membersController).updateMember(members);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }

    @Test
    void testDeleteMembers() {
        Response response = membersRest.deleteMembers(1);
        verify(membersController).deleteMember(1);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }
}

