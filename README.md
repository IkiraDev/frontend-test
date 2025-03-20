# English

# Binance Websocket Price Tracker

This project is a mini-application for managing real-time price updates via Binance's WebSocket.

## 🚀 Technologies Used

- **Next.js** 14+ (React Framework)
- **TypeScript**
- **Context API** for state management
- **WebSocket** for real-time updates
- **Styled Components / Tailwind CSS** for styling
- **Jest + Testing Library** for unit and integration tests (bonus)

## 📌 Features

1. Consumes the [Binance Exchange Info API](https://api.binance.com/api/v3/exchangeInfo) to list available trading pairs.
2. Allows the user to select and create a list of symbols of interest.
3. Connects to Binance’s WebSocket to display in real-time:
   - Last price
   - Best bid price
   - Best ask price
   - Percentage price change
4. Updates occur near real-time.
5. Responsive for different screen sizes.
6. (Bonus) Unit and integration tests included.

## 📂 Project Structure

📦 binance-websocket-tracker
├── 📁 tests/ # Test area
├── 📁 src
│ ├── 📁 components/ # Reusable components (using Styled Components)
│ ├── 📁 contexts/ # Context API for state management
│ ├── 📁 core/ # Domain structure
│ ├── 📁 views/ # Next.js pages
│ ├── 📁 services/ # Services for API requests
├── 📄 package.json # Dependencies and scripts
├── 📄 tsconfig.json # TypeScript configuration
├── 📄 next.config.ts # Next.js configuration
├── 📄 jest.config.ts # Jest configuration
├── 📄 jest.environment.ts # Jest environment configuration
├── 📄 jest.setup.ts # Jest setup implementation
└── 📄 README.md # Documentation

## 🔧 How to Run the Project

1. Clone the repository:

2. Install dependencies:

   ```sh
   pnpm i
   ```

3. Start the development server:
   ```sh
   pnpm dev
   ```
4. Open http://localhost:3000 in your browser.

## 🧪 Testes

To run the tests:

```sh
   pnpm test
```

To run tests in watch mode:

```sh
   pnpm test:watch
```

## 📖 References

- [Binance Documentation](https://binance-docs.github.io/apidocs/spot/en/#introduction)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)

---

🚀 Developed by **Victor Augusto dos Santos (IkiraDev)**

# Português

# Binance Websocket Price Tracker

Este projeto é um mini-aplicativo para gerenciar a atualização de preços em tempo real via WebSocket da Binance.

## 🚀 Tecnologias Utilizadas

- **Next.js** 14+ (React Framework)
- **TypeScript**
- **Context API** para gerenciamento de estado
- **WebSocket** para atualizações em tempo real
- **Styled Components / Tailwind CSS** para estilização
- **Jest + Testing Library** para testes unitários e de integração (bonus)

## 📌 Funcionalidades

1. Consome a API [Binance Exchange Info](https://api.binance.com/api/v3/exchangeInfo) para listar os pares de negociação disponíveis.
2. Permite que o usuário selecione e crie uma lista de símbolos de interesse.
3. Conecta-se ao WebSocket da Binance para exibir em tempo real:
   - Último preço
   - Melhor preço de compra (Bid)
   - Melhor preço de venda (Ask)
   - Variação percentual de preço
4. Atualizações ocorrem de forma próxima ao tempo real.
5. Responsivo para diferentes tamanhos de tela.
6. (Bonus) Testes unitários e de integração incluídos.

## 📂 Estrutura do Projeto

```
📦 binance-websocket-tracker
├── 📁 __tests__/         # Área de testes.
├── 📁 src
│   ├── 📁 components/    # Componentes reutilizáveis (foi utilizado style-components)
│   ├── 📁 contexts/      # Context API para gerenciamento de estado
│   ├── 📁 core/          # Estrutura de Domínio
│   ├── 📁 views/         # Páginas do Next.js
│   ├── 📁 services/      # Serviços para requisições API
├── 📄 package.json      # Dependências e scripts
├── 📄 tsconfig.json     # Configuração do TypeScript
├── 📄 next.config.ts    # Configuração do NextJs
├── 📄 jest.config.ts    # Configuração do Jest
├── 📄 jest.environment.ts    # Configuração do environment do Jest
├── 📄 jest.setup.ts    # Implementação do setup do Jest
└── 📄 README.md         # Documentação

```

## 🔧 Como Executar o Projeto

1. Clone o repositório:

2. Instale as dependências :

   ```sh
   pnpm i
   ```

3. Inicie o servidor de desenvolvimento:

   ```sh
   pnpm dev
   ```

4. Acesse `http://localhost:3000` no navegador.

## 🧪 Testes

Para rodar os testes:

```sh
pnpm test
```

Para rodar os testes em watch mode:

```sh
pnpm test:watch
```

## 📖 Referências

- [Documentação da Binance](https://binance-docs.github.io/apidocs/spot/en/#introduction)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)

---

🚀 Desenvolvido por **Victor Augusto dos Santos (IkiraDev)**
