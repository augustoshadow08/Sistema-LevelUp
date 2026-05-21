# 🗡️ Sistema LevelUp - Gamificação de Rotinas

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-MVP_Concluído-success)

O **Sistema LevelUp** é um motor de gamificação focado em transformar a disciplina e o autodesenvolvimento do utilizador numa progressão imersiva de RPG. Inspirado no popular manhwa *"Solo Leveling"*, a aplicação converte rotinas diárias em missões reais, recompensando o esforço físico e mental com experiência (XP), evolução de atributos e subida de nível do jogador.

## ✨ Funcionalidades (MVP)

* **Motor de Status (Player Profile):** Gestão dinâmica de Nível, XP e Barras de HP/MP, com uma interface holográfica em *Dark Mode* e destaques em azul néon.
* **Sistema de Quests Diárias:** Adição e conclusão de missões associadas a ganhos de atributos específicos (Força, Agilidade, Vitalidade e Inteligência).
* **Penalty Zone (Missões de Punição):** Registo de "subquests" de alerta para o caso de o utilizador falhar a missão principal.
* **Cronómetro de Alerta Diário:** Contagem decrescente com efeito néon vermelho sincronizada com a meia-noite (fuso horário local), marcando o prazo limite das missões.
* **Reatividade e Animações Visuais:** Efeitos visuais de cintilação (Flicker) gerados de forma aleatória, simulando as falhas elétricas de um ecrã holográfico.

## 🛠️ Tecnologias Utilizadas

* **Front-end Mobile:** Desenvolvido nativamente com React Native e a framework Expo.
* **Linguagem:** TypeScript / JavaScript.
* **Estilização e Animações:** Flexbox, Glassmorphism e utilização da biblioteca nativa `Animated` do React Native para luzes néon (TextShadow).
* **Iconografia:** Fontes de vetores `@expo/vector-icons` (MaterialCommunityIcons e Ionicons).

## 📂 Arquitetura do Projeto

A estrutura de pastas e ficheiros seguiu os princípios de *Clean Code* e modularização, separando a interface da lógica de estado:

```text
📦 Sistema LevelUp
 ┣ 📂 app
 ┃ ┗ 📜 index.tsx (Controlador Principal, Motor de XP e Estados)
 ┣ 📂 componentes
 ┃ ┣ 📜 TelaStatus.tsx (Interface do Jogador, Grid 2x2 de Atributos e Cronómetro)
 ┃ ┗ 📜 TelaMissoes.tsx (CRUD de Quests, Filtros Dinâmicos e Validação)
 ┗ 📂 assets (Imagens de Fundo Holográficas)
## 🚀 Como Rodar o Projeto Localmente
* **Pré-requisitos:** Certifique-se de que tem o Node.js instalado no seu computador e descarregue a aplicação Expo Go no seu telemóvel (iOS/Android).

Clone o repositório:

Bash
git clone [https://github.com/SEU_USUARIO/sistema-levelup.git](https://github.com/SEU_USUARIO/sistema-levelup.git)
cd sistema-levelup
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npx expo start -c
Execute no Telemóvel: No terminal, irá aparecer um QR Code. Abra a aplicação Expo Go no seu telemóvel, faça a leitura do código e veja o "Sistema" ligar-se no seu ecrã.
