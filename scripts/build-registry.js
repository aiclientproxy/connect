#!/usr/bin/env node

/**
 * 构建中转商注册表
 * 将所有 providers/*.json 合并为一个 registry.json
 * 用于 ProxyCast 客户端加载
 */

const fs = require('fs');
const path = require('path');

const providersDir = path.join(__dirname, '../providers');
const outputPath = path.join(__dirname, '../dist/registry.json');

// 获取所有 provider 配置文件
const files = fs.readdirSync(providersDir)
  .filter(f => f.endsWith('.json') && !f.startsWith('_'));

const providers = [];

for (const file of files) {
  const filePath = path.join(providersDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  providers.push(data);
}

// 按名称排序
providers.sort((a, b) => a.name.localeCompare(b.name));

const registry = {
  version: new Date().toISOString().split('T')[0],
  updated_at: new Date().toISOString(),
  providers: providers
};

// 确保 dist 目录存在
const distDir = path.dirname(outputPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));

console.log(`✅ 已生成 registry.json，包含 ${providers.length} 个中转商`);
