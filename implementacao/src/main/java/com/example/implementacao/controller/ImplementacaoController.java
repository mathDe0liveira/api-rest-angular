package com.example.implementacao.controller;

import com.example.implementacao.model.Implementacao;
import com.example.implementacao.service.ImplementacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/implementacoes")
public class ImplementacaoController {

    @Autowired
    private ImplementacaoService implementacaoService;

    // Endpoint para CRIAR (CREATE) uma nova implementação
    @PostMapping
    public ResponseEntity<Implementacao> criarImplementacao(@RequestBody Implementacao implementacao) {
        Implementacao novaImplementacao = implementacaoService.salvar(implementacao);
        return new ResponseEntity<>(novaImplementacao, HttpStatus.CREATED);
    }

    // Endpoint para LISTAR TODAS (READ)
    @GetMapping
    public List<Implementacao> listarTodas() {
        return implementacaoService.listarTodas();
    }

    // Endpoint para BUSCAR POR ID (READ)
    @GetMapping("/{id}")
    public ResponseEntity<Implementacao> buscarPorId(@PathVariable Integer id) {
        Optional<Implementacao> implementacao = implementacaoService.buscarPorId(id);
        // Se a implementação existir, retorna ela com status OK. Se não, retorna NOT FOUND.
        return implementacao.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para ATUALIZAR (UPDATE) uma implementação
    @PutMapping("/{id}")
    public ResponseEntity<Implementacao> atualizarImplementacao(@PathVariable Integer id, @RequestBody Implementacao implementacaoDetalhes) {
        return implementacaoService.buscarPorId(id)
                .map(implementacaoExistente -> {
                    // Atualiza os campos do objeto existente com os dados recebidos
                    implementacaoExistente.setIdProjeto(implementacaoDetalhes.getIdProjeto());
                    implementacaoExistente.setDescricao(implementacaoDetalhes.getDescricao());
                    implementacaoExistente.setDataInicio(implementacaoDetalhes.getDataInicio());
                    implementacaoExistente.setDataFim(implementacaoDetalhes.getDataFim());
                    implementacaoExistente.setDesenvolvedorResponsavel(implementacaoDetalhes.getDesenvolvedorResponsavel());
                    implementacaoExistente.setVersaoGerada(implementacaoDetalhes.getVersaoGerada());
                    implementacaoExistente.setStatus(implementacaoDetalhes.getStatus());

                    // Salva a implementação atualizada
                    Implementacao atualizada = implementacaoService.salvar(implementacaoExistente);
                    return new ResponseEntity<>(atualizada, HttpStatus.OK);
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Se não encontrar, retorna 404
    }

    // Endpoint para DELETAR (DELETE) uma implementação
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarImplementacao(@PathVariable Integer id) {
        if (implementacaoService.buscarPorId(id).isPresent()) {
            implementacaoService.deletar(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content (sucesso, sem conteúdo)
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 Not Found
        }
    }
}
