package dev.controller;


import dev.entity.Lender;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class LenderController {

    @Transactional
    public Lender createLender(Lender lender) {
        lender.persist();
        return lender;
    }

    public List<Lender> getLenders() {
        return Lender.listAll();
    }

    public Lender getLenderById(int id) {
        return Lender.findById(id);
    }



    @Transactional
    public void deleteLender(int id) {
        Lender lender = Lender.findById(id);
        if (lender != null) {
            lender.delete();
        }
    }

    @Transactional
    public void updateLender(Lender lender) {
        Lender updatedLender = Lender.findById(lender.getId());
        if (updatedLender != null) {
            updatedLender.setLoanDate(lender.getLoanDate());
            updatedLender.setReturnDate(lender.getReturnDate());
            if (lender.getBook() != null && lender.getBook().getId() != null) {
                updatedLender.setBook(lender.getBook());
            }
            if (lender.getMemberID() != null && lender.getMemberID().getId() != null) {
                updatedLender.setMemberID(lender.getMemberID());
            }
        }
    }
}
