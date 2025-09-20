package com.example.implementacao.service;

import com.example.implementacao.model.Implementacao;
import com.example.implementacao.repository.ImplementacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImplementacaoService {
    @Autowired // Spring, injete uma instância do nosso Repository aqui
    private ImplementacaoRepository implementacaoRepository;

    // Metodo para criar uma nova implementação
    public Implementacao salvar(Implementacao implementacao) {
        return implementacaoRepository.save(implementacao);
    }

    // Metodo para listar todas as implementações
    public List<Implementacao> listarTodas() {
        return implementacaoRepository.findAll();
    }

    // Metodo para buscar uma implementação pelo ID
    public Optional<Implementacao> buscarPorId(Integer id) {
        return implementacaoRepository.findById(id);
    }

    // Metodo para deletar uma implementação
    public void deletar(Integer id) {
        implementacaoRepository.deleteById(id);
    }
}
