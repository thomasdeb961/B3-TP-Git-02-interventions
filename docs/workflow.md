# Workflow Git de l'équipe

## Choix : Git Flow simplifié

L'application est développée par plusieurs développeurs en parallèle (équipements, techniciens, planification, statuts). L'équipe veut éviter les modifications concurrentes incontrôlées et garder une version stable. Git Flow répond à ces besoins : `main` reste toujours stable, `develop` sert de zone d'intégration, et chaque fonctionnalité est isolée dans sa branche.

Nous le simplifions : pas de branche `release`, car le projet est petit et les livraisons se font directement depuis `develop` vers `main`.

## Les branches

| Branche | Rôle | Créée depuis | Fusionnée dans |
|---|---|---|---|
| `main` | Version stable, en production. Protégée, jamais de push direct | — | — |
| `develop` | Intégration des fonctionnalités terminées et relues | `main` | `main` (à chaque livraison) |
| `feature/<nom>` | Développement d'une fonctionnalité | `develop` | `develop` par Pull Request |
| `hotfix/<nom>` | Correction urgente d'un bug en production | `main` | `main` **et** `develop` par Pull Request |

## Développer une fonctionnalité

1. Une Issue décrit le besoin et les critères d'acceptation.
2. `git switch develop && git pull`, puis `git switch -c feature/<nom>`.
3. Commits au format Conventional Commits.
4. `git push -u origin feature/<nom>`, puis Pull Request vers `develop`, liée à l'Issue (`Closes #n`).
5. Revue par un autre membre, au moins une approbation, puis fusion et suppression de la branche.

## Traiter une correction urgente

1. La correction part de `main` (la version en production) : `git switch -c hotfix/<nom> main`.
2. On corrige, on teste, on commite avec `fix: ...`.
3. Pull Request vers `main`, revue et approbation obligatoires.
4. Après fusion, on reporte la correction dans `develop` (Pull Request `main` → `develop` ou merge), pour que le bug ne réapparaisse pas à la livraison suivante.

## Livrer une version

Quand `develop` est stable : Pull Request `develop` → `main`, puis tag de version (`git tag v1.0.0` et `git push origin v1.0.0`).
