package com.api.prestamos.Controller;

import com.api.prestamos.Model.Entity.LoanEntity;
import com.api.prestamos.Service.ILoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoanRestController {

    @Autowired
    private ILoanService loanService;

    @GetMapping("/loans/all")
    public ResponseEntity<List<LoanEntity>> findAllLoans (){
        return ResponseEntity.ok().body(loanService.findAllLoans());
    }

    @GetMapping("/loans/{id}")
    public ResponseEntity<?> findLoanById(@PathVariable String id) {
        Optional<LoanEntity> response = loanService.findLoanById(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response.get());
    }

    @PostMapping("/loans/save")
    public ResponseEntity<?> saveBook(@Valid @RequestBody LoanEntity loan, BindingResult result){
        if(result.hasErrors()) {
            return this.validar(result);
        }
        LoanEntity response = loanService.saveLoan(loan);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/loans/delete/{id}")
    public ResponseEntity<?> deleteBookById(@PathVariable String id){
        boolean response = loanService.deleteLoanById(id);
        if(response) {
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }

    protected ResponseEntity<?> validar(BindingResult result){
        Map<String, Object> errores = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errores.put(err.getField(),"El campo "+err.getField()+" "+err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }
}
