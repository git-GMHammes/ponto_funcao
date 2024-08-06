import React, { useState, useEffect } from 'react';
import styles from './criarContagem.module.css';
import ItensContagem from '../itensContagem/ItensContagem';

export default function CriarContagem({ handleNovosRequisitos }) {
    const [acuraciaContagem, setAcuraciaContagem] = useState('');
    const [templateContagem, setTemplateContagem] = useState('');
    const [acuraciaContagemErro, setAcuraciaContagemErro] = useState('');
    const [templateContagemErro, setTemplateContagemErro] = useState('');
    const [mostrarConteudoOriginal, setMostrarConteudoOriginal] = useState(true);

    useEffect(() => {
        const projeto = JSON.parse(window.localStorage.getItem('projeto'));
        if (projeto?.itensContagem?.length > 0) {
            const { acuraciaContagem, template } = projeto.contagem;
            setAcuraciaContagem(acuraciaContagem);
            setTemplateContagem(template);
            setMostrarConteudoOriginal(false);
        }
    }, []);

    const handleAcuraciaChange = (event) => {
        const valor = event.target.value;
        setAcuraciaContagem(valor);
        if (valor) {
            setAcuraciaContagemErro('');
        }
    };

    const handleTemplateChange = (event) => {
        const valor = event.target.value;
        setTemplateContagem(valor);
        if (valor) {
            setTemplateContagemErro('');
        }
    };

    const handleSelecionar = () => {
        let isValido = true;

        if (!acuraciaContagem) {
            setAcuraciaContagemErro('Por favor, selecione a acurácia.');
            isValido = false;
        } else {
            setAcuraciaContagemErro('');
        }

        if (!templateContagem) {
            setTemplateContagemErro('Por favor, selecione um template de contagem.');
            isValido = false;
        } else {
            setTemplateContagemErro('');
        }

        if (isValido) {
            const contagem = { acuraciaContagem, template: templateContagem };
            let projeto = JSON.parse(window.localStorage.getItem('projeto'));
            projeto.contagem = contagem;
            localStorage.setItem('projeto', JSON.stringify(projeto));
            setMostrarConteudoOriginal(false);
        }
    };

    const antecipacao = [
        { id: 1, name: 'Indicativa' },
        { id: 2, name: 'Estimada' },
        { id: 3, name: 'Detalhada' }
    ];

    const templates = [
        { id: 'sistema_padrao', name: 'Sistema Padrão' },
        { id: 'migracao_dados', name: 'Migração de Dados' },
        { id: 'manutencao_sistema', name: 'Manutenção de Sistema' },
        { id: 'site_headless_crm', name: 'Site Headless CRM' }
    ];

    return (
        <section className={styles.section}>
            {mostrarConteudoOriginal ? (
                <div className={styles.selectionArea}>
                    <h2>Acurácia de Contagem:</h2>
                    <select value={acuraciaContagem} onChange={handleAcuraciaChange}>
                        <option value="">Selecione...</option>
                        {antecipacao.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    {acuraciaContagemErro && <p className={styles.error}>{acuraciaContagemErro}</p>}

                    <h2>Selecione o Template de Contagem:</h2>
                    <select value={templateContagem} onChange={handleTemplateChange}>
                        <option value="">Selecione...</option>
                        {templates.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {templateContagemErro && <p className={styles.error}>{templateContagemErro}</p>}

                    <button onClick={handleSelecionar}>Criar</button>
                </div>
            ) : (
                <ItensContagem handleNovosRequisitos={handleNovosRequisitos} />
            )}
        </section>
    );
}
