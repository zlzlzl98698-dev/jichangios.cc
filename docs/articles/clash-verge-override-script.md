---
title: "Clash Verge Rev 全局覆写（Merge 与 Script）实战教程：锁定 AI 节点与自定义分流（2026）"
description: "详述 Clash Verge Rev 中 Merge（YAML 合并）与 Script（JavaScript 脚本覆写）执行顺序、prepend-rules 置顶语法、动态过滤无效信息节点、新建 AI-Dedicated 防风控固定策略组以及报错排查。"
date: 2026-11-20
updatedDate: 2026-11-20
category: "Clash 客户端"
tags:
  - Clash Verge 覆写
  - Mihomo
  - AI 分流
author: "机场苹果编辑部"
pageType: tutorial
searchIntent: informational
draft: false
affiliateDisclosure: false
faq:
  - q: "为什么直接点击编辑机场配置文件里修改的规则，过几天就全消失了？"
    a: "机场订阅开启自动更新（或你手动点更新）时，客户端会用远程拉回来的新 YAML 整体覆盖本地订阅源文件。想要修改永久保留，必须写在配置卡片右键的 Merge/Script 覆写，或「全局扩展覆写配置」中。"
  - q: "Merge（YAML 合并）与 Script（JavaScript）哪个优先执行？能解决什么不同问题？"
    a: "Merge 适合静态字段覆盖（如 prepend-rules 插队规则、覆盖 dns/tun 参数），语法简单不易写挂；Script 允许你用 JS 编程动态按正则筛选节点、重命名组、新建专组并插入 rules，适合跨不同机场通用规则增强。"
  - q: "写 Script 覆写时报错，导致整个配置图标变红、内核无法启动怎么办？"
    a: "90% 是规则引用的策略组名拼写和当前配置不一致（例如写死了 Proxy，但机场叫 节点选择），或者 JS 语法括号少写。建议在 Script 内优先自己新建并 push 专属策略组再引用，出问题可先在订阅列表关闭该扩展开关恢复。"
  - q: "prepend-rules 和 append-rules 有什么本质差异？"
    a: "Mihomo 规则是自上而下“首次命中即生效”。你想强行覆盖机场自带分流的规则（如把特定 AI/内网域改路线），必须用 prepend-rules 插到列表最顶部；只有做兜底拦截时才用 append-rules。"
related:
  - title: "Rule Provider 远程规则集配置指南"
    link: "/articles/clash-verge-rule-provider"
    description: "结合二进制规则集提升分流匹配速度与精度。"
    tag: "进阶"
  - title: "Clash 策略组类型详解"
    link: "/articles/clash-verge-proxy-groups-explained"
    description: "理解 select 与 url-test 在 AI 场景中的关键差异。"
    tag: "原理"
  - title: "Clash Verge Rev 订阅导入教程"
    link: "/guides/clash-verge-subscription-setup"
    description: "回到订阅导入与自动刷新基础配置。"
    tag: "基础"
---

# Clash Verge Rev 全局覆写（Merge 与 Script）实战教程

<TutorialPage
  quick-answer="永远不要直接修改订阅源文件——下次自动更新会把你的规则全部冲掉。正确做法是在 Clash Verge Rev 的「订阅右键 → 覆写（Merge / Script）」或「全局扩展配置」编写增量规则，让机场原订阅与个人定制永久解耦、互不覆盖。"
  applies-to="Clash Verge Rev (Windows / macOS / Linux)"
  verified-date="2026-11-20"
/>

## 一、Merge 覆写 vs Script 覆写怎么选？

| 对比项 | Merge（`.yaml` 合并） | Script（`.js` 脚本覆写） |
| :--- | :--- | :--- |
| **适用难度** | 低（写 YAML 配置键值即可） | 中（基础 JavaScript 函数） |
| **擅长能力** | 追加前置规则（`prepend-rules`）、替换 `dns`/`sniffer`/`tun` 全局字段 | **过滤无效节点名**、**动态按国家正择组装 AI 策略组**、跨多机场通用适配 |
| **生效范围** | 可绑定单个订阅，也可放进全局扩展配置 | 同左，可针对每份订阅单独开关或全局开启 |
| **常见踩坑** | `prepend-rules` 写死了某家机场才有的组名，换机场后报错 | 脚本逻辑漏写空值兜底 (`config.proxies || []`) |

---

## 二、实战场景 1：Merge 追加内网直连与指定站点分流

打开「全局扩展覆写配置 → 新建 Merge 文件」或右键当前订阅编辑 Merge 覆写。**务必使用 `prepend-rules`**，让你的规则排在机场规则最前面优先命中：

```yaml
# 1. 在机场原规则最顶端插队自定义分流
prepend-rules:
  # 公司内网、本地开发域名无条件直连
  - DOMAIN-SUFFIX,corp.internal,DIRECT
  - DOMAIN-SUFFIX,localtest.me,DIRECT
  # 屏蔽某个顽固广告/统计遥测域名
  - DOMAIN-SUFFIX,doubleclick.net,REJECT

# 2. 按需为原订阅补全本地隐私与 DNS 防污染拦截（会与订阅合并）
sniffer:
  enable: true
  parse-pure-ip: true
```

