#!/usr/bin/env node

/**
 * 验证 providers/ 目录下的 JSON 配置文件
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// 加载 Schema
const schemaPath = path.join(__dirname, '../schema/provider.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const validate = ajv.compile(schema);

// 获取所有 provider 配置文件
const providersDir = path.join(__dirname, '../providers');
const files = fs.readdirSync(providersDir)
  .filter(f => f.endsWith('.json') && !f.startsWith('_'));

let hasError = false;

for (const file of files) {
  const filePath = path.join(providersDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  let data;
  try {
    data = JSON.parse(content);
  } catch (e) {
    console.error(`❌ ${file}: JSON 解析错误 - ${e.message}`);
    hasError = true;
    continue;
  }
  
  // 验证文件名与 id 一致
  const expectedId = path.basename(file, '.json');
  if (data.id !== expectedId) {
    console.error(`❌ ${file}: 文件名与 id 不一致 (文件名: ${expectedId}, id: ${data.id})`);
    hasError = true;
  }
  
  // 验证 Schema
  const valid = validate(data);
  if (!valid) {
    console.error(`❌ ${file}: Schema 验证失败`);
    for (const error of validate.errors) {
      console.error(`   - ${error.instancePath}: ${error.message}`);
    }
    hasError = true;
  } else {
    console.log(`✅ ${file}: 验证通过`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log('\n✅ 所有配置文件验证通过');
