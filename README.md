# My Travel

Aplicação web para planejamento de viagens. O My Travel ajuda o usuário a
pesquisar hospedagens, consultar atrações e montar um roteiro personalizado
diretamente no navegador.

> Projeto educacional desenvolvido como exemplo de aplicação front-end. As reservas
> são simuladas e não representam uma operação comercial real.

## Demonstração online

Acesse a versão publicada da aplicação:

**[Abrir My Travel online](https://mytravel.freedev.app/)**

O endereço acima corresponde ao ambiente hospedado do projeto. Para testar ou
alterar os arquivos localmente, siga as instruções da seção [Como executar](#como-executar).

## Registro do desenvolvimento com IA

Para a atividade pedagógica, o processo de desenvolvimento foi registrado em
[docs/prompt.md](docs/prompt.md). O documento reúne os
prompts principais, decisões técnicas, validações e etapas de publicação.

## Versões do projeto

As versões estáveis são preservadas no Git por meio de tags:

- `v1-inicial`: primeira versão funcional do site, registrada no commit de 17/08.
- `v2-atual`: versão com melhorias visuais, reservas e roteiro integrado.
- `v3-final`: versão definitiva com a marca My Travel, slogan e chamada para ação.

A branch `main` representa a versão definitiva aprovada. Novos ajustes devem ser
desenvolvidos em branches `feature/*` e integrados somente depois de revisados.
Para recuperar uma versão específica, use a tag correspondente no GitHub.

## Funcionalidades

- Pesquisa de hotéis por nome ou cidade.
- Ordenação de hotéis por preço, do menor para o maior ou do maior para o menor.
- Exibição de preço, avaliação, cidade e imagem de cada hospedagem.
- Simulação de reserva por meio de formulário.
- Consulta de atrações turísticas.
- Adição de atrações ao roteiro pessoal.
- Contagem de itens salvos no roteiro.
- Persistência de reservas e roteiro no `localStorage` do navegador.
- Layout responsivo para telas menores.

## Tecnologias

- HTML5
- CSS3
- JavaScript (JavaScript puro, sem framework)
- JSON para os dados de hospedagem
- `localStorage` para persistência local
- Google Fonts e imagens externas

## Pré-requisitos

É necessário ter um navegador moderno e, para carregar o arquivo `data/hotels.json`,
um servidor HTTP local. Não há necessidade de instalar dependências ou configurar
um banco de dados.

## Como executar

1. Clone ou baixe este projeto.
2. Abra um terminal na pasta do projeto.
3. Inicie um servidor local. Com Python instalado, execute:

	 ```bash
	 python -m http.server 8000
	 ```

4. Acesse [http://localhost:8000](http://localhost:8000) no navegador.

Também é possível utilizar a extensão Live Server do VS Code ou outro servidor
HTTP equivalente.

## Estrutura do projeto

```text
.
├── index.html        # Entrada pública da aplicação
├── assets/
│   ├── css/
│   │   └── styles.css # Estilos e responsividade
│   └── js/
│       └── script.js  # Interações e persistência local
├── data/
│   └── hotels.json     # Dados estáticos das hospedagens
├── docs/
│   └── prompt.md       # Registro pedagógico do desenvolvimento
└── README.md           # Documentação do projeto
```

## Persistência de dados

O projeto não possui backend. As informações são armazenadas no navegador usando
`localStorage`:

- `itinerary`: atrações adicionadas ao roteiro.
- `reservations`: reservas simuladas pelo usuário.

Os dados ficam restritos ao navegador e à máquina utilizados. Limpar os dados do
site ou utilizar outro navegador remove o conteúdo armazenado.

## Limitações conhecidas

- Não há autenticação ou contas de usuário.
- As reservas não são enviadas para um servidor.
- Não existe verificação de disponibilidade dos hotéis.
- Não há integração com pagamentos.
- Os hotéis e as atrações são dados demonstrativos.
- Imagens e fontes dependem de serviços externos e de conexão com a internet.
- A aplicação deve ser executada por HTTP local; abrir o HTML diretamente pode
	impedir o carregamento de `data/hotels.json` por restrições do navegador.

## Melhorias futuras

- Criar uma API e um backend para hospedagens e reservas reais.
- Adicionar autenticação e roteiros associados a cada usuário.
- Implementar filtros por avaliação, cidade e faixa de preço.
- Permitir remover atrações individualmente do roteiro.
- Validar datas, disponibilidade e quantidade de noites no servidor.
- Adicionar testes automatizados para filtros, reservas e persistência.
- Substituir imagens demonstrativas por um catálogo controlado pela aplicação.
- Publicar a aplicação em uma plataforma de hospedagem web.

## Status

Projeto em desenvolvimento, voltado para fins educacionais e demonstração de
conceitos básicos de front-end.
