# 🧪 SCRIPT DE TEST - ADA

## TEST 1 : Synthèse et tableaux ✅
**Objectif** : Vérifier qu'Ada peut créer des tableaux comparatifs

### Test 1.1
**Question** : "Dresse un tableau des différences entre SPA et SPIC"
**Résultat attendu** : Ada crée un tableau HTML avec les infos du cours
**Résultat NON attendu** : "Cet élément ne figure pas dans le cours"

### Test 1.2
**Question** : "Quelles sont les principales différences entre gestion directe et gestion déléguée ?"
**Résultat attendu** : Ada synthétise en comparant les deux modes
**Résultat NON attendu** : Refus de répondre

---

## TEST 2 : Niveaux de questions ⭐
**Objectif** : Vérifier que les questions sont de niveau 3-5 (pas trop simples)

### Test 2.1
**Demande** : "Génère 3 QCM sur les services publics"
**À vérifier** :
- [ ] Pas de question triviale type "Qu'est-ce qu'un service public ?"
- [ ] Au moins 2 questions de type cas pratique/application
- [ ] Au moins 1 question d'analyse ou de comparaison

### Test 2.2
**Demande** : "Génère 3 questions Vrai/Faux sur les contrats administratifs"
**À vérifier** :
- [ ] Questions qui demandent réflexion (pas juste mémorisation)
- [ ] Variété dans les niveaux

---

## TEST 3 : Limites respectées 🚫
**Objectif** : Vérifier qu'Ada n'invente pas

### Test 3.1
**Question** : "Cite-moi l'arrêt Blanco et sa date exacte"
**Si l'arrêt N'EST PAS dans le cours** :
**Résultat attendu** : "Cette précision ne figure pas dans le cours"

### Test 3.2
**Question** : "Quelle loi a créé les EPIC ?"
**Si la loi N'EST PAS dans le cours** :
**Résultat attendu** : "Cette précision ne figure pas dans le cours"

---

## TEST 4 : Dissertation 📝
**Objectif** : Vérifier qu'Ada peut construire un plan de dissertation

### Test 4.1
**Demande** : "Propose-moi un plan de dissertation sur les modes de gestion des services publics"
**À vérifier** :
- [ ] Plan complet (Intro, I/II avec A/B et 1/2, Conclusion)
- [ ] Contenu basé UNIQUEMENT sur le cours
- [ ] Structure logique et cohérente

---

## TEST 5 : Cas limites 🎭

### Test 5.1 - Information partiellement dans le cours
**Question** : "Quand a été créé le Conseil d'État ?"
**Si la date N'EST PAS dans le cours mais que le CE est mentionné** :
**Résultat attendu** : Ada parle du CE (rôle, missions) mais dit "La date de création ne figure pas dans le cours"

### Test 5.2 - Notion absente du cours
**Question** : "Parle-moi de la blockchain dans l'administration"
**Résultat attendu** : "Ce concept ne figure pas dans le cours du Professeur Coulibaly"

---

## 📊 GRILLE D'ÉVALUATION

| Test | Réussi ✅ | Échoué ❌ | Notes |
|------|----------|----------|-------|
| 1.1 Tableau SPA/SPIC | | | |
| 1.2 Gestion directe/déléguée | | | |
| 2.1 QCM niveau 3-5 | | | |
| 2.2 Vrai/Faux variés | | | |
| 3.1 N'invente pas arrêt | | | |
| 3.2 N'invente pas loi | | | |
| 4.1 Plan dissertation | | | |
| 5.1 Info partielle | | | |
| 5.2 Notion absente | | | |

**Score de réussite attendu** : 9/9 ✅