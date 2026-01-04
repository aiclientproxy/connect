# ProxyCast Transit Service Provider Registry

[English](#english) | [中文](#中文)

---

## 中文

### 简介

这是 [ProxyCast](https://github.com/aiclientproxy/proxycast) 的中转服务商注册仓库。

中转商通过向此仓库提交 PR 来注册，审核通过后即可获得 ProxyCast Connect 一键配置功能。

### 为什么要注册？

注册后，您的用户可以：
- **一键配置** - 点击链接自动打开 ProxyCast 并配置好 API Key
- **品牌展示** - 在 ProxyCast 扩展市场展示您的品牌
- **统一管理** - 用户可以在 ProxyCast 中管理多个中转商的 Key

### 如何注册？

1. Fork 此仓库
2. 在 `providers/` 目录下创建 `{your-id}.json` 文件
3. 按照下方模板填写信息
4. 提交 PR
5. 等待审核（通常 1-3 个工作日）

### 配置文件模板

```json
{
  "id": "your-unique-id",
  "name": "您的中转站名称",
  "description": "一句话描述您的服务",
  
  "branding": {
    "logo": "https://your-domain.com/logo.png",
    "color": "#6366f1"
  },
  
  "links": {
    "homepage": "https://your-domain.com",
    "register": "https://your-domain.com/register",
    "recharge": "https://your-domain.com/recharge",
    "docs": "https://docs.your-domain.com",
    "status": "https://status.your-domain.com"
  },
  
  "api": {
    "base_url": "https://api.your-domain.com/v1",
    "protocol": "openai",
    "auth_header": "Authorization",
    "auth_prefix": "Bearer "
  },
  
  "contact": {
    "email": "support@your-domain.com"
  }
}
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 唯一标识，小写字母、数字、连字符，如 `my-relay` |
| `name` | ✅ | 显示名称，如 `我的中转站` |
| `description` | ✅ | 简短描述，≤50 字 |
| `branding.logo` | ✅ | Logo URL，256x256 PNG，透明背景 |
| `branding.color` | ❌ | 主题色，HEX 格式，默认 `#6366f1` |
| `links.homepage` | ✅ | 官网地址 |
| `links.register` | ❌ | 注册页面 |
| `links.recharge` | ❌ | 充值页面 |
| `links.docs` | ❌ | 文档地址 |
| `links.status` | ❌ | 状态页面 |
| `api.base_url` | ✅ | API 地址 |
| `api.protocol` | ✅ | 协议类型：`openai` 或 `anthropic` |
| `api.auth_header` | ❌ | 认证头，默认 `Authorization` |
| `api.auth_prefix` | ❌ | 认证前缀，默认 `Bearer ` |
| `contact.email` | ✅ | 联系邮箱 |

### 审核标准

- [ ] API 地址可访问且使用 HTTPS
- [ ] Logo 图片可访问
- [ ] 协议兼容 OpenAI 或 Anthropic
- [ ] 信息真实有效

### 注册后如何使用？

审核通过后，您可以在用户后台添加一键配置按钮：

```html
<a href="proxycast://connect?relay=your-id&key=USER_API_KEY">
  一键配置 ProxyCast
</a>
```

详细集成文档请参考 [ProxyCast Connect 文档](https://github.com/aiclientproxy/proxycast/blob/main/docs/prd/proxycast-connect.md)

---

## English

### Introduction

This is the Transit Service Provider registry for [ProxyCast](https://github.com/aiclientproxy/proxycast).

Transit providers can register by submitting a PR to this repository. Once approved, you'll get access to ProxyCast Connect one-click configuration feature.

### Why Register?

After registration, your users can:
- **One-click setup** - Click a link to automatically open ProxyCast and configure API Key
- **Brand display** - Show your brand in ProxyCast extension marketplace
- **Unified management** - Users can manage multiple providers' keys in ProxyCast

### How to Register?

1. Fork this repository
2. Create `{your-id}.json` file in `providers/` directory
3. Fill in the information according to the template below
4. Submit a PR
5. Wait for review (usually 1-3 business days)

### Configuration Template

See the Chinese section above for the JSON template.

### After Registration

Once approved, you can add a one-click configuration button in your user dashboard:

```html
<a href="proxycast://connect?relay=your-id&key=USER_API_KEY">
  One-click ProxyCast Setup
</a>
```

---

## License

MIT
