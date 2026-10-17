# Placar BJJ

Placar de luta de Jiu-Jitsu (regras CBJJ) com duas telas:

- `/` — Operador (pontos, vantagens, punições, tempo, vencedor, tela de proteção)
- `/monitor` — Monitor para o público

As duas telas sincronizam automaticamente quando abertas **no mesmo navegador e computador** (BroadcastChannel + localStorage).

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
