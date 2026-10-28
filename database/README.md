# Base de données ACV

La base est décrite par `prisma/schema.prisma` et créée par les migrations versionnées dans `prisma/migrations`.
Elle contient les tables métier suivantes : utilisateurs, pages, bannières, programmes, équipe, articles,
médias, partenaires, paramètres, journaux d'audit, dons, messages de contact, témoignages, statistiques
d'impact, documents de politique et notes de terrain.

## Installation

1. Créer une base MySQL/MariaDB vide nommée `acv`, encodée en `utf8mb4`.
2. Copier `.env.example` vers `.env.local` et renseigner `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET` et
   `SEED_ADMIN_PASSWORD` avec de vrais secrets.
3. Exécuter `npm run db:deploy` pour les tables, index, contraintes, vues, procédures, fonctions et triggers.
4. Exécuter `npm run prisma:seed` pour charger les contenus initiaux et le compte administrateur.

`DATABASE_URL` sert à l'application et doit utiliser le compte `acv_app` à privilèges limités. `DIRECT_URL`
sert aux migrations et utilise le compte `acv_migration`. Le fichier `grants.example.sql` fournit le modèle
des droits sans contenir de secret réel.

## Identifiants

Chaque table utilise une clé primaire interne `INT AUTO_INCREMENT` et un identifiant public stable
`external_id`. Les numéros `AUTO_INCREMENT` sont uniques et ordonnés, mais MySQL/MariaDB peut laisser des
trous après une annulation de transaction ou une insertion concurrente. L'application ne dépend donc jamais
d'une séquence sans trou.

## Déploiement Netlify / Loopia

Définir les mêmes variables dans Netlify et autoriser l'adresse sortante utilisée par l'hébergement chez
Loopia. Utiliser TLS si le serveur MySQL l'exige. Les migrations sont idempotentes et les objets avancés sont
réinstallés proprement par `npm run db:deploy`.
