package com.api.prestamos.Service;

import com.api.prestamos.Model.Entity.LoanEntity;
import com.api.prestamos.Model.Repository.ILoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService implements ILoanService{

    @Autowired
    private ILoanRepository loanRepository;
    @Override
    public List<LoanEntity> findAllLoans() {
        return (ArrayList<LoanEntity>) loanRepository.findAll();
    }

    @Override
    public Optional<LoanEntity> findLoanById(String id) {
        return loanRepository.findById(id);
    }

    @Override
    public LoanEntity saveLoan(LoanEntity loan) {
        return loanRepository.save(loan);
    }

    @Override
    public boolean deleteLoanById(String id) {
        try {
            loanRepository.deleteById(id);
            return true;
        }catch(Exception e){
            System.out.println("ERROR: Revise la api de prestamos: " + e.getMessage());
            return false;
        }
    }
}
