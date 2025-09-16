# Claude Code 网站部署说明

## 🎉 构建完成

你的 Claude Code 网站已经成功构建完成！构建产物位于 `dist` 目录中。

## 📦 部署内容

- **API 基础地址已更新**: `https://ai01.zjczwl.cn`
- **构建输出**: `dist` 目录包含完整的生产环境应用
- **部署方式**: 使用 Next.js standalone 模式，包含内置服务器

## 🚀 部署步骤

### 方法 1: 直接部署到服务器

1. **上传 dist 目录** 到你的服务器
   ```bash
   # 将 dist 目录上传到服务器，例如：
   scp -r ./dist user@your-server:/path/to/your/app
   ```

2. **在服务器上运行**
   ```bash
   cd /path/to/your/app/dist

   # 安装生产依赖（如果需要）
   npm install --production

   # 启动应用
   node server.js
   ```

3. **使用 PM2 守护进程（推荐）**
   ```bash
   # 安装 PM2
   npm install -g pm2

   # 启动应用
   pm2 start server.js --name claude-code-website

   # 保存 PM2 配置
   pm2 save
   pm2 startup
   ```

### 方法 2: 使用 Docker 部署

创建 Dockerfile：

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制构建产物
COPY dist ./

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
```

构建和运行：
```bash
docker build -t claude-code-website .
docker run -p 3000:3000 claude-code-website
```

### 方法 3: 使用 Nginx 反向代理

1. **启动 Node.js 应用**（如上所述）

2. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 环境变量

如果需要设置环境变量，在服务器上创建 `.env.local` 文件：

```env
# API 基础地址（可选，已在代码中设置）
NEXT_PUBLIC_API_BASE_URL=https://ai01.zjczwl.cn

# 其他环境变量...
```

## 🌐 访问应用

- 应用默认运行在 **3000 端口**
- 访问地址：`http://your-server-ip:3000`
- 如果使用 Nginx：`http://your-domain.com`

## 📋 功能确认

部署后请确认以下功能：

✅ 首页显示 "🎉 注册即可免费试用一天！" 横幅
✅ 导航栏和按钮文案为 "立即试用"
✅ 点击试用按钮跳转到登录页面
✅ API 请求指向 `https://ai01.zjczwl.cn`
✅ 所有页面正常加载

## 🛠️ 常见问题

### 1. 端口被占用
```bash
# 查看端口占用
lsof -i :3000

# 杀死占用进程
kill -9 <PID>
```

### 2. 权限问题
```bash
# 确保文件有执行权限
chmod +x server.js
```

### 3. Node.js 版本要求
- 最低要求：Node.js 18+
- 推荐：Node.js 18 LTS 或更高版本

## 📞 技术支持

如有问题，请检查：
1. Node.js 版本是否符合要求
2. 网络连接是否正常
3. 服务器防火墙设置
4. API 接口是否可访问

---

**恭喜！您的 Claude Code 网站已准备好部署！** 🎉