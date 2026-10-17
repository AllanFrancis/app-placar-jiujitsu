# Placar BJJ

Placar de luta de Jiu-Jitsu (regras CBJJ) com duas telas:

- `/` — Operador (pontos, vantagens, punições, tempo, vencedor, tela de proteção)
- `/monitor` — Monitor para o público

As duas telas sincronizam automaticamente quando abertas **no mesmo navegador e computador** (BroadcastChannel + localStorage).

## Sem internet

O app funciona offline depois do primeiro acesso com internet:

- React, Babel e as fontes ficam em `vendor/` (nada é carregado de CDN).
- O service worker (`sw.js`) guarda o app no navegador. Dá para recarregar o operador, recarregar o monitor ou abrir o monitor sem internet.
- O estado da luta fica no `localStorage`, então recarregar não perde placar nem tempo.

Abra o operador **uma vez com internet** antes do evento, no mesmo navegador que será usado.

## Atalhos do operador

- **Espaço** — iniciar/pausar o cronômetro
- **Ctrl+Z** — desfazer a última ação

## Rodar localmente

```bash
npx serve .
# ou
python -m http.server 8000
```

## Deploy na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → importe o repositório.
3. Framework Preset: **Other**. Build Command: vazio. Output Directory: `.`
4. Deploy.

## Uso

1. Abra `https://SEU-PROJETO.vercel.app` no notebook.
2. Clique em **Abrir monitor ↗** e arraste a janela para o monitor estendido.
3. Clique em **Tela cheia** (ou F11).

## Empate

- **Fim do tempo empatado** (pontos, vantagens e punições iguais) — o monitor mostra "EMPATE · DECISÃO DOS ÁRBITROS". No operador aparecem os botões para declarar quem venceu; ao clicar, o monitor mostra o vencedor (nome, ou a cor se o nome estiver vazio) "por decisão".
- **🏆 Empate · ambos vencedores** — encerra a luta com os dois atletas vencedores (ex.: lutas infantis). O monitor mostra "VENCEDORES" com os dois nomes.
- **⚖ Empate · decisão dos árbitros** — leva a luta para decisão manualmente, a qualquer momento.

Para trocar a arte do evento, substitua `assets/arte-campeonato.png`.
