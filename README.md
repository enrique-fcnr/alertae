# Alertae


## Índice
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Cores e Fontes](#cores-e-fontes)
3. [Como usar localmente](#como-usar)
4. [ConfigurarAPI](#ConfiguraraAPI)
5. [Contribuições](#contribuições)
6. [Licença](#licença)


## Sobre o Projeto
O AlertaE é um aplicativo desenvolvido com o objetivo de alertar de maneira amigável e eficaz a população sobre condições climáticas adversas, como chuvas fortes, altas temperaturas e outros problemas ambientais que podem representar riscos à saúde e segurança das pessoas.

Com uma interface intuitiva e acessível, o app oferece notificações em tempo real sobre eventos climáticos extremos e fornece recomendações de segurança personalizadas, com base na localização do usuário. Além disso, o AlertaE tem como missão promover a conscientização ambiental, ajudando os cidadãos a tomarem decisões informadas para proteger sua saúde e bem-estar.

Com o AlertaE, a informação chega de forma clara e direta, garantindo que todos possam se preparar e agir com antecedência diante de situações climáticas perigosas.


## Cores e Fontes
1. Cores texto: 
 - Azul_1 - #1051AB
 - Azul_2 - #007bff
 - Azul_3 - #0d6efd
 - Cinza_claro_1 - #EFEFED
 - Cinza_claro_2 - #e0e0e0
 - Cinza_claro_3 - #e0e0e0
 - Branco - #ffffff

2. Cores de fundo:
 - Azul_dark: #1051AB
 - Azul_light: #e7f2ff
 - Gray_light: #f8f9fa 

2. Fontes:
 - LEAGUE SPARTAN (GOOGLE FONTS) - HEADERS, TÍTULOS E BOTÕES 
COLAR CÓDIGO NO <head> DO HTML

 - OPEN SANS (GOOGLE FONTS) - CORPO DO TEXTO, PARÁGRAFOS, INFORMAÇÕES <head> DO HTML

## Como usar
### Instruções para Rodar o Projeto Localmente

Este guia explica como configurar e rodar o projeto **Vite** com **React** no seu computador.

### 1. Instalar as Ferramentas Necessárias

Antes de começar, você precisa ter algumas ferramentas instaladas no seu computador.

### a. **Git**

O **Git** é essencial para clonar o repositório do GitHub no seu computador.

- **Windows**: [Download Git](https://git-scm.com/download/win)
- **Mac**: O **Git** geralmente já vem pré-instalado. Se não, use o **Homebrew**:
```bash
  brew install git

````
### b. **Node.js e NPM (Node Package Manager)**

O Vite e o React exigem o Node.js para rodar, e o npm ou yarn para gerenciar pacotes.

Para verificar se o Node.js já está instalado, abra o terminal e digite:



```bash
node -v
````


## 4. Rodar o Projeto Localmente

Agora que as dependências estão instaladas, você pode rodar o projeto localmente.

## Se estiver usando o **npm**, execute:
```bash
npm run dev


VITE v4.0.0  ready in 300ms

  VITE  Server running at:
  > Local:    http://localhost:5173/
  > Network:  http://192.168.x.x:5173/
```

## ConfigurarAPI

### Configurar a API Key do OpenWeatherMap

Este projeto utiliza a API do [OpenWeatherMap](https://openweathermap.org/api) para obter dados meteorológicos.

Para que tudo funcione corretamente, você precisará da sua própria chave de API.

### 📌 Passo a passo:

1. Acesse: [https://openweathermap.org/api](https://openweathermap.org/api)
2. Crie uma conta ou faça login.
3. No painel da sua conta, vá até **API keys**.
4. Copie a sua chave de API (geralmente chamada de `default`).
5. Na raiz do projeto, crie um arquivo `.env` e adicione a seguinte linha:

```env
VITE_WEATHER_API_KEY=sua_chave_aqui

  ```
  ⚠️ Importante: Nunca compartilhe sua chave de API publicamente. Use variáveis de ambiente para protegê-la.

## Contribuições:
Agradecemos a todos que colaboraram para o desenvolvimento deste projeto:

- [Enrique Fernandes](https://github.com/enrique-fcnr)
- [Kelly Reis Lee](https://github.com/KellyReisLee)





