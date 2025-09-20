export interface Implementacao{
    id?: number;
    idProjeto: number;
    descricao: string;
    dataInicio: string; //Usar string no formato 'YYYY-MM-DD'
    dataFim: string | null;
    desenvolvedorResponsavel: string;
    versaoGerada: string;
    status: Status;
}

export enum Status{
    Andamento = 1,
    Teste = 2
}