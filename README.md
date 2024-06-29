# bot-base

Voici un bot [Discord.js](https://discord.js.org/) très simple qui permet de commencer très facilement et rapidement.

# Informations

Il y a un boilerplate pour la création de SlashCommands avec deux commandes admin
- /reload : Permet de mettre à jour toutes vos commandes (fichier typescript dans `src/admincommands` et `src/commands`) sur Discord, (création/suppression/modification)
- /mini-reload : Permet de mettre à jour toutes les commandes disponible globalement (fichier typescript dans `src/commands`), (création/suppression/modification)

# Initialisation

Créez un fichier .env pour stocker certaines variables

```properties
DATABASE_URL="file:./dev.db" #Don't change unless you changed the location or name of your database
DISCORD_TOKEN=YOUR_DISCORD_TOKEN
CLIENT_ID=YOUR_CLIENT_ID #Application id of the bot used to reload admin commands, Discord Developer Portal > "General Information" > "Application id"
GUILD_ID=YOUR_GUILD_ID #Guild id of the server used to reload admin commands, Enable developer mode in Discord > Right-click the server title > "Copy ID"
```

# Démarrage

Rien de plus simple qu'un `npm start` pour lancer votre bot et c'est bon !

Une petite commande à savoir, `npm run commands` qui permet d'exécuter d'envoyer vos commandes à Discord, comme le ferais `/reload`. C'est très utile pour initialiser les commandes la première fois. Vous devriez essayer (sinon vous n'aurez jamais vos commandes de disponibles...)


# Prisma

Voici la document de Prisma qui est très clair !
Si vous voulez, vous pouvez utiliser un autre ORM ou l'implémenter vous même. Prisma est ici inclus en tant que dépendance mais n'est pas utilisé. Toutes les lignes à supprimer sont présentes dans index.ts .