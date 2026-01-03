# Deployment Guide - Dayflow HRMS

This guide covers how to deploy the Dayflow HRMS application to popular hosting platforms. Since Dayflow is currently a **Client-Side SPA (Single Page Application)** using Vite, it is very easy to deploy to static hosting services.

## 🚀 Option 1: Vercel (Recommended)

Vercel is optimized for frontend frameworks and offers the easiest deployment experience.

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Import Project**:
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click "Add New..." -> "Project".
    *   Import your `dayflow-hrms` repository.
3.  **Configure Build**:
    *   **Framework Preset**: Vite (should detect automatically)
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Deploy**: Click "Deploy". Vercel will build the app and provide a live URL.

## ⚡ Option 2: Netlify

1.  **Push to GitHub**.
2.  **New Site from Git**:
    *   Go to [Netlify](https://www.netlify.com/).
    *   Click "Add new site" -> "Import an existing project".
    *   Connect GitHub and pick your repo.
3.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
4.  **Deploy Site**.

### ⚠️ Important for SPA Routing (Netlify/Vercel)
If you face issues where refreshing a page gives a 404 error, you need to ensure all requests are redirected to `index.html`.
*   **Vercel**: Usually handles this automatically.
*   **Netlify**: Create a `_redirects` file in the `public/` folder with this content:
    ```
    /*  /index.html  200
    ```

## 🐳 Option 3: Docker (Containerized)

You can containerize the application using Nginx to serve the static files.

1.  **Create `Dockerfile`** in the root:

    ```dockerfile
    # Build Stage
    FROM node:18-alpine as build
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    # Production Stage
    FROM nginx:alpine
    COPY --from=build /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```

2.  **Build & Run**:
    ```bash
    docker build -t dayflow-hrms .
    docker run -p 8080:80 dayflow-hrms
    ```
    Access at `http://localhost:8080`.

## 📦 Building Locally

To create a production build locally:

```bash
npm run build
```

This will generate a `dist/` folder containing your optimized HTML, CSS, and JS files, ready to be served by any static server.
