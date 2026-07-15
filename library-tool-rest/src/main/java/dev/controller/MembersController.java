package dev.controller;


import dev.entity.Members;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.security.SecureRandom;
import java.util.List;

@ApplicationScoped
public class MembersController {

    @Transactional
    public Members createMember(Members member) {
        if(member.getId() == 0){
            member.setMemberID(generateNumericId(10));
            member.persist();
            return member;
        } else {
            updateMember(member);
            // Nach Update das aktualisierte Objekt zurückgeben
            return Members.findById(member.getId());
        }
    }

    public List<Members> getAllMembers() {
        return Members.listAll();
    }


    @Transactional
    public void deleteMember(int id) {
        Members member = Members.findById(id);
        if (member != null) {
            member.delete();
        }
    }

    public Members findMembersById(int id) {
        return Members.findById(id);
    }


    @Transactional
    public void updateMember(Members member) {
        Members updateMember = Members.findById(member.getId());
        if (updateMember != null) {
            updateMember.setFirstName(member.getFirstName());
            updateMember.setSurName(member.getSurName());
            updateMember.setAddress(member.getAddress());
            updateMember.setTelephoneNumber(member.getTelephoneNumber());
            updateMember.setMail(member.getMail());
            updateMember.persist();
        }
    }


    private static final SecureRandom RND = new SecureRandom();

    public static String generateNumericId(int length) {
        StringBuilder number = new StringBuilder();
        for (int i = 0; i < length; i++) {
            number.append(RND.nextInt(10));
        }
        return number.toString();
    }

}
