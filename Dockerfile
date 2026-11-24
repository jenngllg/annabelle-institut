# Aperçu local du site statique : docker build -t annabelle . && docker run -p 8765:8765 annabelle
FROM node:22-alpine

WORKDIR /usr/src/app

# Aucune dépendance npm : le build et le serveur n'utilisent que Node.
COPY . .
RUN node scripts/build.js

EXPOSE 8765
CMD ["node", "scripts/serve-dist.js", "8765"]
