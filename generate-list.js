/**
 * 扫描当前目录下所有 .zip 资源包，生成 files.json
 * 用法: node generate-list.js
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const ALLOWED_EXTS = ['.zip'];

const files = fs.readdirSync(DIR)
    .filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ALLOWED_EXTS.includes(ext);
    })
    .map(f => {
        const fullPath = path.join(DIR, f);
        const stat = fs.statSync(fullPath);
        return {
            name: f,
            size: stat.size,
            lastModified: stat.mtime.toISOString()
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

fs.writeFileSync(
    path.join(DIR, 'files.json'),
    JSON.stringify(files, null, 2),
    'utf-8'
);

console.log(`✅ 已生成 files.json，共 ${files.length} 个资源包`);
files.forEach(f => console.log(`   - ${f.name}`));