import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TelaMissoes from '../componentes/TelaMissoes';
import TelaStatus from '../componentes/TelaStatus';

export default function App() {
  const [nivel, setNivel] = useState(1);
  const [xp, setXp] = useState(200);
  const [telaAtual, setTelaAtual] = useState('status');

  const [str, setStr] = useState(19);
  const [agi, setAgi] = useState(18);
  const [per, setPer] = useState(21);
  const [vit, setVit] = useState(10);
  const [int, setInt] = useState(10);

  // Note que agora as missões iniciais têm uma "subquest"
  const [missoes, setMissoes] = useState([
    { id: 1, titulo: '100 Flexões Diárias', subquest: 'Ficar sem Celular por 2horas', xpRecompensa: 25, atributo: 'STR', completada: false },
    { id: 2, titulo: '10km de Corrida', subquest: 'Ter que Limpar todo o seu quarto', xpRecompensa: 50, atributo: 'AGI', completada: false },
  ]);

  const xpParaProximoNivel = nivel * 100;

  // Atualizado: Agora recebe a subquestDigitada
  const adicionarMissao = (tituloDigitado, atributoEscolhido, subquestDigitada) => {
    const novaMissao = {
      id: Date.now(),
      titulo: tituloDigitado,
      subquest: subquestDigitada, // Salva a punição
      xpRecompensa: 25,
      atributo: atributoEscolhido,
      completada: false
    };
    setMissoes([...missoes, novaMissao]);
  };

  const completarMissao = (idMissao, xpRecompensa, atributo) => {
    const novasMissoes = missoes.map(missao => {
      if (missao.id === idMissao) return { ...missao, completada: true };
      return missao;
    });
    setMissoes(novasMissoes);

    let novoXp = xp + xpRecompensa;
    if (novoXp >= xpParaProximoNivel) {
      setNivel(nivel + 1);
      setXp(novoXp - xpParaProximoNivel);
    } else {
      setXp(novoXp);
    }

    if(atributo === 'STR') setStr(str + 1);
    if(atributo === 'AGI') setAgi(agi + 1);
    if(atributo === 'PER') setPer(per + 1);
    if(atributo === 'VIT') setVit(vit + 1);
    if(atributo === 'INT') setInt(int + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {telaAtual === 'status' ? (
        <TelaStatus 
          nivel={nivel} xp={xp} xpParaProximoNivel={xpParaProximoNivel} setTelaAtual={setTelaAtual} 
          str={str} agi={agi} per={per} vit={vit} int={int} 
        />
      ) : (
        <TelaMissoes 
          missoes={missoes} completarMissao={completarMissao} 
          adicionarMissao={adicionarMissao} setTelaAtual={setTelaAtual} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
});