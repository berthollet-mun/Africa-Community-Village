# Architecture MVC d’ACV

L’application utilise Next.js App Router avec une séparation stricte des responsabilités.

## Model

- `prisma/schema.prisma` décrit la base MySQL.
- `src/models/prisma/client.ts` est l’unique point d’initialisation de Prisma.
- `src/models/*Model.ts` contient les accès aux données et les règles métier.
- Une route API, une Server Action ou un composant React ne doit jamais importer Prisma.

## View

- `src/app/(public)` et `src/app/admin` déclarent les vues routées.
- `src/components` ne fait aucun accès direct à la base et ne contient aucun `fetch`.
- Les vues reçoivent leur état via les contrôleurs React (`context` et `hooks`).

## Controller

- `src/app/api/**/route.ts` valide les entrées avec Zod, authentifie, appelle un Model et traduit le résultat en réponse HTTP.
- `src/actions` contient les Server Actions pour les mutations sans API REST.
- `src/hooks` et `src/context` orchestrent l’état côté navigateur via le client API centralisé.

## Démarrage local

1. Copier `.env.example` vers `.env` et renseigner `DATABASE_URL` et `AUTH_SECRET`.
2. Installer les dépendances avec `npm install`.
3. Créer le schéma avec `npm run prisma:migrate -- --name init`.
4. Charger les données initiales avec `npm run prisma:seed`.
5. Démarrer avec `npm run dev`.

Les anciennes URL `/api/admin/*` et `/api/public/*` sont conservées pour assurer la compatibilité avec l’interface existante.
