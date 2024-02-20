package com.api.prestamos.Service;

import com.api.prestamos.Model.Entity.LoanEntity;

import java.util.List;
import java.util.Optional;

public interface ILoanService {

    public List<LoanEntity> findAllLoans();
    public Optional<LoanEntity> findLoanById(String id);
    public LoanEntity saveLoan(LoanEntity loan);
    public boolean deleteLoanById(String id);

}
