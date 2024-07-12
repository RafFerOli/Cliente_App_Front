# Use a imagem oficial do Nginx como base
FROM nginx:alpine

# Remova o conteúdo padrão da pasta html do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie os arquivos da pasta src para o diretório padrão de documentos do Nginx
COPY src /usr/share/nginx/html

# Exponha a porta 80 para o Nginx
EXPOSE 80

# Comando para iniciar o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]