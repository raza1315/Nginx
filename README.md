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
  -nginx -test (testing if everything is OK )
  -nginx -s reload (reload after making any changes to conf file)

Navigate to /etc/nginx directory and create a backup of the nginx.conf --> nginx-backup.conf (optional but good practice) and write your configurations in the nginx.conf:                                         
events {}

http {
    server {
        listen 80;
        server_name _;

        location / {
            return 200 "Hello from nginx";
        }

        # Forward the /proxy path without appending it to the backend URL
        location /proxy/ {
            proxy_pass http://host.docker.internal:3000/;  # Ensure the trailing slash here
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}

Now reload nginx:
  -nginx -s reload

