# Project Outline

## Entry Point ($projectdir/index.ts)

- Setup worker spawning for every source domain

## Frontend App (src/app)

- Angular Electron App

## Core App (src/core)

- Toolkit internals such as config management, module loading/unloading, credential management, logging

## Api (src/api)

- Websocket for external IO such as webpanels, interacting with other modules or programs

## Modules (src/modules)

### Entry index.ts

- Spawn worker for each module domain

### List of modules

- Mass Ban Tool for Twitch and Discord
- TextToSpeech in Discord Voice Chat
- JewGuessr
- Moderation Tools (maybe)
- Discord Role Manager
- Discord Custom Rich Presence
- Discord Musicbot
- Command Manager
- DiscordCleaner (https://github.com/Stapleton/DiscordCleaner)
- Sandbox Exec Environment for commands/modules