> 技巧：为什么上例只用了 `DIRECT` 和 `REJECT` 而没随便写 `🚀 节点选择`？因为 `DIRECT` 与 `REJECT` 是 Clash 内置关键字，换用任何一家机场都能零报错直接生效。如果你需要把某网站指去指定节点组，看下面“自动生成独立组”的 Script 做法！

---

## 三、实战场景 2：通用防崩 Script——清洗广告节点 + 锁定稳定 AI 专组

这份工程化 JS 模板解决三个核心痛点：**① 自动过滤掉“剩余流量 / 到期时间 / 官网”等伪节点**；**② 自动抽取所有新加坡、日本、美国节点生成独立 `AI-Dedicated`（`select` 模式防自动跳区风控）策略组**；**③ 自动插入 AI 域名规则最顶部且不会因机场组名不统一报错**。

```javascript
function main(config) {
  // 1. 过滤掉无效提示型伪节点，避免测速和面板杂乱
  const invalidRegex = /剩余|到期|官网|重置|流量|套餐|邀请|群组|频道/i;
  if (Array.isArray(config.proxies)) {
    config.proxies = config.proxies.filter(
      (p) => p && typeof p.name === 'string' && !invalidRegex.test(p.name)
    );
  }

  const allProxies = Array.isArray(config.proxies) ? config.proxies : [];

  // 2. 按关键词挑选适合 AI 的地区节点（避开常规不支持 OpenAI/Claude 的节点地区）
  const aiCandidates = allProxies
    .filter((p) => /新加坡|SG|Singapore|日本|JP|Japan|美国|US|America|台湾|TW/i.test(p.name))
    .map((p) => p.name);

  if (aiCandidates.length > 0 && Array.isArray(config['proxy-groups'])) {
    // 若原配置中尚未包含同名组再插入，防止多次重入
    const exists = config['proxy-groups'].some((g) => g && g.name === 'AI-Dedicated');
    if (!exists) {
      config['proxy-groups'].unshift({
        name: 'AI-Dedicated',
        type: 'select',
        proxies: aiCandidates
      });
    }

    // 3. 将 AI 核心域名置顶写入 rules
    const aiRules = [
      'DOMAIN-SUFFIX,openai.com,AI-Dedicated',
      'DOMAIN-SUFFIX,chatgpt.com,AI-Dedicated',
      'DOMAIN-SUFFIX,oaistatic.com,AI-Dedicated',
      'DOMAIN-SUFFIX,oaiusercontent.com,AI-Dedicated',
      'DOMAIN-SUFFIX,anthropic.com,AI-Dedicated',
      'DOMAIN-SUFFIX,claude.ai,AI-Dedicated',
      'DOMAIN-SUFFIX,gemini.google.com,AI-Dedicated',
      'DOMAIN-SUFFIX,perplexity.ai,AI-Dedicated'
    ];
    config.rules = [...aiRules, ...(Array.isArray(config.rules) ? config.rules : [])];
  }

  return config;
}
```

---

## 四、覆写调试与异常恢复

<TroubleshootingGuide
  title="编写 Merge/Script 后报错或生效异常排查"
  :cases="[
    {
      symptom: '保存并激活覆写后，右上角或订阅卡片变红报错 proxy group not found',
      cause: '规则目标策略组名称在当前订阅的 proxy-groups 中不存在。',
      solution: '先取消勾选该订阅右侧的扩展脚本让系统恢复正常连接，检查脚本生成的组名与 rules 引用名是否完全一字不差（含 emoji 和空格）。'
    },
    {
      symptom: '在 Script 写了新规则，但测试访问域名依然走了机场原规则',
      cause: '用 push 把规则加到了 config.rules 末尾，导致请求早在前面的机场自带规则（甚至 MATCH）就提前命中结束了。',
      solution: '切记使用前置插入：先写新规则再拼原规则（[...newRules, ...config.rules]），并在「连接 (Connections)」页查看实际命中的 Rule 行号验证。'
    },
    {
      symptom: '同时开启了全局扩展配置和单订阅覆写，不知道最终合成了什么样',
      cause: '多层级覆写叠加生效后参数不直观。',
      solution: '在当前高亮选中的订阅卡片右键 → 点击「运行配置 / Runtime Config（查看最终生效文件）」即可核对叠加后的完整 YAML 结果。'
    }
  ]"
/>

## 五、常见问题（FAQ）

<FAQSection
  title="Merge 与 Script 覆写 FAQ"
  :items="[
    {
      q: '为什么直接编辑订阅源配置文件会导致规则丢失？',
      a: '订阅更新机制是用服务器返回的全新 YAML 覆写本地源缓存文件；把自定义规则放到 Merge 或 Script 中，客户端会在每次拉回远程订阅后再自动套用你的扩展，互不覆盖。'
    },
    {
      q: '同一套 AI 策略脚本可以同时应用给多个机场订阅吗？',
      a: '可以。点击「全局扩展覆写配置」添加脚本并勾选激活，或者把它绑定到每一份需要的订阅上，上面这段脚本会自动适配不同机场的节点命名。'
    },
    {
      q: '如果在 Script 里想同时调整测速间隔，防止 url-test 组频繁切换怎么做？',
      a: '遍历 config 下的 proxy-groups 数组，找到 type 等于 url-test 的组并设置 g.tolerance = 80 与 g.interval = 600，即可一键全局稳定调优。'
    }
  ]"
/>
