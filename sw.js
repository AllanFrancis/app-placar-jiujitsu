// Service worker: guarda o app no navegador para abrir e recarregar sem internet.
// Arquivos do app: rede primeiro (pega atualizações do deploy), cache se a rede falhar ou demorar.
// /vendor/: cache primeiro (bibliotecas e fontes com versão fixa).
const CACHE = 'placar-bjj-v1';
const PRECACHE = [
  '/',
  '/monitor',
  '/support.js',
  '/favicon.ico',
  '/favicon.svg',
  '/assets/apple-touch-icon.png',
  '/assets/arte-campeonato.png',
  ...['br-motos', 'pet-shopping', 'vitoria-ferragens', 'ramalho-paineis', 'team-zimmermann', 'jhony-croc', 'copicenter', 'cvt-vistoria', 'salaam-aleikum', 'almeida-fight-club']
    .map(f => `/assets/patrocinadores/${f}.webp`),
  '/vendor/react.production.min.js',
  '/vendor/react-dom.production.min.js',
  '/vendor/babel.min.js',
  '/vendor/fonts/fonts.css',
  ...['barlow-400', 'barlow-500', 'barlow-600', 'barlow-700', 'barlow-condensed-600', 'barlow-condensed-700', 'barlow-condensed-800']
    .flatMap(f => [`/vendor/fonts/${f}-latin.woff2`, `/vendor/fonts/${f}-latin-ext.woff2`])
];
const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// resposta vinda de redirecionamento não pode ser usada numa navegação: copia o corpo
const clean = r => r.redirected ? r.blob().then(b => new Response(b, { status: r.status, statusText: r.statusText, headers: r.headers })) : r;

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const net = fetch(req).then(async res => {
    if (!res.ok) return res;
    const ok = await clean(res);
    cache.put(req, ok.clone());
    return ok;
  });
  try {
    return await Promise.race([net, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), NETWORK_TIMEOUT_MS))]);
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    return net; // sem cópia guardada: espera a rede mesmo que demore
  }
}

async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(url.pathname.startsWith('/vendor/') ? cacheFirst(e.request) : networkFirst(e.request));
});
