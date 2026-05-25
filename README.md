# 🗡️ Sistema LevelUp

O "Sistema LevelUp" é uma aplicação de gamificação em formato de RPG. Atua como uma "agenda" interativa para ajudar a programar o seu dia, transformando tarefas reais em "Quests". Ao cumprir rotinas, ganha XP e evolui atributos, criando motivação para combater a procrastinação.

📋 Índice

- [Funcionalidades](#-Funcionalidades)
- [Tecnologias Utilizadas](#-Tecnologias-Utilizadas)
- [Pré-requisitos e Instalação](#-Pré-requisitos-e-Instalação)
- [Configuração do Ambiente](#-Configuração-do-Ambiente)
- [Como Executar](#-Como-Executar)
- [Arquitetura do Projeto](#-Arquitetura-do-Projeto)
- [Controles](#-Controles)

---

✨ Funcionalidades

🧠 Lógica de progresso isolada — o gerenciador de estado centralizado em `app/index.tsx` controla o nível, a experiência e a distribuição de atributos de forma independente da interface visual
🎨 Interface gráfica holográfica — tema escuro (Dark Mode) inspirado em *Solo Leveling*, com paleta de cores azul-ciano e vermelho neon, barras de progresso elétricas e tipografia futurista
🎯 Painel dinâmico de Quests — permite a submissão e o agendamento de tarefas diárias em tempo real, vinculando dinamicamente cada conclusão ao ganho de status específico
⏳ Cronômetro de Alerta Diário — relógio integrado em tempo real que exibe a contagem regressiva precisa até a meia-noite (fuso horário local), criando um senso de urgência elétrico
🛡️ Detecção de Penalidades (Penalty Zone) — suporte para a inserção de subquests de punição nos cards de missões, agindo como um alerta psicológico de falha
🔄 Navegação fluida por estado — transição instantânea entre o Perfil do Jogador e o Painel de Missões através de gatilhos reativos sem recarregamento de página
🔍 Filtro dinâmico por Atributo — barra deslizante horizontal baseada em botões pílula que isola instantaneamente as missões por Força (STR), Agilidade (AGI), Vitalidade (VIT) ou Inteligência (INT)

---

🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Linguagem** | TypeScript / JavaScript | Base lógica e tipagem estrutural do projeto |
| **Interface Gráfica** | React Native | Renderização nativa de componentes mobile em alta performance |
| **Framework** | Expo | Compilação ágil, gerenciamento de ciclo de vida e loop de testes |
| **Estilização** | StyleSheet (Flexbox) | Posicionamento de elementos e efeitos de sombra neon (*TextShadow*) |
| **Animações** | Animated API | Controle dos efeitos visuais de cintilação (flicker) elétrico |
| **Iconografia** | @expo/vector-icons | Ícones vetoriais em alta resolução (MaterialCommunityIcons e Ionicons) |

---

⚙️ Pré-requisitos e Instalação

Requisitos mínimos:
* Node.js (v18 ou superior)
* npm (gerenciador de pacotes Node)
* Git
* Aplicativo **Expo Go** instalado no seu smartphone (Android/iOS)

Passo a passo

1. Clone o repositório
```bash
git clone [https://github.com/seu-usuario/sistema_levelup.git](https://github.com/seu-usuario/sistema_levelup.git)
cd sistema_levelup
Instale as dependênciasBashnpm install
-> 🔐 Configuração do AmbienteO projeto usa a estrutura nativa do Expo e gerenciamento de estado interno local via React state hooks (useState),
dispensando conexões com serviços externos nesta versão MVP.Assets Visuais: Certifique-se de que a imagem de fundo holográfica esteja posicionada no caminho:assets/fundo-sistema.jpg
Variáveis disponíveis no estado reativo local:VariávelObrigatóriaPadrão (fallback)DescriçãonivelSim50Nível de evolução atual do jogadorxpSim0Pontos de experiência acumulados na sessãoxpParaProximoNivelSim100Teto matemático necessário para subir de nívelNota: Se os estados não forem transmitidos,
o ecossistema usa os fallbacks numéricos padrão. As listas de quests iniciais são injetadas de forma assíncrona na primeira renderização.
▶️ Como ExecutarIniciar o projetoBashnpx "expo start -c"
-> O terminal iniciará o Metro Bundler do Expo, compilará o código JavaScript e gerará um QR Code interativo na tela.Testar no dispositivoAbra o aplicativo Expo Go no seu smartphone e use a câmera para escanear o QR Code exibido no terminal do computador.
O aplicativo carregará a HUD holográfica imediatamente no aparelho físico.🏗️ Arquitetura do ProjetoO projeto adota uma arquitetura modular baseada em componentes (Clean Code),
separando de forma estrita as interfaces visuais da máquina lógica de gerenciamento de dados.Plaintextsistema_levelup/


│
├── app/
│   └── index.tsx          # 🧠 CONTROLADOR — Gerenciador central de estado, motor de XP e roteamento
│
├── componentes/
│   ├── TelaStatus.tsx     # 🎨 INTERFACE — Renderiza o perfil 2x2, cronômetro de alerta e AP
│   └── TelaMissoes.tsx    # 📝 CRUD — Painel de submissão de quests, filtros dinâmicos e subquests
│
├── assets/
│   └── fundo-sistema.jpg  # 🖼️ MÍDIA — Imagem de background em alta resolução para os painéis
│
├── package.json           # Manifesto de dependências e scripts de execução do Expo
└── README.md              # Esta documentação
```
---

Fluxo de dados
```bash
Plaintextapp/index.tsx
  ├─► Passa estados (nivel, xp) ─────► TelaStatus.tsx (Exibe grade 2x2 e cronômetro)
  └─► Passa funções (completarMissao) ─► TelaMissoes.tsx (Executa criação e validação)
```
---
