<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*" %>
<%@ page import="model.Book" %>
<%
    List<Book> books = new ArrayList<>();
    books.add(new Book("A Arte da Leitura", "Marta Oliveira", "2023", "978-85-0000-001-1"));
    books.add(new Book("História da Ciência", "Bruno Alves", "2021", "978-85-0000-002-8"));
    books.add(new Book("Design Silencioso", "Camila Reis", "2024", "978-85-0000-003-5"));
    books.add(new Book("Gestão Acadêmica", "Lucas Silva", "2022", "978-85-0000-004-2"));
    request.setAttribute("books", books);
%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca Cesumar</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<div class="app-shell">
    <aside class="sidebar">
        <div class="brand">BC</div>
        <nav class="nav-icons">
            <button class="nav-item active" title="Dashboard">🏠</button>
            <button class="nav-item" title="Livros">📚</button>
            <button class="nav-item" title="Autores">👩‍🏫</button>
            <button class="nav-item" title="Categorias">🗂️</button>
            <button class="nav-item" title="Configurações">⚙️</button>
        </nav>
    </aside>

    <main class="main-panel">
        <header class="topbar">
            <div class="logo">Biblioteca Cesumar</div>
        </header>

        <section class="hero-search">
            <div class="search-shell">
                <div class="search-field">
                    <span class="search-icon">🔍</span>
                    <input type="text" placeholder="Pesquisar livros por título..." aria-label="Pesquisar livros por título">
                </div>
                <button class="button-primary" type="button">+ Adicionar Livro</button>
            </div>
        </section>

        <section class="cards-grid">
            <div class="section-header">
                <div>
                    <p class="section-subtitle">Acervo recente</p>
                    <h1>Livros disponíveis</h1>
                </div>
                <span class="badge">24 itens</span>
            </div>

            <div class="cards-wrapper">
                <c:forEach var="book" items="${books}">
                    <article class="book-card">
                        <div class="book-spine"></div>
                        <div class="book-body">
                            <div class="book-meta">
                                <div class="book-icon">📖</div>
                                <div>
                                    <h2>${book.title}</h2>
                                    <p class="book-author">${book.author}</p>
                                </div>
                            </div>
                            <div class="book-details">
                                <p><strong>Ano:</strong> ${book.year}</p>
                                <p><strong>ISBN:</strong> ${book.isbn}</p>
                            </div>
                            <div class="book-actions">
                                <button class="button-secondary">Detalhes</button>
                                <button class="button-tertiary">Excluir</button>
                            </div>
                        </div>
                    </article>
                </c:forEach>
            </div>
        </section>
    </main>
</div>
<script src="js/app.js"></script>
</body>
</html>
