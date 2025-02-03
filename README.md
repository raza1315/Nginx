Here's a **step-by-step README** for setting up an Ubuntu container with NGINX as a reverse proxy to a Node.js server running on `localhost:3000`:

---

# NGINX Reverse Proxy Setup in Docker Container

This guide explains how to set up an **NGINX reverse proxy** inside an **Ubuntu Docker container** to forward requests from `localhost:8080` to a **Node.js server** running on `localhost:3000`.

### **Prerequisites:**
- **Docker** installed on your machine.
- A **Node.js server** running on your **host machine** on port **3000**.
- Basic knowledge of Docker, NGINX, and how to configure reverse proxies.

### **Step 1: Run Ubuntu Docker Container**

First, run an **Ubuntu container** while exposing port **8080** on your host machine, which will map to port **80** inside the container. This will allow you to access the NGINX service running inside the container via `http://localhost:8080`.

```bash
docker run -it -p 8080:80 ubuntu
```

This command starts the container in interactive mode with the port **8080** exposed.

---

### **Step 2: Update apt-get and Install NGINX**

Inside the Docker container, update the package manager and install **NGINX**:

```bash
apt-get update
apt-get install nginx -y
```

---

### **Step 3: Start NGINX Service**

Start the **NGINX** service:

```bash
nginx
```

You can verify NGINX is running by checking the version:

```bash
nginx -v
```

Alternatively, check by accessing `http://localhost:8080` from your host machine's browser. You should see the default NGINX page if the installation was successful.

---

### **Step 4: Configure NGINX as Reverse Proxy**

1. **Backup the default `nginx.conf` file** (Optional but recommended):

   Inside the container, navigate to the NGINX configuration directory:
   ```bash
   cd /etc/nginx
   cp nginx.conf nginx-backup.conf
   ```

2. **Edit `nginx.conf`**:

   Open the NGINX configuration file for editing:
   ```bash
   nano /etc/nginx/nginx.conf
   ```

   Replace the content with the following configuration to set up the reverse proxy:

   ```nginx
   events {}

   http {
       server {
           listen 80;
           server_name _;

           location / {
               proxy_pass http://host.docker.internal:3000/;  # Forward requests to the backend (Node.js) server
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           }
       }
   }
   ```

   Explanation:
   - **`proxy_pass http://host.docker.internal:3000/;`**: This forwards all requests to `http://localhost:3000` on your host machine, where the Node.js server is running.
   - The `proxy_set_header` lines ensure the proper headers are passed along to the backend service.

3. **Save and exit** the file (in `nano`, press `CTRL + X`, then `Y`, and `Enter` to confirm).

---

### **Step 5: Reload NGINX Configuration**

After updating the configuration, reload NGINX to apply the changes:

```bash
nginx -s reload
```

---

### **Step 6: Test the Reverse Proxy**

1. **Start your Node.js server** on your host machine (Mac/PC) on port **3000**:
   
   Make sure your Node.js server is running and accessible at `http://localhost:3000` on your host machine. If the Node.js app is running, you should be able to open this URL in your browser.

2. **Access via Browser:**

   Open `http://localhost:8080` in your browser. NGINX should forward the request to your Node.js server running on port `3000`, and you should see the response from your Node.js application.

3. **Check with curl (Optional):**

   You can also check the proxy using `curl` from the host:

   ```bash
   curl http://localhost:8080
   ```

   This should return the response from the Node.js server.

---

### **NGINX Commands Recap:**

- **Stop NGINX:**
  ```bash
  systemctl stop nginx
  ```

- **Check NGINX Status:**
  ```bash
  systemctl status nginx
  ```

- **Test NGINX Configuration:**
  ```bash
  nginx -t
  ```

- **Reload NGINX:**
  ```bash
  nginx -s reload
  ```

---

### **Additional Notes:**

- If your **Node.js server** is running on a **different port** or on a different address, update the `proxy_pass` directive accordingly.
- Make sure that the **Node.js server** is accessible to the Docker container. If you’re using `host.docker.internal`, it should work for Docker on macOS and Windows. For Linux, you might need to use `localhost` or the host IP address.

---

### **Troubleshooting:**

If you encounter a **502 Bad Gateway** or **"Cannot GET /proxy"** error:
- Ensure the Node.js server is up and running on `localhost:3000`.
- Check the NGINX logs for errors:  
  ```bash
  docker logs <nginx_container_name>
  ```

If the issue persists, feel free to reach out for further assistance.

---

### **Conclusion:**

This setup allows you to quickly set up a Docker container with NGINX that acts as a reverse proxy to forward requests to a backend service (in this case, a Node.js server) running on your host machine.
