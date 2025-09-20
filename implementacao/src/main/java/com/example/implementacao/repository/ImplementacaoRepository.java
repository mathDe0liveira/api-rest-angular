package com.example.implementacao.repository;

import com.example.implementacao.model.Implementacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImplementacaoRepository extends JpaRepository<Implementacao, Integer>{

}
