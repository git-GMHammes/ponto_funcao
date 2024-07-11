import React, { useState, useEffect } from 'react';
import styles from './requisitos.module.css';

const Requisitos = ({ handleNovaContagem }) => {
    const [dadosFuncionais, setDadosFuncionais] = useState([]);
    const [dadosNaoFuncionais, setDadosNaoFuncionais] = useState([]);

    const [tituloFuncional, setTituloFuncional] = useState('');
    const [descricaoFuncional, setDescricaoFuncional] = useState('');
    const [prioridadeFuncional, setPrioridadeFuncional] = useState('');
    const [fronteiraFuncional, setFronteiraFuncional] = useState('');

    const [tipoNaoFuncional, setTipoNaoFuncional] = useState('');
    const [requisitoNaoFuncional, setRequisitoNaoFuncional] = useState('');
    const [prioridadeNaoFuncional, setPrioridadeNaoFuncional] = useState('');

    const [errorFuncional, setErrorFuncional] = useState(false);
    const [errorNaoFuncional, setErrorNaoFuncional] = useState(false);

    useEffect(() => {
        const projeto = JSON.parse(window.localStorage.getItem('projeto'));
        if (projeto && projeto.itensRequisito) {
            setDadosFuncionais(projeto.itensRequisito.dadosFuncionais || []);
            setDadosNaoFuncionais(projeto.itensRequisito.dadosNaoFuncionais || []);
        }
    }, []);

    const adicionarItemFuncional = () => {
        // Validar se todos os campos estão preenchidos
        if (!tituloFuncional || !descricaoFuncional || !prioridadeFuncional || !fronteiraFuncional) {
            setErrorFuncional(true);
            return;
        }

        const novoItem = {
            titulo: tituloFuncional,
            descricao: descricaoFuncional,
            prioridade: prioridadeFuncional,
            fronteira: fronteiraFuncional,
        };

        setDadosFuncionais([...dadosFuncionais, novoItem]);
        limparCamposFuncionais();
        salvarRequisitos();
        setErrorFuncional(false);
    };

    const adicionarItemNaoFuncional = () => {
        // Validar se todos os campos estão preenchidos
        if (!tipoNaoFuncional || !requisitoNaoFuncional || !prioridadeNaoFuncional) {
            setErrorNaoFuncional(true);
            return;
        }

        const novoItem = {
            tipo: tipoNaoFuncional,
            requisito: requisitoNaoFuncional,
            prioridade: prioridadeNaoFuncional,
        };

        setDadosNaoFuncionais([...dadosNaoFuncionais, novoItem]);
        limparCamposNaoFuncionais();
        salvarRequisitos();
        setErrorNaoFuncional(false);
    };

    const limparCamposFuncionais = () => {
        setTituloFuncional('');
        setDescricaoFuncional('');
        setPrioridadeFuncional('');
        setFronteiraFuncional('');
    };

    const limparCamposNaoFuncionais = () => {
        setTipoNaoFuncional('');
        setRequisitoNaoFuncional('');
        setPrioridadeNaoFuncional('');
    };

    const moverParaCimaFuncional = (index) => {
        salvarRequisitos();
        if (index > 0) {
            const novosDados = [...dadosFuncionais];
            [novosDados[index - 1], novosDados[index]] = [novosDados[index], novosDados[index - 1]];
            setDadosFuncionais(novosDados);
        }
    };

    const moverParaBaixoFuncional = (index) => {
        salvarRequisitos();

        if (index < dadosFuncionais.length - 1) {
            const novosDados = [...dadosFuncionais];
            [novosDados[index], novosDados[index + 1]] = [novosDados[index + 1], novosDados[index]];
            setDadosFuncionais(novosDados);
        }
    };

    const moverParaPrimeiroFuncional = (index) => {
        salvarRequisitos();
        if (index > 0) {
            const novosDados = [...dadosFuncionais];
            const itemMovido = novosDados.splice(index, 1)[0];
            novosDados.unshift(itemMovido);
            setDadosFuncionais(novosDados);
        }
    };

    const moverParaUltimoFuncional = (index) => {
        salvarRequisitos();
        if (index < dadosFuncionais.length - 1) {
            const novosDados = [...dadosFuncionais];
            const itemMovido = novosDados.splice(index, 1)[0];
            novosDados.push(itemMovido);
            setDadosFuncionais(novosDados);
        }
    };

    const removerItemFuncional = (index) => {
        salvarRequisitos();
        const novosDados = [...dadosFuncionais];
        novosDados.splice(index, 1);
        setDadosFuncionais(novosDados);
    };

    const moverParaCimaNaoFuncional = (index) => {
        salvarRequisitos();
        if (index > 0) {
            const novosDados = [...dadosNaoFuncionais];
            [novosDados[index - 1], novosDados[index]] = [novosDados[index], novosDados[index - 1]];
            setDadosNaoFuncionais(novosDados);
        }
    };

    const moverParaBaixoNaoFuncional = (index) => {
        salvarRequisitos();
        if (index < dadosNaoFuncionais.length - 1) {
            const novosDados = [...dadosNaoFuncionais];
            [novosDados[index], novosDados[index + 1]] = [novosDados[index + 1], novosDados[index]];
            setDadosNaoFuncionais(novosDados);
        }
    };

    const moverParaPrimeiroNaoFuncional = (index) => {
        salvarRequisitos();
        if (index > 0) {
            const novosDados = [...dadosNaoFuncionais];
            const itemMovido = novosDados.splice(index, 1)[0];
            novosDados.unshift(itemMovido);
            setDadosNaoFuncionais(novosDados);
        }
    };

    const moverParaUltimoNaoFuncional = (index) => {
        salvarRequisitos();
        if (index < dadosNaoFuncionais.length - 1) {
            const novosDados = [...dadosNaoFuncionais];
            const itemMovido = novosDados.splice(index, 1)[0];
            novosDados.push(itemMovido);
            setDadosNaoFuncionais(novosDados);
        }
    };

    const removerItemNaoFuncional = (index) => {
        salvarRequisitos();
        const novosDados = [...dadosNaoFuncionais];
        novosDados.splice(index, 1);
        setDadosNaoFuncionais(novosDados);
    };

    const handleSubmit = () => {
        fetch('https://exemplo.com/api/requisitos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requisitosFuncionais: dadosFuncionais,
                requisitosNaoFuncionais: dadosNaoFuncionais,
            }),
        })
            .then(response => response.json())
            .then(data => {
                limparCamposFuncionais();
                limparCamposNaoFuncionais();
                setDadosFuncionais([]);
                setDadosNaoFuncionais([]);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    };

    const salvarRequisitos = () => {
        let projeto = JSON.parse(window.localStorage.getItem('projeto')) || {};
        projeto.itensRequisito = { dadosFuncionais, dadosNaoFuncionais };
        localStorage.setItem('projeto', JSON.stringify(projeto));
    };

    const exportarListaComoJson = () => {
        let projeto = JSON.parse(window.localStorage.getItem('projeto'));
        let edicao = JSON.parse(window.localStorage.getItem('edicao'));

        if (edicao) {
            projeto.versao = parseFloat(projeto.versao) + 0.1;
            projeto.versao = projeto.versao.toFixed(1);
        }
        salvarRequisitos();
        const json = JSON.stringify(projeto);
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = projeto.nome + "-V" + projeto.versao + '.json';
        link.click();
    };

    return (
        <div className={styles['area-tabela']}>
            <div className={styles['section-tabela']}>
                <h2>Requisitos Funcionais</h2>
                <div className={styles['area-selecao']}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={tituloFuncional}
                        onChange={(e) => setTituloFuncional(e.target.value)}
                    />
                    {errorFuncional && !tituloFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricaoFuncional}
                        onChange={(e) => setDescricaoFuncional(e.target.value)}
                    />
                    {errorFuncional && !descricaoFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <select
                        value={prioridadeFuncional}
                        onChange={(e) => setPrioridadeFuncional(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        <option value="essencial">Essencial</option>
                        <option value="importante">Importante</option>
                        <option value="desejavel">Desejável</option>
                    </select>
                    {errorFuncional && !prioridadeFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <select
                        value={fronteiraFuncional}
                        onChange={(e) => setFronteiraFuncional(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        <option value="interno">Interno</option>
                        <option value="externo">Externo</option>
                        <option value="eventual">Eventual</option>
                    </select>
                    {errorFuncional && !fronteiraFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <button onClick={adicionarItemFuncional}>Adicionar Item</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Prioridade</th>
                                <th>Fronteira</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosFuncionais.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.titulo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.prioridade}</td>
                                    <td>{item.fronteira}</td>
                                    <td>
                                        <div className={styles['area-acoes']}>
                                            <button onClick={() => moverParaPrimeiroFuncional(index)}>⇧⇧</button>
                                            <button onClick={() => moverParaCimaFuncional(index)}>↑</button>
                                            <button onClick={() => moverParaBaixoFuncional(index)}>↓</button>
                                            <button onClick={() => moverParaUltimoFuncional(index)}>⇩⇩</button>
                                            <button onClick={() => removerItemFuncional(index)}>Remover</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className={styles['section-tabela']}>
                <h2>Requisitos Não Funcionais</h2>
                <div className={styles['area-selecao']}>
                    <select
                        value={tipoNaoFuncional}
                        onChange={(e) => setTipoNaoFuncional(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        <option value="segurança">Segurança</option>
                        <option value="desempenho">Desempenho</option>
                        <option value="usabilidade">Usabilidade</option>
                    </select>
                    {errorNaoFuncional && !tipoNaoFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <input
                        type="text"
                        placeholder="Requisito"
                        value={requisitoNaoFuncional}
                        onChange={(e) => setRequisitoNaoFuncional(e.target.value)}
                    />
                    {errorNaoFuncional && !requisitoNaoFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <select
                        value={prioridadeNaoFuncional}
                        onChange={(e) => setPrioridadeNaoFuncional(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        <option value="essencial">Essencial</option>
                        <option value="importante">Importante</option>
                        <option value="desejavel">Desejável</option>
                    </select>
                    {errorNaoFuncional && !prioridadeNaoFuncional && <span className={styles['erro']}>Campo obrigatório!</span>}
                    <button onClick={adicionarItemNaoFuncional}>Adicionar Item</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Requisito</th>
                                <th>Prioridade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosNaoFuncionais.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.tipo}</td>
                                    <td>{item.requisito}</td>
                                    <td>{item.prioridade}</td>
                                    <td>
                                        <div className={styles['area-acoes']}>
                                            <button onClick={() => moverParaPrimeiroNaoFuncional(index)}>⇧⇧</button>
                                            <button onClick={() => moverParaCimaNaoFuncional(index)}>↑</button>
                                            <button onClick={() => moverParaBaixoNaoFuncional(index)}>↓</button>
                                            <button onClick={() => moverParaUltimoNaoFuncional(index)}>⇩⇩</button>
                                            <button onClick={() => removerItemNaoFuncional(index)}>Remover</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className={styles['area-acoes']}>
                <button onClick={exportarListaComoJson}>Exportar Backup</button>
                {/* <button onClick={handleSubmit}>Enviar Requisitos</button> */}
                <button onClick={() => { salvarRequisitos(); handleNovaContagem(); }}>Ir para Contagem</button>
            </div>
        </div>
    );
};

export default Requisitos;
