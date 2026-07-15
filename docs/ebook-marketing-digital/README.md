# Ebook « De zéro à mes premières ventes » — Marketing digital

Ce dossier contient le manuscrit complet de l'ebook premium sur le marketing digital, rédigé en français (~40 000 mots), destiné à des débutants souhaitant vivre du marketing digital.

## Fichiers

- **`../ebook-marketing-digital.md`** — Le livre complet assemblé (fichier final à utiliser pour relecture, export PDF/ebook, ou mise en vente).
- `00-couverture-preface-intro.md` à `08-bonus-checklist-plan-glossaire.md` — Les sources du livre, découpées par partie, pour faciliter les futures relectures et modifications ciblées.

## Structure du livre

- Couverture, remerciements, préface, introduction
- Partie 1 — Comprendre le marketing digital (Chapitres 1 à 3)
- Partie 2 — Créer son activité (Chapitres 4 à 7)
- Partie 3 — Trouver ses premiers clients (Chapitres 8 à 10)
- Partie 4 — Faire ses premières ventes (Chapitres 11 à 13)
- Partie 5 — Développer son business (Chapitres 14 à 17)
- Partie 6 — Les erreurs à éviter (Chapitre 18)
- Bonus — Idées de contenu, scripts, emails, checklist de lancement, plan d'action 90 jours, glossaire, ressources
- Conclusion

## Régénérer le fichier assemblé

Si l'une des parties est modifiée, régénère le fichier final avec :

```bash
cd docs/ebook-marketing-digital
cat 00-couverture-preface-intro.md 01-partie1.md 02-partie2.md 03-partie3.md \
    04-partie4.md 05-partie5.md 06-partie6.md 07-bonus-idees-scripts.md \
    08-bonus-checklist-plan-glossaire.md > ../ebook-marketing-digital.md
```

## Version HTML illustrée (lecture en couleur)

- **`../ebook-marketing-digital-reader.html`** — Version mise en page du livre : sommaire cliquable, couleurs par partie, encadrés (conseils, erreurs à éviter, à retenir, études de cas), tableaux stylés, checklist cochable, thème clair/sombre.
- `../reader-build/` — Scripts générant ce fichier à partir du Markdown : `convert.py` (parse le Markdown en HTML structuré), `style.css`, `script.js`, `assemble.py` (assemble le tout).

### Régénérer la version HTML

Après une modification du Markdown source :

```bash
cd docs/reader-build
python3 convert.py     # relit ../ebook-marketing-digital.md -> body.html + toc.json
python3 assemble.py    # combine body.html + toc.json + style.css + script.js -> final.html
cp final.html ../ebook-marketing-digital-reader.html
```

## Note

Ce contenu est livré indépendamment de la boutique Stripe existante dans ce dépôt (qui vend actuellement l'ebook « L'IA au quotidien »). Aucun fichier de la boutique (`ebook-content.json`, `public/`, `api/`) n'a été modifié.
