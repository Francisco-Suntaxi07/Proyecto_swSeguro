package com.api.libros.Model.Entity;

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
@Table(name = "Libro")
public class BookEntity implements Serializable {

    @Id
    @NotEmpty
    @Column(name = "id")
    private String id;

    @NotEmpty
    @Column(name = "titulo")
    private String title;

    @NotEmpty
    @Column(name = "autor")
    private String author;

    @NotEmpty
    @Column(name = "genero")
    private String genre;


    @Column(name = "editorial")
    private String publisher;

    @Column(name = "fecha_publicacion")
    private LocalDate  publicationDate;

    @Column(name = "num_paginas")
    private Integer numPages;

    @NotEmpty
    @Column(name = "estado")
    private String status;

    @NotNull
    @Column(name = "cantidad")
    private Integer quantity;

    @NotNull
    @Column(name = "precio")
    private BigDecimal price;

    public BookEntity() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Integer getNumPages() {
        return numPages;
    }

    public void setNumPages(Integer numPages) {
        this.numPages = numPages;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
