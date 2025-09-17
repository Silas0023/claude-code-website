# Claude Code 网站静态部署说明

## 🎉 构建完成

你的 Claude Code 网站已经成功构建完成！构建产物位于 `out` 目录中。

## 📦 部署内容

- **API 基础地址**: `https://ai01.zjczwl.cn`
- **构建输出**: `out` 目录包含完整的静态网站
- **部署方式**: 静态文件部署，支持任何静态文件托管服务

## 🚀 部署选项

### 方法 1: Nginx 静态文件部署

1. **上传 out 目录** 到你的服务器
   ```bash
   # 将 out 目录上传到服务器，例如：
   scp -r ./out/* user@your-server:/var/www/html/
   ```

2. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       # 处理 SPA 路由
       location / {
           try_files $uri $uri/ $uri.html /index.html;
       }

       # 缓存静态资源
       location /_next/static/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # 缓存图片
       location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

### 方法 2: Apache 静态文件部署

1. **上传文件到 Apache 目录**
   ```bash
   cp -r ./out/* /var/www/html/
   ```

2. **创建 .htaccess 文件**
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ /index.html [L]

   # 缓存设置
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
       ExpiresByType image/gif "access plus 1 year"
       ExpiresByType image/svg+xml "access plus 1 year"
   </IfModule>
   ```

### 方法 3: CDN 部署 (推荐)

支持的 CDN 平台：
- **Vercel**: 直接拖拽 `out` 文件夹到 Vercel 部署
- **Netlify**: 拖拽 `out` 文件夹或连接 Git 仓库
- **GitHub Pages**: 将 `out` 内容推送到 `gh-pages` 分支
- **阿里云 OSS**: 上传到 OSS 并开启静态网站托管
- **腾讯云 COS**: 上传到 COS 并开启静态网站功能

### 方法 4: Docker 部署

创建 Dockerfile：

```dockerfile
FROM nginx:alpine

# 复制静态文件
COPY out/ /usr/share/nginx/html/

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

创建 nginx.conf：
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

构建和运行：
```bash
docker build -t claude-code-website .
docker run -p 80:80 claude-code-website
```

## 🔧 环境配置

网站中的 API 基础地址已经配置为生产环境：
```javascript
// 默认使用生产环境 API
const baseUrl = 'https://ai01.zjczwl.cn'
```

如需修改 API 地址，可以在浏览器中通过以下方式：
```javascript
localStorage.setItem('api_base_url', 'your-api-url')
```

## 🌐 访问应用

- 部署后访问：`http://your-domain.com`
- 如果使用端口：`http://your-domain.com:port`

## 📋 功能确认

部署后请确认以下功能：

✅ 首页显示 "🎉 注册即可免费试用一天！" 横幅
✅ 导航栏按钮根据登录状态显示 "立即试用" 或 "控制台"
✅ 定价页面从 API 动态加载订阅方案
✅ 订阅ID为2的方案显示 "/周" 计费周期
✅ 联系我们页面显示微信群二维码
✅ 使用教程页面顶部显示 API Key
✅ API 请求指向 `https://ai01.zjczwl.cn`
✅ 所有页面正常加载和路由跳转

## 🛠️ 常见问题

### 1. 路由不工作
确保服务器配置了正确的重写规则，所有路由都指向 `index.html`

### 2. 静态资源 404
检查静态资源路径，确保 `_next` 目录正确部署

### 3. API 请求跨域
确保后端 API 配置了正确的 CORS 设置

### 4. 图片不显示
确保所有图片文件（如 `wxcode.jpg`）都正确上传到服务器

## 📞 技术支持

如有问题，请检查：
1. 服务器配置是否正确
2. 网络连接是否正常
3. API 接口是否可访问
4. 浏览器控制台是否有错误信息

## 🎯 部署优势

- **零服务器维护**: 纯静态文件，无需 Node.js 运行时
- **快速加载**: 预渲染的 HTML，首屏加载更快
- **CDN 友好**: 所有文件可缓存，全球加速
- **成本低廉**: 静态托管成本远低于服务器部署
- **高可用**: 静态文件服务稳定性更高

---

**恭喜！您的 Claude Code 网站已准备好部署！** 🎉