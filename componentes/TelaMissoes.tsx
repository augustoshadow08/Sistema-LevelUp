import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TelaMissoes({ missoes, completarMissao, adicionarMissao, setTelaAtual }) {
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaSubquest, setNovaSubquest] = useState(''); // Estado para guardar a punição
  const [attrSelecionado, setAttrSelecionado] = useState('STR');
  const [filtroAtual, setFiltroAtual] = useState('TODOS');

  const handleSubmissao = () => {
    if (novoTitulo.trim() === '') return;
    adicionarMissao(novoTitulo, attrSelecionado, novaSubquest);
    setNovoTitulo('');
    setNovaSubquest('');
  };

  const missoesFiltradas = missoes.filter(missao => {
    if (filtroAtual === 'TODOS') return true;
    return missao.atributo === filtroAtual;
  });

  const AttrButton = ({ nome }) => {
    const isAtivo = attrSelecionado === nome;
    return (
      <TouchableOpacity style={[styles.attrBtn, isAtivo && styles.attrBtnActive]} onPress={() => setAttrSelecionado(nome)}>
        <Text style={[styles.attrBtnText, isAtivo && styles.attrBtnTextActive]}>{nome}</Text>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ nome }) => {
    const isAtivo = filtroAtual === nome;
    return (
      <TouchableOpacity style={[styles.filterBtn, isAtivo && styles.filterBtnActive]} onPress={() => setFiltroAtual(nome)}>
        <Text style={[styles.filterBtnText, isAtivo && styles.filterBtnTextActive]}>{nome}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Ajustado para a mesma imagem de fundo holográfica usada na Tela de Status */}
      <ImageBackground source={require('../assets/images/fundoGold.jpg')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay}>
          
          <Text style={styles.mainTitle}>SISTEMA DE QUESTS</Text>

          {/* === ÁREA DE SUBMISSÃO === */}
          <View style={styles.creationBox}>
            <TextInput
              style={styles.input}
              placeholder="Descreva a Missão Diária..."
              placeholderTextColor="#777"
              value={novoTitulo}
              onChangeText={setNovoTitulo}
            />
            
            <TextInput
              style={[styles.input, styles.inputPenalty]}
              placeholder="Penalty Quest (Caso falhe)..."
              placeholderTextColor="#8B0000"
              value={novaSubquest}
              onChangeText={setNovaSubquest}
            />

            <View style={styles.attrRow}>
              {/* Opções limitadas para manter a simetria com a Tela de Status */}
              <AttrButton nome="STR" />
              <AttrButton nome="AGI" />
              <AttrButton nome="VIT" />
              <AttrButton nome="INT" />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmissao} activeOpacity={0.8}>
              <Text style={styles.submitButtonText}>SUBMETER NOVA QUEST</Text>
            </TouchableOpacity>
          </View>

          {/* === ÁREA DE FILTROS === */}
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
              <FilterButton nome="TODOS" />
              <FilterButton nome="STR" />
              <FilterButton nome="AGI" />
              <FilterButton nome="VIT" />
              <FilterButton nome="INT" />
            </ScrollView>
          </View>

          {/* === LISTA DE MISSÕES === */}
          <ScrollView style={styles.missionsContainer}>
            
            {missoesFiltradas.length === 0 && (
              <Text style={styles.emptyText}>Nenhuma quest encontrada para esse filtro.</Text>
            )}

            {missoesFiltradas.map((missao) => (
              <View key={missao.id} style={styles.missionCard}>
                
                <View style={styles.missionInfo}>
                  <Text style={[styles.missionTitle, missao.completada && styles.missionCompletedText]}>
                    {missao.titulo}
                  </Text>

                  {missao.subquest && !missao.completada ? (
                    <Text style={styles.penaltyText}>⚠️ Punição: {missao.subquest}</Text>
                  ) : null}

                  <Text style={styles.missionReward}>
                    Recompensa: +{missao.xpRecompensa} XP | +1 {missao.atributo}
                  </Text>
                </View>

                {!missao.completada ? (
                  <TouchableOpacity 
                    style={styles.completeButton} 
                    onPress={() => completarMissao(missao.id, missao.xpRecompensa, missao.atributo)}
                  >
                    <Text style={styles.completeButtonText}>VALIDAR</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedBadgeText}>OK</Text>
                  </View>
                )}
                
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.backButton} onPress={() => setTelaAtual('status')}>
            <Text style={styles.backButtonText}>[ VOLTAR AO STATUS ]</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 5, 15, 0.85)', padding: 20 },
  
  mainTitle: { color: '#00E5FF', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 30, letterSpacing: 2 },
  
  creationBox: { backgroundColor: 'rgba(10, 10, 10, 0.9)', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#00E5FF', marginBottom: 15, shadowColor: '#00E5FF', shadowRadius: 5, elevation: 3 },
  input: { backgroundColor: '#000', color: '#FFF', padding: 12, borderRadius: 4, borderWidth: 1, borderColor: '#333', marginBottom: 10, fontSize: 16 },
  
  inputPenalty: { borderColor: '#8B0000', backgroundColor: 'rgba(139, 0, 0, 0.05)', marginBottom: 15 },

  attrRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  attrBtn: { flex: 1, marginHorizontal: 2, paddingVertical: 8, borderWidth: 1, borderColor: '#444', borderRadius: 4, alignItems: 'center' },
  attrBtnActive: { borderColor: '#00E5FF', backgroundColor: 'rgba(0, 229, 255, 0.1)' },
  attrBtnText: { color: '#777', fontSize: 12, fontWeight: 'bold' },
  attrBtnTextActive: { color: '#00E5FF' },
  submitButton: { backgroundColor: 'rgba(65, 105, 225, 0.8)', padding: 15, borderRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#4169E1' },
  submitButtonText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1 },

  filterContainer: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 10 },
  filterScroll: { gap: 10, paddingHorizontal: 5 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#111', borderWidth: 1, borderColor: '#333' },
  filterBtnActive: { backgroundColor: '#00E5FF', borderColor: '#00E5FF' },
  filterBtnText: { color: '#777', fontSize: 12, fontWeight: 'bold' },
  filterBtnTextActive: { color: '#000', fontWeight: 'bold' },

  missionsContainer: { flex: 1 },
  emptyText: { color: '#777', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  missionCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.9)', borderColor: '#4169E1', borderWidth: 1, padding: 15, borderRadius: 8, marginBottom: 12 },
  missionInfo: { flex: 1 },
  missionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  
  penaltyText: { color: '#FF4500', fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 6 },
  
  missionCompletedText: { color: '#555', textDecorationLine: 'line-through' },
  missionReward: { color: '#32CD32', fontSize: 13, fontWeight: 'bold' },
  
  completeButton: { backgroundColor: '#4169E1', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 4, marginLeft: 10 },
  completeButtonText: { color: '#FFF', fontWeight: 'bold' },
  completedBadge: { borderColor: '#32CD32', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 4, marginLeft: 10 },
  completedBadgeText: { color: '#32CD32', fontWeight: 'bold' },

  backButton: { padding: 20, alignItems: 'center' },
  backButtonText: { color: '#A9A9A9', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
});