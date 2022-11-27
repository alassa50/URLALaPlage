# URL A LA PLAGE
Repo contenant différents bouts de codes autour d'un sujet simple.

## L'objectif de ce projet
En partant d'une idée simple (jouer avec des urls) explorer des concepts des manières de faire au niveau code, archi et permettre de tester des technos.

## Api en nodejs qui permet d'ajouter "youpi" une url
### A faire
* [X] un endpoint pour ajouter youpi à l'url à traiter pour avoir la version short (hum ajouter des caractères pour avec une version plus courte, un concept ^^)
* [X] un endpoint pour enlever youpi à partir de la version short

### Résultat
* Code :
 _source : youpi.js & pour test : youpi.rest_
* Conclusion :
Les bases sont là, ça marche c'est pas mal mais ça ne sert pas à grand chose pour le moment ^^

## Api en nodejs qui permet de raccourcir une url en "zippant"
### A faire
L'idée est de faire une sorte de compacteur style zip de l'information
* [X] un endpoint pour donner l'url à traiter qui nous donne la version courte
* [X] un endpoint pour nous donner la version longue à partir de la version courte

_Idées :_
- Utilisation de js-string-compression
- Utilisation de zlib

### Résultat
* Code :
 _source : compress.js & pour test : compress.rest_
* Conclusion :
Pour la même source : "http://localhost:3001/compress/short/"

| Source | Resultat | 
| --- | ----------- |
| jsscompress.Hauffman() | \u000bdêæº.S\u0002Þ±Ú\u0012òÂ²ÛW\u0004Ægixv\t\\\u000b\u000fîÿjùº'\u001b° | 
| zlib | 1f8b0800000000000003cb282929b0d2d7cfc94f4eccc9c82f2eb132363030d44fcecf2d284a2d2ed62fcec82f2ad10700e9c1ac2525000000 | 

La compression sur peu de caractères n'est pas pertinente avec les algo testés 

## Api en nodejs qui permet de raccourcir une url avec un id
L'idée est d'utiliser un id avec un systeme de correspondance
* [ ] un endpoint pour donner l'url à traiter qui nous donne la version courte
* [ ] un endpoint pour nous donner la version longue à partir de la version courte

_Idées :_
- Utlisation d'un object en mémoire
- Utlisation d'un fichier

## Api en nodejs qui permet de raccourcir une url avec seulement 4 caractères
L'idée est d'utiliser un id avec un systeme de correspondance
* [ ] un endpoint pour donner l'url à traiter qui nous donne la version courte
* [ ] un endpoint pour nous donner la version longue à partir de la version courte


## API et docs archi

## API et doc decisions

## API et swagger

## API et log

## API et metrics

## API et traces

## API et tests

## API et sécurité

## API et qualité du code

## API et conteneur

## API et firebase

## API et bucket

## API et postman...

## API et jMeter

## API et optimisation 

## API et gitHub action

## API et chaos

--------------------

# Prerequis

## Setup

### Git

    echo "# URLALaPlage" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin git@github.com:alassa50/URLALaPlage.git
    git push -u origin main

### VSCODE

#### REST Client

    Nom : REST Client
    ID : humao.rest-client
    Description : REST Client for Visual Studio Code
    Version : 0.25.1
    Serveur de publication : Huachao Mao
    Lien de la Place de marché pour VS : https://marketplace.visualstudio.com/items?itemName=humao.rest-client

### NodeJs

Installez Nodejs : https://nodejs.org/fr/download/

    npm init -y

Exécution du backend

    nodemon index.js

#### NodeJs - Dependencies used

 - [Express](https://expressjs.com/) : framework d'application Web conçu pour créer des applications Web et des API.
- [CORS](https://github.com/expressjs/cors) : middleware express pour activer les fonctionnalités CORS.
- [Body-Parser] : middleware pour traiter le requête brute
- [Morgan] : HTTP loggeur
- [js-string-compression] : Lib de compression de strings
- [uuid] : uuid


    npm install --save express
    npm install --save cors
    npm install --save body-parser
    npm install --save morgan   
    npm install --save js-string-compression
    npm install --save uuid
    
    

Bientôt => 

- [joi](https://github.com/hapijs/joi) : bibliothèque de validation de schéma d'objet.
- [dotenv](https://github.com/motdotla/dotenv) : pour définir les variables d'environnement.
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) : documentation API générée automatiquement, basée sur un fichier swagger.json.
- [ESLint](https://eslint.org/) : linter de code. Analyse le code des erreurs potentielles.
- [Jest](https://jestjs.io/) : pour les tests.
- [Helmet](https://helmetjs.github.io/) : sécurité Express.js avec en-têtes HTTP


#### NodeJs - Dependencies used for dev
- [Nodemon] : Nodemon est un outil qui aide à développer des applications basées sur .js nœud en redémarrant automatiquement l’application de nœud lorsque des modifications de fichier dans le répertoire sont détectées.
- [prettier] : prettier

    npm install --save-dev nodemon
    npm install --save-dev --save-exact prettier


### ESLINT

npm init @eslint/config

### firebase functions

### cloud
* [ ] Setup Local project
* [ ] Setup gcloud poc environment

# Memento 

## Firebase Commands

firebase init
firebase login --reauth