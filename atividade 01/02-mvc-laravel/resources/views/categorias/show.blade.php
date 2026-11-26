@extends('layouts.app')

@section('titulo', 'Detalhes da Categoria — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>

    <h1>{{ $categoria->nome }}</h1>

    <p class="sub">{{ $categoria->descricao }}</p>

    <h2>Produtos desta categoria</h2>

    <div class="grid">
        @forelse ($produtos as $produto)
            <a class="card" href="/produtos/{{ $produto->id }}">
                <div class="emoji">{{ $produto->emoji }}</div>

                <span class="cat">{{ $produto->categoria }}</span>

                <p class="nome">{{ $produto->nome }}</p>

                <p class="preco">
                    R$ {{ number_format($produto->preco, 2, ',', '.') }}
                </p>
            </a>
        @empty
            <p>Nenhum produto encontrado nesta categoria.</p>
        @endforelse
    </div>

    <p>
        <a href="/categorias">Voltar para categorias</a>
    </p>
@endsection