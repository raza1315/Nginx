run an ubuntu container while exposing some port (8080:80) just for checking the installation of nginx thorugh your system localhost:80

docker run -it -p 8080:80 ubuntu

now update the apt-get package manager
  -apt-get update

now install NGINX on the container 
  -apt-get install nginx -y

Start the nginx service
  -nginx

Check http://localhost:8080 for successful installation of nginx
or simply nginx -v

Some Nginx Commands:
  -systemctl stop nginx (stop nginx)
  -systemctl status nginx (show status)
  -nginx -s reload (reload after making any changes to conf file)

Navigate to /etc/nginx directory and create a backup of the nginx.conf --> nginx-backup.conf (optional but good practice) and write your configurations in the nginx.conf:

