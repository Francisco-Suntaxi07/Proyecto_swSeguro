package com.api.prestamos.Model.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Prestamo")
public class LoanEntity implements Serializable {

    @Id
    @NotEmpty
    @Column(name = "id_prestamo")
    private String id;

    @NotEmpty
    @Column(name = "id_libro")
    private String bookId;

    @NotEmpty
    @Column(name = "id_cliente")
    private String customerId;

    @NotNull
    @Column(name = "fecha_prestamo")
    private LocalDate loanDate;

    @Column(name = "fecha_devolucion")
    private LocalDate returnDate;

    @NotNull
    @Column(name = "precio")
    private BigDecimal price;

    @Column(name = "multa")
    private BigDecimal fine;

    @Column(name = "observaciones")
    private String observations;


    public LoanEntity() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getFine() {
        return fine;
    }

    public void setFine(BigDecimal fine) {
        this.fine = fine;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }
}
