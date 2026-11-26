<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Produto;

class CategoriaController extends Controller
{
    // Listagem: GET /categorias
    public function index()
    {
        $categorias = Categoria::orderBy('id')->get();

        return view('categorias.index', [
            'categorias' => $categorias,
        ]);
    }

    // Detalhe: GET /categorias/{id}
    public function show(int $id)
    {
        $categoria = Categoria::findOrFail($id);

        $produtos = Produto::where(
            'categoria',
            $categoria->nome
        )->get();

        return view('categorias.show', [
            'categoria' => $categoria,
            'produtos' => $produtos,
        ]);
    }
}