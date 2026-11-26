@extends('layouts.app')

@section('titulo', 'Categorias — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>

    <h1>Categorias</h1>

    <p class="sub">
        Confira as categorias disponíveis na nossa loja.
    </p>

    <div class="grid">
        @foreach ($categorias as $categoria)
            <a class="card" href="/categorias/{{ $categoria->id }}">
                <span class="cat">Categoria</span>

                <p class="nome">{{ $categoria->nome }}</p>

                <p>{{ $categoria->descricao }}</p>
            </a>
        @endforeach
    </div>

    <p>
        <a href="/">← Voltar para a loja</a>
    </p>
@endsection