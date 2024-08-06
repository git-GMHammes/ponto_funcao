import React, { useState, useEffect } from 'react';
import styles from './itensContagem.module.css';
import jsPDF from 'jspdf';
import dadosJson from './conversao.json';

const ItensContagem = ({ handleNovosRequisitos }) => {
    const [dados, setDados] = useState([]);
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipoContagem, setTipoContagem] = useState(JSON.parse(window.localStorage.getItem('projeto')).contagem.acuraciaContagem);
    const [template, setTemplate] = useState(JSON.parse(window.localStorage.getItem('projeto')).contagem.template);
    const [itensBloqueados, setItensBloqueados] = useState([]);
    const [camposFaltando, setCamposFaltando] = useState(false);

    const dificuldades = ['Baixa', 'Média', 'Alta'];

    useEffect(() => {
        const carregarDadosDoEndpoint = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/template/${template}`);
                if (!response.ok) {
                    throw new Error('Falha ao carregar dados do endpoint');
                }
                const dadosDoEndpoint = await response.json();
                const funcoesTransicionais = dadosDoEndpoint.funcoes_transacionais;
                const dadosFormatados = funcoesTransicionais.map((funcao) => ({
                    tipo: funcao.funcao_transacional,
                    dificuldade: funcao.complexidade,
                    descricao: funcao.nome,
                    bloqueado: true,
                }));
                setDados(dadosFormatados);

                setItensBloqueados(dadosFormatados.map((_, index) => index));
            } catch (error) {
                console.error('Erro ao carregar dados do endpoint:', error);
            }
        };

        let projeto = JSON.parse(window.localStorage.getItem('projeto'));
        if (projeto.itensContagem.length === 0) {
            carregarDadosDoEndpoint();
        } else {
            setDados(projeto.itensContagem);
        }
    }, [template]);

    const salvarContagem = () => {
        let projeto = JSON.parse(window.localStorage.getItem('projeto'));
        projeto.itensContagem = dados;
        localStorage.setItem('projeto', JSON.stringify(projeto));
    };

    const todosCamposPreenchidos = () => {
        return !dados.some(item => !item.tipo || !item.descricao);
    };

    const adicionarItem = () => {
        const novoItem = {
            tipo,
            dificuldade: dadosJson[tipoContagem]?.complexidade ? 'Baixa' : 'default',
            descricao,
            bloqueado: false,
        };

        setDados([novoItem, ...dados]);
        setTipo('');
        setDescricao('');
        setCamposFaltando(false);
    };

    const moverParaCima = (index) => {
        if (todosCamposPreenchidos()) {
            if (index > 0) {
                const novosDados = [...dados];
                [novosDados[index - 1], novosDados[index]] = [novosDados[index], novosDados[index - 1]];
                setDados(novosDados);
                salvarContagem();
            }
        } else {
            setCamposFaltando(true);
        }
    };

    const moverParaBaixo = (index) => {
        if (todosCamposPreenchidos()) {
            if (index < dados.length - 1) {
                const novosDados = [...dados];
                [novosDados[index], novosDados[index + 1]] = [novosDados[index + 1], novosDados[index]];
                setDados(novosDados);
                salvarContagem();
            }
        } else {
            setCamposFaltando(true);
        }
    };

    const removerItem = (index) => {
        const novosDados = dados.filter((_, i) => i !== index);
        setDados(novosDados);
        salvarContagem();
    };

    const moverParaPrimeiro = (index) => {
        if (todosCamposPreenchidos()) {
            if (index > 0) {
                const novosDados = [...dados];
                const itemMovido = novosDados.splice(index, 1)[0];
                novosDados.unshift(itemMovido);
                setDados(novosDados);
                salvarContagem();
            }
        } else {
            setCamposFaltando(true);
        }
    };

    const moverParaUltimo = (index) => {
        if (todosCamposPreenchidos()) {
            if (index < dados.length - 1) {
                const novosDados = [...dados];
                const itemMovido = novosDados.splice(index, 1)[0];
                novosDados.push(itemMovido);
                setDados(novosDados);
                salvarContagem();
            }
        } else {
            setCamposFaltando(true);
        }
    };

    const exportarListaComoJson = () => {
        if (todosCamposPreenchidos()) {
            
            let projeto = JSON.parse(window.localStorage.getItem('projeto'));
            let edicao = JSON.parse(window.localStorage.getItem('edicao'));
            
            if (edicao) {
                projeto.versao = parseFloat(projeto.versao) + 0.1;
                console.log(projeto.versao);
                projeto.versao = projeto.versao.toFixed(1);
            }
            salvarContagem();

            const json = JSON.stringify(projeto);
            const blob = new Blob([json], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = projeto.nome + "-V" + projeto.versao + '.json';
            link.click();
            setCamposFaltando(false);
        } else {
            setCamposFaltando(true);
        }
    };

    const exportarListaComoPdf = () => {
        if (todosCamposPreenchidos()) {
            salvarContagem();

            const doc = new jsPDF();
            let y = 10;
            dados.forEach((item) => {
                doc.text(`Tipo: ${item.tipo}`, 40, y);
                doc.text(`Complexidade: ${item.dificuldade}`, 100, y);
                doc.text(`Descrição: ${item.descricao}`, 150, y);
                y += 10;
            });

            doc.save('dados.pdf');
            setCamposFaltando(false);
        } else {
            setCamposFaltando(true);
        }
    };

    const handleTipoChange = (index, selectedValue) => {
        const novosDados = dados.map((d, i) => {
            if (i === index) {
                return { ...d, tipo: selectedValue };
            }
            return d;
        });
        setDados(novosDados);
        salvarContagem();
        setCamposFaltando(false);
    };

    const handleDescricaoChange = (index, newValue) => {
        const novosDados = dados.map((d, i) => {
            if (i === index) {
                return { ...d, descricao: newValue };
            }
            return d;
        });
        setDados(novosDados);
        salvarContagem();
        setCamposFaltando(false);
    };

    return (
        <section className={styles.sectionTabela}>
            <div className={styles.areaTabela}>
                <h2>Itens Contagem</h2>
                <button className={styles.button} onClick={adicionarItem}>Adicionar Item</button>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Complexidade</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.bloqueado ? (
                                        <span>{item.tipo}</span>
                                    ) : (
                                        <select
                                            value={item.tipo}
                                            onChange={(e) => handleTipoChange(index, e.target.value)}
                                            className={styles.select}
                                        >
                                            <option value="">Selecione...</option>
                                            {dadosJson[tipoContagem]?.conversoes.map((opcao, idx) => (
                                                <option key={idx} value={opcao}>
                                                    {opcao}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </td>
                                <td>
                                    {item.bloqueado ? (
                                        <span>{item.dificuldade}</span>
                                    ) : (
                                        <select
                                            value={item.dificuldade}
                                            onChange={(e) => handleDescricaoChange(index, e.target.value)}
                                            disabled={!dadosJson[tipoContagem]?.complexidade}
                                            className={styles.select}
                                        >
                                            {dadosJson[tipoContagem]?.complexidade ? (
                                                <>
                                                    <option value="">Selecione...</option>
                                                    {dificuldades.map((dificuldade, idx) => (
                                                        <option key={idx} value={dificuldade}>
                                                            {dificuldade}
                                                        </option>
                                                    ))}
                                                </>
                                            ) : (
                                                <option value="default">{dadosJson[tipoContagem].defaultComplexidade}</option>
                                            )}
                                        </select>
                                    )}
                                </td>
                                <td>
                                    {item.bloqueado ? (
                                        <span>{item.descricao}</span>
                                    ) : (
                                        <input
                                            type="text"
                                            value={item.descricao}
                                            onChange={(e) => handleDescricaoChange(index, e.target.value)}
                                            className={styles.input}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => moverParaPrimeiro(index)}>⇧⇧</button>
                                    <button onClick={() => moverParaCima(index)}>↑</button>
                                    <button onClick={() => moverParaBaixo(index)}>↓</button>
                                    <button onClick={() => moverParaUltimo(index)}>⇩⇩</button>
                                    <button onClick={() => removerItem(index)}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {camposFaltando && <p style={{ color: 'red' }}>Por favor, preencha todos os campos antes de exeutar qualquer ação.</p>}

                <div className={styles.areaAcoes}>

                    <button className={styles.button} onClick={exportarListaComoJson}>Exportar Backup</button>
                    {/* <button className={styles.button} onClick={exportarListaComoPdf}>Exportar PDF</button> */}
                    <button className={styles.button} onClick={() => {
                        if (todosCamposPreenchidos()) {
                            salvarContagem();
                            handleNovosRequisitos();
                            setCamposFaltando(false);
                        } else {
                            setCamposFaltando(true);
                        }
                    }}>Ir para requisitos</button>
                </div>
            </div>
        </section>
    );
};

export default ItensContagem;
