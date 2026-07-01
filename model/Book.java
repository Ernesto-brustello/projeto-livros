package model;

public class Book {
    private final String title;
    private final String author;
    private final String year;
    private final String isbn;

    public Book(String title, String author, String year, String isbn) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getYear() {
        return year;
    }

    public String getIsbn() {
        return isbn;
    }
}
