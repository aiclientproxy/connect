#!/usr/bin/env node

/**
 * 检查 API 地址是否可访问
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 获取所有 provider 配置文件
const providersDir = path.join(__dirname, '../providers');
const files = fs.readdirSync(providersDir)
  .filter(f => f.endsWith('.json') && !f.startsWith('_'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      // 2xx 或 4xx 都算可访问（4xx 可能是需要认证）
      resolve(res.statusCode < 500);
    });
    
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  let hasError = false;
  
  for (const file of files) {
    const filePath = path.join(providersDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    console.log(`\n检查 ${data.name} (${data.id}):`);
    
    // 检查 API 地址
    const apiUrl = data.api.base_url;
    const apiOk = await checkUrl(apiUrl);
    if (apiOk) {
      console.log(`  ✅ API: ${apiUrl}`);
    } else {
      console.log(`  ⚠️ API 不可访问: ${apiUrl}`);
      // API 不可访问只是警告，不阻止合并
    }
    
    // 检查 Logo
    const logoUrl = data.branding.logo;
    const logoOk = await checkUrl(logoUrl);
    if (logoOk) {
      console.log(`  ✅ Logo: ${logoUrl}`);
    } else {
      console.log(`  ❌ Logo 不可访问: ${logoUrl}`);
      hasError = true;
    }
    
    // 检查官网
    const homepageUrl = data.links.homepage;
    const homepageOk = await checkUrl(homepageUrl);
    if (homepageOk) {
      console.log(`  ✅ Homepage: ${homepageUrl}`);
    } else {
      console.log(`  ⚠️ Homepage 不可访问: ${homepageUrl}`);
    }
  }
  
  if (hasError) {
    console.log('\n❌ 存在必须修复的问题');
    process.exit(1);
  }
  
  console.log('\n✅ 检查完成');
}

main();
