package com.api.prestamos.Model.Repository;

import com.api.prestamos.Model.Entity.LoanEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILoanRepository extends CrudRepository<LoanEntity,String> {
}
