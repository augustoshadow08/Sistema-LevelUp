import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TelaStatus({ nivel = 50, xp = 0, xpParaProximoNivel = 100, setTelaAtual }) {
  
  const [job, setJob] = useState('NONE');
  const [title, setTitle] = useState('NONE');
  const [editandoJob, setEditandoJob] = useState(false);
  const [editandoTitulo, setEditandoTitulo] = useState(false);

  // Matemática para a Barra de XP
  const porcentagemXP = Math.min(100, Math.max(0, (xp / xpParaProximoNivel) * 100));

  // --- MOTOR DO CRONÔMETRO DIÁRIO ---
  const [tempoRestante, setTempoRestante] = useState('00:00:00');

  useEffect(() => {
    const calcularTempo = () => {
      const agora = new Date();
      const meiaNoite = new Date();
      meiaNoite.setHours(24, 0, 0, 0);

      const diferenca = meiaNoite.getTime() - agora.getTime();

      const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const minutos = Math.floor((diferenca / 1000 / 60) % 60).toString().padStart(2, '0');
      const segundos = Math.floor((diferenca / 1000) % 60).toString().padStart(2, '0');

      setTempoRestante(`${horas}:${minutos}:${segundos}`);
    };

    calcularTempo(); 
    const intervalo = setInterval(calcularTempo, 1000); 

    return () => clearInterval(intervalo); 
  }, []);

  const CronometroNeon = ({ tempo }) => {
    const luzNeon = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      let timeoutId;
      const piscarAlerta = () => {
        const tempoAleatorio = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000); 
        timeoutId = setTimeout(() => {
          Animated.sequence([
            Animated.timing(luzNeon, { toValue: 0.2, duration: 40, useNativeDriver: true }),
            Animated.timing(luzNeon, { toValue: 1, duration: 40, useNativeDriver: true }),
            Animated.timing(luzNeon, { toValue: 0.5, duration: 40, useNativeDriver: true }),
            Animated.timing(luzNeon, { toValue: 1, duration: 40, useNativeDriver: true })
          ]).start(() => piscarAlerta());
        }, tempoAleatorio);
      };
      piscarAlerta();
      return () => clearTimeout(timeoutId);
    }, [luzNeon]);

    return (
      <View style={styles.cronometroContainer}>
        <Animated.View style={{ opacity: luzNeon }}>
          <MaterialCommunityIcons name="clock-alert-outline" size={24} color="#FF3333" style={styles.redGlow} />
        </Animated.View>
        <Text style={styles.cronometroLabel}>DAILY QUEST DEADLINE:</Text>
        <Animated.Text style={[styles.cronometroValue, { opacity: luzNeon }]}>
          {tempo}
        </Animated.Text>
      </View>
    );
  };

  const AtributoNeon = ({ icone, label, valor, familia = "MaterialCommunityIcons" }) => {
    const IconComponent = familia === "Ionicons" ? Ionicons : MaterialCommunityIcons;
    const luzNeon = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      let timeoutId;
      const piscarHolograma = () => {
        const tempoAleatorio = Math.floor(Math.random() * (4000 - 2000 + 1) + 2000);
        timeoutId = setTimeout(() => {
          Animated.sequence([
            Animated.timing(luzNeon, { toValue: 0.3, duration: 50, useNativeDriver: true }),
            Animated.timing(luzNeon, { toValue: 1, duration: 50, useNativeDriver: true }),
            Animated.timing(luzNeon, { toValue: 0.6, duration: 50, useNativeDriver: true }),
            Animated.timing(luzNeon, { toValue: 1, duration: 50, useNativeDriver: true })
          ]).start(() => piscarHolograma());
        }, tempoAleatorio);
      };
      piscarHolograma();
      return () => clearTimeout(timeoutId);
    }, [luzNeon]);

    return (
      <View style={styles.attributeItem}>
        <Animated.View style={{ opacity: luzNeon }}>
          <IconComponent name={icone} size={22} color="#00E5FF" style={styles.iconGlow} />
        </Animated.View>
        <Text style={styles.attrLabel}>{label}:</Text>
        <Animated.Text style={[styles.attrValue, { opacity: luzNeon }]}>
          {valor}
        </Animated.Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/images/fundoGold.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.overlay}>
          <View style={styles.hologramBox}>
            
            <CronometroNeon tempo={tempoRestante} />

            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>STATUS</Text>
            </View>

            <View style={styles.levelSection}>
              <View style={styles.levelLeft}>
                <Text style={styles.levelNumber}>{nivel}</Text>
                <Text style={styles.levelLabel}>LEVEL</Text>
              </View>
              
              <View style={styles.levelRight}>
                <TouchableOpacity style={styles.jobRow} onPress={() => setEditandoJob(true)} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="pencil-outline" size={14} color="#00E5FF" style={styles.iconMargin} />
                  <Text style={styles.jobLabel}>JOB: </Text>
                  {editandoJob ? (
                    <TextInput
                      style={styles.jobInput}
                      value={job}
                      onChangeText={setJob}
                      onBlur={() => setEditandoJob(false)}
                      onSubmitEditing={() => setEditandoJob(false)}
                      autoFocus
                      multiline={true}
                    />
                  ) : (
                    <Text style={styles.textWhiteDinamic}>{job || 'NONE'}</Text>
                  )}
                </TouchableOpacity>

                {editandoTitulo ? (
                  <Text style={styles.alertaVermelho}>⚠️ Digite o seu cargo ⚠️</Text>
                ) : null}

                <TouchableOpacity style={styles.jobRow} onPress={() => setEditandoTitulo(true)} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="pencil-outline" size={14} color="#00E5FF" style={styles.iconMargin} />
                  <Text style={styles.jobLabel}>TITLE: </Text>
                  {editandoTitulo ? (
                    <TextInput
                      style={styles.jobInput}
                      value={title}
                      onChangeText={setTitle}
                      onBlur={() => setEditandoTitulo(false)}
                      onSubmitEditing={() => setEditandoTitulo(false)}
                      autoFocus
                      multiline={true}
                    />
                  ) : (
                    <Text style={styles.textWhiteDinamic}>{title || 'NONE'}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.xpContainer}>
              <View style={styles.xpHeader}>
                <Text style={styles.xpLabel}>EXPERIENCE</Text>
                <Text style={styles.xpValue}>{xp} / {xpParaProximoNivel}</Text>
              </View>
              <View style={styles.xpBarBg}>
                <View style={[styles.xpBarFill, { width: `${porcentagemXP}%` }]} />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.barsSection}>
              <View style={styles.barItem}>
                <Ionicons name="add" size={20} color="#FFF" />
                <View style={styles.barWrapper}>
                  <Text style={styles.barLabel}>HP</Text>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: '100%' }]} />
                  </View>
                </View>
                <Text style={styles.barValue}>2608 / 2608</Text>
              </View>

              <View style={styles.barItem}>
                <MaterialCommunityIcons name="bottle-tonic" size={20} color="#FFF" />
                <View style={styles.barWrapper}>
                  <Text style={styles.barLabel}>MP</Text>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: '100%' }]} />
                  </View>
                </View>
                <Text style={styles.barValue}>364 / 364</Text>
              </View>

              <View style={styles.fatigueItem}>
                <MaterialCommunityIcons name="loading" size={20} color="#00E5FF" />
                <Text style={styles.fatigueText}>FATIGUE: <Text style={styles.textWhite}>0</Text></Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* === NOVA GRADE ORGANIZADA DE ATRIBUTOS (2x2) === */}
            <View style={styles.attributesGrid}>
              
              {/* Linha 1: Força (Esq) e Vitalidade (Dir) */}
              <View style={styles.attrRowLayout}>
                <View style={styles.attrCell}>
                  <AtributoNeon icone="weight-lifter" label="STR" valor="5" />
                </View>
                <View style={styles.attrCell}>
                  <AtributoNeon icone="heart-sharp" label="VIT" valor="15" familia="Ionicons" />
                </View>
              </View>

              {/* Linha 2: Agilidade (Esq) e Inteligência (Dir) */}
              <View style={styles.attrRowLayout}>
                <View style={styles.attrCell}>
                  <AtributoNeon icone="shoe-print" label="AGI" valor="5" />
                </View>
                <View style={styles.attrCell}>
                  <AtributoNeon icone="brain" label="INT" valor="2" />
                </View>
              </View>

              {/* Pontos Disponíveis logo abaixo da grade */}
              <View style={styles.abilityPointsContainer}>
                <Text style={styles.apLabel}>Available{"\n"}Ability{"\n"}Points:</Text>
                <Text style={styles.apValue}>0</Text>
              </View>

            </View>

            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => setTelaAtual && setTelaAtual('missoes')}
              activeOpacity={0.8}
            >
              <Text style={styles.navButtonText}>[ ACESSAR PAINEL DE MISSÕES ]</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

