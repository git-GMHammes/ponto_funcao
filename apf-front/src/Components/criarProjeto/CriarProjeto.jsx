import React, { useState } from 'react';
import styles from './criarProjeto.module.css';
import CriarContagem from '../criarContagem/CriarContagem';
import CriarRequisitos from '../requisitos/Requisitos';

export default function CriarProjeto() {
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [responsavelProjeto, setResponsavelProjeto] = useState('');
    const [nomeErro, setNomeErro] = useState('');
    const [responsavelErro, setResponsavelErro] = useState('');
    const [mostrarConteudoOriginal, setMostrarConteudoOriginal] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

    const handleNomeChange = (event) => {
        const valor = event.target.value;
        setNomeProjeto(valor);
        if (valor) setNomeErro('');
    };

    const handleResponsavelChange = (event) => {
        const valor = event.target.value;
        setResponsavelProjeto(valor);
        if (valor) setResponsavelErro('');
    };

    const handleCriarProjeto = () => {
        if (!nomeProjeto) {
            setNomeErro('Digite um nome para o projeto.');
            return;
        }
        if (!responsavelProjeto) {
            setResponsavelErro('Digite o nome do responsável pelo projeto.');
            return;
        }

        const projeto = {
            nome: nomeProjeto,
            responsavel: responsavelProjeto,
            versao: "1.0",
            itensContagem: [],
            itensRequisito: { requisitosFuncionais: [], requisitosNaoFuncionais: [] }
        };
        localStorage.clear();
        localStorage.setItem('projeto', JSON.stringify(projeto));
        setMostrarConteudoOriginal(false);
        setMostrarModal(true);
    };

    const handleNovaContagem = () => {
        setOpcaoSelecionada('contagem');
        setMostrarModal(false);
    };

    const handleNovosRequisitos = () => {
        setOpcaoSelecionada('requisitos');
        setMostrarModal(false);
    };

    return (
        <section className={styles.section}>
            {mostrarConteudoOriginal && !mostrarModal && (
                <>
                    <h1>Novo Projeto</h1>
                    <div className={styles.formArea}>
                        <h2>Nome do Projeto:</h2>
                        <input type='text' value={nomeProjeto} onChange={handleNomeChange} />
                        {nomeErro && <p className={styles.error}>{nomeErro}</p>}

                        <h2>Responsável pelo Projeto:</h2>
                        <input type='text' value={responsavelProjeto} onChange={handleResponsavelChange} />
                        {responsavelErro && <p className={styles.error}>{responsavelErro}</p>}

                        <button onClick={handleCriarProjeto}>Criar</button>
                    </div>
                </>
            )}

            {!mostrarConteudoOriginal && opcaoSelecionada === 'contagem' && (
                <CriarContagem handleNovosRequisitos={handleNovosRequisitos} />
            )}

            {!mostrarConteudoOriginal && opcaoSelecionada === 'requisitos' && (
                <CriarRequisitos handleNovaContagem={handleNovaContagem} />
            )}

            {mostrarModal && (
                <div className={styles.modal}>
                    <p>O que você gostaria de fazer a seguir?</p>
                    <button onClick={handleNovaContagem}>Criar Nova Contagem</button>
                    <button onClick={handleNovosRequisitos}>Adicionar Novos Requisitos</button>
                </div>
            )}
        </section>
    );
}
