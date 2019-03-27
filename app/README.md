# GraphQL-React Web Application

## File Structure
```
.
├── Dockerfile
├── README.md
├── config
│   ├── basic.config.js ## Global config and env config in the future
│   ├── webpack.config.js  ## The common part
│   └── webpack.dev.config.js  ## The resolvers/plugins used only for development
├── src
│   ├── components/ ## Common components  
│   ├── graphql/ ## Graphql queries
│   ├── routes/ ## Client route config
│   ├── style/ ## Common scss styles
│   ├── App.tsx
│   ├── apolloClient.ts
│   ├── index.html
│   └── index.tsx  <--- Starter 
├── nginx.conf
├── package-lock.json
├── package.json
└── tsconfig.json
```