// === ESTILIZAÇÃO CSS ===
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flexGrow: 1, backgroundColor: 'rgba(0, 5, 20, 0.7)', padding: 15, justifyContent: 'center' },
  
  hologramBox: { backgroundColor: 'rgba(0, 20, 40, 0.4)', borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)', padding: 20, paddingTop: 10, borderRadius: 2, shadowColor: '#00E5FF', shadowOpacity: 0.2, shadowRadius: 15, elevation: 5 },
  
  cronometroContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 0, 0, 0.05)', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(255, 51, 51, 0.4)', marginBottom: 20, gap: 10 },
  cronometroLabel: { color: '#FF3333', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  cronometroValue: { color: '#FFF', fontSize: 22, fontWeight: 'bold', letterSpacing: 3, textShadowColor: '#FF0000', textShadowRadius: 10 },
  redGlow: { textShadowColor: '#FF0000', textShadowRadius: 12 },

  titleContainer: { alignItems: 'center', marginBottom: 20 },
  mainTitle: { color: '#00E5FF', fontSize: 22, fontWeight: '300', letterSpacing: 4, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)', paddingHorizontal: 40, paddingVertical: 5 },

  levelSection: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 30, marginBottom: 15 },
  levelLeft: { alignItems: 'center', marginTop: 10 },
  levelNumber: { color: '#FFF', fontSize: 50, fontWeight: 'bold', textShadowColor: 'rgba(255,255,255,0.5)', textShadowRadius: 10 },
  levelLabel: { color: '#00E5FF', fontSize: 12, letterSpacing: 2 },
  
  levelRight: { gap: 8, flex: 1 },
  jobRow: { flexDirection: 'row', alignItems: 'flex-start' },
  iconMargin: { marginRight: 5, marginTop: 2 },
  jobLabel: { color: '#00E5FF', fontSize: 14, letterSpacing: 1 },
  jobInput: { flex: 1, color: '#FFF', fontSize: 11, borderBottomWidth: 1, borderColor: '#00E5FF', padding: 0, margin: 0, lineHeight: 16 },
  textWhiteDinamic: { flex: 1, color: '#FFF', fontSize: 11, lineHeight: 16 },
  
  alertaVermelho: { color: '#FF0000', fontSize: 10, fontWeight: 'bold', marginBottom: -5, marginLeft: 20, textShadowColor: '#FF0000', textShadowRadius: 5 },
  textWhite: { color: '#FFF' },

  xpContainer: { marginTop: 5, marginBottom: 5, paddingHorizontal: 5 },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  xpLabel: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  xpValue: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  xpBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', borderWidth: 0.5, borderColor: 'rgba(0,229,255,0.3)' },
  xpBarFill: { height: '100%', backgroundColor: '#00E5FF', shadowColor: '#00E5FF', shadowRadius: 5, elevation: 5 },

  divider: { height: 1, backgroundColor: 'rgba(0, 229, 255, 0.3)', marginVertical: 20 },
  barsSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  barItem: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 5 },
  barWrapper: { flex: 1, marginHorizontal: 5 },
  barLabel: { color: '#FFF', fontSize: 10, fontWeight: 'bold', marginBottom: 2 },
  barBackground: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 },
  barFill: { height: '100%', backgroundColor: '#FFF', borderRadius: 2, shadowColor: '#FFF', shadowRadius: 5 },
  barValue: { color: '#FFF', fontSize: 8, alignSelf: 'flex-end', marginTop: 12 },
  fatigueItem: { alignItems: 'center', marginLeft: 15 },
  fatigueText: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold', marginTop: 4 },

  // Estilos da Nova Grade (Grid)
  attributesGrid: { paddingHorizontal: 10, gap: 20 },
  attrRowLayout: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  attrCell: { flex: 1 }, 
  
  attributeItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconGlow: { textShadowColor: '#00E5FF', textShadowRadius: 10 },
  attrLabel: { color: '#FFF', fontSize: 18, fontWeight: '300', letterSpacing: 1, width: 45 },
  attrValue: { color: '#FFF', fontSize: 22, fontWeight: 'bold', textShadowColor: '#00E5FF', textShadowRadius: 8 },
  
  abilityPointsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 15, borderTopWidth: 1, borderTopColor: 'rgba(0,229,255,0.1)', paddingTop: 10 },
  apLabel: { color: '#00E5FF', fontSize: 8, textAlign: 'right', marginRight: 10, opacity: 0.8 },
  apValue: { color: '#FFF', fontSize: 32, fontWeight: 'bold', textShadowColor: 'rgba(255,255,255,0.5)', textShadowRadius: 10 },

  navButton: { marginTop: 35, paddingVertical: 15, borderWidth: 1, borderColor: '#00E5FF', backgroundColor: 'rgba(0, 229, 255, 0.05)', alignItems: 'center', borderRadius: 4, shadowColor: '#00E5FF', shadowOpacity: 0.6, shadowRadius: 10, elevation: 4 },
  navButtonText: { color: '#00E5FF', fontWeight: 'bold', letterSpacing: 2, fontSize: 14, textShadowColor: '#00E5FF', textShadowRadius: 5 }
});