package com.example.implementacao.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate; // Importa a classe para datas

@Table(name = "implementacoes") // Define um nome específico para a tabela no banco
@Data
@Entity
public class Implementacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_implementacao") // Mapeia para o nome da coluna no banco
    private Integer id;

    @Column(name = "id_projeto")
    private Integer idProjeto;

    @Column(name = "descricao_impl", columnDefinition = "TEXT") // Garante que o tipo seja TEXT
    private String descricao;

    @Column(name = "data_inicio_impl")
    private LocalDate dataInicio;

    @Column(name = "data_fim_impl")
    private LocalDate dataFim;

    @Column(name = "desenvolvedor_responsavel", length = 100)
    private String desenvolvedorResponsavel;

    @Column(name = "versao_gerada", length = 20)
    private String versaoGerada;

    @Column(length = 1)
    private String status;
}
