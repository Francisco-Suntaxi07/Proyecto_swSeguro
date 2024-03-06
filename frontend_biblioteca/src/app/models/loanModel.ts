export class LoanModel {
    id?: string;
    bookId?: string;
    customerId?: string;
    loanDate?: Date;
    returnDate?: Date;
    price?: number;
    fine?: number;
    observations?: string;
}