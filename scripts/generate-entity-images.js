#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const dataPath = path.join(repoRoot, 'public', 'dados-es.json');
const outDir = path.join(repoRoot, 'public', 'imagens', 'entes');
const mapPath = path.join(repoRoot, 'src', 'utils', 'entityImageFiles.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function normalizeName(nome = '') {
  return nome
    .replace(/^MUNICIPIO D[EAO]\s+/i, '')
    .replace(/^ESTADO D[EO]\s+/i, '')
    .replace(/^GOVERNO D[EO]\s+/i, '')
    .replace(/^GOVERNO DO ESTADO D[EO]\s+/i, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function toFileSlug(name) {
  return normalizeName(name)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function initials(name) {
  const parts = normalizeName(name).split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'ES';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function createSvg(name, isState = false) {
  const text = normalizeName(name)
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

  const [bgStart, bgEnd] = isState
    ? ['#0369a1', '#0f766e']
    : ['#1d4ed8', '#2563eb'];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" role="img" aria-label="${escapeXml(name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgStart}"/>
      <stop offset="100%" stop-color="${bgEnd}"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="152" height="152" rx="20" fill="url(#bg)"/>
  <circle cx="80" cy="62" r="28" fill="#ffffff" fill-opacity="0.95"/>
  <text x="80" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#0f172a">${initials(name)}</text>
  <text x="80" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">${escapeXml(text).slice(0, 22)}</text>
</svg>`;
}

const entities = [data.estado?.nome, ...(data.municipios || []).map((m) => m.nome)].filter(Boolean);
const uniqueEntities = Array.from(new Set(entities));

fs.mkdirSync(outDir, { recursive: true });
const mapping = {};

for (const entity of uniqueEntities) {
  const key = normalizeName(entity);
  const filename = `${toFileSlug(entity) || 'ente'}.svg`;
  fs.writeFileSync(path.join(outDir, filename), createSvg(entity, key === 'espirito santo'));
  mapping[key] = `/imagens/entes/${filename}`;
}

mapping['governo do estado'] = mapping['espirito santo'];
mapping['estado do espirito santo'] = mapping['espirito santo'];

fs.writeFileSync(mapPath, `${JSON.stringify(mapping, null, 2)}\n`);
console.log(`Geradas ${uniqueEntities.length} imagens em ${outDir}`);
