# Machine à Café Automatique
binom link repos : 
```
https://github.com/II-Chelmi-II/prog-5-d5?tab=readme-ov-file
```

Ce dépôt contient la documentation fonctionnelle et technique d’un système de machine à café automatique. Il détaille le fonctionnement métier, les cas d’utilisation, les erreurs possibles, les optimisations envisageables ainsi que la modélisation du processus.



## Objectif

Fournir automatiquement du café aux utilisateurs après :
- Paiement
- Choix de boisson
- Vérification des ressources internes


## Use Case Principal : Servir un Café
| Acteur  | Action                      | Système Répond                          |
| ------- | --------------------------- | --------------------------------------- |
| Client  | Insère un moyen de paiement | Vérifie validité et solde               |
| Client  | Sélectionne une boisson     | Vérifie disponibilité des ressources    |
| Machine | Prépare le café             | Exécute le mélange, chauffe et remplit  |
| Machine | Sert le café                | Fournit le gobelet contenant la boisson |

## Gestion des Erreurs

### 1.Paiement
- Solde insuffisant
- Pièce ou billet non reconnu
- Paiement par carte refusé
- Système de paiement hors ligne

### 2.Choix de café
- Choix indisponible
- Manque de poudre à café
- Manque d’eau
- Gobelet manquant
- Panne générale
- Coupure de courant

### 3.Préparation
- Temps de préparation dépassé
- Mauvais mélange

### 4.Distribution
- Verre non délivré
- Boisson non versée
- Échec de distribution

## Optimisations Possibles
- Capteurs IoT pour état en temps réel
- Dashboard de supervision
- Maintenance prédictive (alerte SMS/mail)
- Paiement sans contact / QR code / App mobile
- Suggestions personnalisées
- Interface vocale/tactile
- Écran dynamique avec promo du jour

##  Diagramme de Cas d’Utilisation

```
usecaseDiagram
    actor Client as C
    actor Technicien as T

    C --> (Effectuer un paiement)
    C --> (Choisir un café)
    C --> (Recevoir son café)

    T --> (Effectuer une maintenance)
    T --> (Remplir les stocks)

```

## Diagramme d'État

```
stateDiagram-v2
    [*] --> AttentePaiement
    AttentePaiement --> ValidationPaiement
    ValidationPaiement --> ChoixBoisson
    ChoixBoisson --> VérificationRessources
    VérificationRessources --> Préparation
    Préparation --> Distribution
    Distribution --> [*]
    
```