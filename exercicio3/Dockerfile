FROM node:18-alpine

WORKDIR /app

# Instalar um servidor HTTP simples
RUN npm install -g http-server

# Copiar os arquivos do projeto
COPY . .

# Expor a porta 8080
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", "-p", "8080", "-c-1"]