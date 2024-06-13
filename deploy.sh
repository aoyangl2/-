#!/bin/bash

# 编译 React 应用
npm run build

# 上传文件到服务器
scp -r build/* root@120.26.81.229:/usr/share/nginx/html/

echo "部署完成"
