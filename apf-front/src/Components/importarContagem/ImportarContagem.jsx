import React, { useState } from 'react';
import styles from './importarContagem.module.css';
import CriarContagem from '../criarContagem/CriarContagem';
import Requisitos from '../requisitos/Requisitos';

export default function ImportarContagem() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [mostrarConteudoOriginal, setMostrarConteudoOriginal] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
    const [arquivoValido, setArquivoValido] = useState(true); // Inicializado como válido

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setArquivoValido(true); // Resetar para verdadeiro ao selecionar novo arquivo
    };

    const handleUpload = () => {
        localStorage.clear();
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    localStorage.setItem('projeto', JSON.stringify(json));
                    localStorage.setItem('edicao', true);
                    console.log('Arquivo salvo no localStorage:', json);

                    // Verifica se o arquivo segue o padrão esperado
                    if (validarArquivo(json)) {
                        setArquivoValido(true);
                        setSelectedFile(null);
                        setMostrarConteudoOriginal(false);
                        setMostrarModal(true);
                    } else {
                        console.error('Arquivo não segue o padrão esperado.');
                        setArquivoValido(false);
                    }
                } catch (error) {
                    console.error('Erro ao ler o arquivo JSON:', error);
                    setArquivoValido(false);
                }
            };
            reader.readAsText(selectedFile);
        }
    };

    const validarArquivo = (json) => {
        // Implemente a lógica para validar se o JSON está no formato esperado
        return (
            json &&
            json.nome &&
            json.responsavel &&
            json.versao &&
            json.itensContagem &&
            Array.isArray(json.itensContagem) &&
            json.contagem
        );
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
        <section className={styles.sectionImportar}>
            {mostrarConteudoOriginal && !mostrarModal && (
                <>
                    <h1>Importar Arquivos de Contagem</h1>
                    <div className={styles.areaUpload}>
                        <h2>Faça o Upload do arquivo de Contagem Desejado:</h2>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload</button>
                        {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
                        {arquivoValido === false && <p style={{ color: 'red' }}>Arquivo inválido ou fora do padrão.</p>}
                    </div>
                </>
            )}

            {!mostrarConteudoOriginal && opcaoSelecionada === 'contagem' && (
                <CriarContagem handleNovosRequisitos={handleNovosRequisitos} />
            )}

            {!mostrarConteudoOriginal && opcaoSelecionada === 'requisitos' && (
                <Requisitos handleNovaContagem={handleNovaContagem} />
            )}

            {mostrarModal && (
                <div className={styles.modal}>
                    <p>O que você gostaria de fazer a seguir?</p>
                    <button onClick={handleNovaContagem}>Modificar Contagem</button>
                    <button onClick={handleNovosRequisitos}>Modificar Requisitos</button>
                </div>
            )}
        </section>
    );
}
