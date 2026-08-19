# Site da Psicóloga Alice

Landing page institucional, mobile-first, focada em burnout, estresse, sobrecarga e esgotamento relacionado ao trabalho.

## Stack

- HTML5 semântico
- CSS3
- JavaScript vanilla
- Google Fonts (DM Sans + Manrope)
- Sem backend
- Sem framework
- Pronto para hospedagem estática/Vercel

## Estrutura

```text
site-alice/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── alice.jpg
│   └── favicon/
└── README.md
```

## 1. Foto da Alice

Coloque a foto real da psicóloga em:

```text
assets/images/alice.jpg
```

A interface possui um placeholder enquanto a imagem não estiver disponível.

Não use uma foto de banco de imagens para representar Alice.

## 2. WhatsApp

Abra:

```text
js/script.js
```

Procure:

```js
const WHATSAPP_NUMBER = "INSERIR_NUMERO_AQUI";
```

Substitua pelo número no formato internacional, apenas números.

Exemplo fictício:

```js
const WHATSAPP_NUMBER = "5585999999999";
```

A mensagem padrão fica em:

```js
const WHATSAPP_MESSAGE =
  "Olá! Gostaria de saber mais sobre o acompanhamento psicológico.";
```

Todos os CTAs utilizam essa configuração centralizada.

## 3. Conteúdo ainda não fornecido

O prompt recebido especifica que algumas partes deveriam usar o "roteiro completo", mas o roteiro completo não veio anexado: no item 36 existe apenas o marcador `[COLOCAR AQUI O ROTEIRO COMPLETO FORNECIDO NESTE PROMPT]`.

Por isso, esta primeira versão não inventa os conteúdos ausentes. Foram deixados placeholders explícitos para:

- textos específicos dos temas;
- texto biográfico completo da Alice;
- feedbacks;
- respostas de FAQ que dependem do roteiro;
- texto do CTA final;
- CRP.

Quando o roteiro real for fornecido, substitua os placeholders mantendo a estrutura.

## 4. Executar localmente

### Opção A — VS Code + Live Server

1. Abra a pasta no VS Code.
2. Instale a extensão Live Server.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.

### Opção B — servidor Python

Com Python instalado:

```bash
python -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500
```

É preferível usar um servidor local em vez de abrir o HTML diretamente com `file://`, especialmente quando o projeto crescer.

## 5. Deploy na Vercel

A forma mais simples:

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto.
3. Acesse a Vercel e escolha **Add New Project**.
4. Importe o repositório.
5. Como é um site estático, não é necessário configurar framework.
6. Não informe Build Command.
7. O diretório de saída é a própria raiz do projeto.
8. Faça o deploy.

Também é possível publicar pela CLI da Vercel.

## 6. Rotas futuras

O menu já está preparado para:

```text
/
 /sobre
 /burnout
 /depressao
```

Nesta primeira versão, apenas `index.html` existe de fato. Os links `/sobre`, `/burnout` e `/depressao` servem como estrutura planejada e deverão receber páginas posteriormente.

Se a Vercel precisar de roteamento específico para essas páginas, recomendo criar os diretórios:

```text
sobre/index.html
burnout/index.html
depressao/index.html
```

antes de ativar esses links em produção.

## 7. Observações de conteúdo

Não foram adicionados:

- CRP inventado;
- especializações não fornecidas;
- universidade;
- localização;
- valores;
- duração de sessão;
- estatísticas;
- diagnósticos;
- promessas de cura;
- depoimentos inventados.

Esses dados devem ser inseridos somente quando forem fornecidos pela profissional.

## 8. Acessibilidade

A primeira versão inclui:

- HTML semântico;
- skip link;
- navegação por teclado;
- foco visível;
- `aria` no menu e tabs;
- headings hierárquicos;
- `alt` na foto;
- suporte a `prefers-reduced-motion`;
- áreas de toque adequadas;
- contraste baseado na paleta proposta.

## 9. Próxima etapa recomendada

Antes do deploy definitivo:

- inserir o roteiro completo real;
- inserir foto otimizada da Alice;
- inserir WhatsApp;
- inserir CRP;
- revisar textos com a própria psicóloga;
- revisar consentimento e autorização dos depoimentos;
- criar páginas reais de Sobre e Depressão;
- adicionar favicon;
- testar em Android/iPhone e desktop;
- testar links e CTAs;
- testar Lighthouse;
- configurar domínio, se houver.
