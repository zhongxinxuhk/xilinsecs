// -------------------- 全局页脚配置部分 --------------------
window.siteConfig = {
    footer: {
        brand: {
            logo: "/source/imgs/logo.png",
            name: "HK XSEC",
            description: "致力于提供专业的信息化解决方案,助力企业数字化转型升级。"
        },
        links: [
            {
                title: "关于我们",
                items: [
                    { text: "企业简介", href: "/leadership/me/" },
                    { text: "职业机会", href: "/careers/cn/" },
                    { text: "领导团队", href: "/leadership/me/lead/" },
                    { text: "隐私政策", href: "/legal/privacy/" }
                ]
            },
            {
                title: "资源",
                items: [
                    { text: "IOA保密办公", href: "/source/ztsm/" },
                    { text: "ZTNA跨境办公", href: "/source/ssrc/cf-sec-hn-cn/" },
                    { text: "MD5在线校验", href: "/business/services/g/md5check.html" },
                    { text: "软件资产S3", href: "https://user-ocloud.ihep.ac.cn/share/15328d44-91cc-40ce-9e17-022ff934be16?pwd=340854" },
                ]
            },
            {
                title: "星际网络应用",
                items: [
                    { text: "云效Ops", href: "https://devops.aliyun.com/workbench?orgId=690f52c666aca23eccbe7d4c" },
                    { text: "配置镜像仓库", href: "https://packages.sec.hn.cn/" }
                ]
            },
            {
                title: "联系我们",
                items: [
                    { text: "客服咨询", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af", target: "_blank" },
                    { text: "商务合作", href: "/business/services/c/need.html", target: "_blank" },
                    { text: "客户服务", href: "/business/services/c/", target: "_blank" }
                ]
            },
            {
                title: "社交媒体",
                items: [
                    { text: "抖音", href: "https://v.douyin.com/9N7akmvVn1Q/", target: "_blank" },
                ]
            },
            {
                title: "友情链接",
                items: [
                    { text: "海软计小智", href: "https://hncst-jxz.sec.hn.cn/" },
                    { text: "民选甄企", href: "https://community.sec.hn.cn/" },
                    { text: "订阅格式转换", href: "https://zjdyzh.xinnew.top/" }
                ]
            }
        ],
        copyright: "© 2025—2026 sec.hn.cn 版权所有",
        extra: {
            ipv6: "本站支持IPv6",
            license: {
                buttonText: "查验证件",
                verifyUrl: "https://e-register.amr.hainan.gov.cn:17089/#/?qyxx=I8%20HAEmgoR6TVmokEB2TW1jqNWu%2F6cwhlApRTM7toGszlRcs6ZUi30MySmjBAtsgtZrbljvmf6FmOfpPbwlMUXvXAKOaWdJBSpMNk53TLb0OV2l7K2tyrV5eL%20ru5FxZeM%20zBV09hFpPXdWTrE13jYyjlD6xSGFbyQCUx1f3M4I%3D"
            }
        }
    }
};

// -------------------- 样式注入 --------------------
const footerStyle = `
.footer {
    background: linear-gradient(135deg, #1d1d1f 0%, #111 100%);
    color: #f5f5f7;
    padding: 40px 20px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}
.footer::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(10,132,255,0.08), transparent 70%);
    pointer-events: none;
    animation: moveBG 20s linear infinite;
}
@keyframes moveBG {
    0% { transform: translate(0,0); }
    50% { transform: translate(20px,10px); }
    100% { transform: translate(0,0); }
}
.footer h3, .footer h4 {
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 16px;
}
.footer h3 img {
    height: 24px;
    margin-right: 8px;
    vertical-align: middle;
}
.footer p {
    color: #d1d1d6;
    font-size: 14px;
    line-height: 1.5;
}
.footer ul {
    padding: 0;
    list-style: none;
    margin: 0;
}
.footer ul li {
    margin-bottom: 12px;
}
.footer ul li a {
    color: #d1d1d6;
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    transition: all 0.3s ease, transform 0.2s ease;
}
.footer ul li a:hover {
    color: #0a84ff;
    transform: translateY(-2px);
}
.footer ul li a.disabled-link {
    cursor: not-allowed;
    opacity: 0.5;
}
.footer ul li a.disabled-link:hover {
    color: #d1d1d6;
    transform: none;
}
.footer-bottom a { color:#8e8e93; text-decoration:none; }
.footer-bottom a:hover { color:#8e8e93; }
.footer-bottom {
    text-align: center;
    border-top: 1px solid #2c2c2e;
    margin-top: 30px;
    padding-top: 15px;
    font-size: 13px;
    color: #8e8e93;
}
.footer-bottom p {
    overflow-wrap: anywhere;
}
.footer-extra-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin: 12px 0;
    flex-wrap: wrap;
}
.footer-extra-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    max-width: 100%;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    font-size: 13px;
    color: #8e8e93;
    transition: all 0.2s ease;
}
.footer-extra-links a:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #0a84ff;
}
.footer .row {
    display: grid;
    grid-template-columns: minmax(220px, 1.3fr) repeat(3, minmax(150px, 1fr));
    gap: 24px;
    align-items: start;
}
.footer .col {
    min-width: 0;
}
.footer-brand {
    max-width: 320px;
}
.footer .footer-section h4 {
    position: relative;
    padding-right: 18px;
}
.footer .footer-section h4::after {
    content: '▼';
    position: absolute;
    right: 0;
    transition: transform 0.3s ease;
    display: none;
}
.footer .footer-section.collapsed h4::after {
    transform: rotate(-90deg);
}
.footer .footer-section ul {
    display: block;
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.5s ease;
}
.footer .footer-section.collapsed ul {
    max-height: 0;
}
@keyframes fadeIn {
    from { opacity:0; transform:translateY(10px); }
    to { opacity:1; transform:translateY(0); }
}
@keyframes fadeInUp {
    from { opacity:0; transform:translateY(20px); }
    to { opacity:1; transform:translateY(0); }
}
.footer-brand {
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
}
.footer-section {
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
}
.footer-section:nth-child(2) { animation-delay: 0.1s; }
.footer-section:nth-child(3) { animation-delay: 0.15s; }
.footer-section:nth-child(4) { animation-delay: 0.2s; }
.footer-section:nth-child(5) { animation-delay: 0.25s; }
.footer-section:nth-child(6) { animation-delay: 0.3s; }
.footer-section:nth-child(7) { animation-delay: 0.35s; }
.footer-bottom {
    opacity: 0;
    animation: fadeIn 0.8s ease forwards;
    animation-delay: 0.4s;
}
.footer-ip-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    font-size: 13px;
    color: #8e8e93;
}
.footer-ip-info .ip-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}
.footer-ip-info .ip-separator {
    color: #555;
}
.footer-ip-info .loader {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #0a84ff;
    border-radius: 50%;
    animation: pulse 1.5s infinite ease-in-out;
    vertical-align: middle;
}
@keyframes pulse {
    0% { transform: scale(0.9); opacity:0.6; }
    50% { transform: scale(1.3); opacity:1; }
    100% { transform: scale(0.9); opacity:0.6; }
}
@media (max-width:768px){
    .footer .row{grid-template-columns:1fr;}
    .footer .col{min-width:0;}
    .footer-brand{grid-column:auto; max-width:none;}
    .footer .footer-section h4::after{display:block;}
    .footer-extra-links{gap:10px;}
    .footer-bottom p{overflow-wrap:anywhere;}
    .footer-bottom p > span{display:inline-block; margin:2px 0;}
    .footer-extra-links a{max-width:100%; justify-content:center;}
}
@media (max-width:520px){
    .footer{padding:32px 14px 18px;}
    .footer-bottom{font-size:12px;}
    .footer-extra-links{flex-direction:column; align-items:stretch;}
    .footer-ip-info{align-items:center;}
}
@media (max-width:1200px){
    .footer .row{grid-template-columns:repeat(3, minmax(0, 1fr));}
    .footer-brand{grid-column:1 / -1; max-width:420px;}
}
@media (max-width:900px){
    .footer .row{grid-template-columns:repeat(2, minmax(0, 1fr));}
}
@media (max-width:768px){
    .footer{padding:32px 14px 18px;}
    .footer .row{grid-template-columns:1fr;}
}
@media (max-width:480px){
    .footer-extra-links{display:grid; grid-template-columns:1fr;}
    .footer-ip-info{justify-content:flex-start; text-align:left;}
}
/* 亮证弹窗样式 */
.license-modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.license-modal-overlay.show {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
}
.license-modal {
    background: #1d1d1f;
    border-radius: 16px;
    max-width: 90%;
    max-height: 90%;
    width: 800px;
    max-height: 90vh;
    overflow: hidden;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}
.license-modal-overlay.show .license-modal {
    transform: scale(1);
}
.license-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #2c2c2e;
    background: linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 100%);
}
.license-modal-header h3 {
    margin: 0;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
}
.license-modal-close {
    width: 32px;
    height: 32px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #8e8e93;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}
.license-modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}
.license-modal-body {
    padding: 24px;
    max-height: calc(90vh - 140px);
    overflow-y: auto;
}
.license-pdf-viewer {
    width: 100%;
    height: 500px;
    border: none;
    border-radius: 8px;
    background: #000;
}
.license-modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #2c2c2e;
    background: #1a1a1c;
}
.license-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}
.license-md5 {
    color: #8e8e93;
    font-size: 13px;
}
.license-md5 code {
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    color: #0a84ff;
    font-family: monospace;
}
.license-verify-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #0a84ff 0%, #0066cc 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
}
.license-verify-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(10, 132, 255, 0.4);
}
.license-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.1);
    color: #d1d1d6;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-left: 12px;
}
.license-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
}
@media (max-width: 768px) {
    .license-modal {
        max-width: 95%;
        max-height: 85vh;
    }
    .license-pdf-viewer {
        height: 400px;
    }
    .license-info {
        flex-direction: column;
        align-items: flex-start;
    }
    .license-btn {
        margin-left: 0;
        margin-top: 12px;
    }
}
`;

function ensureCompatStyles() {
    const href = "/source/compat.css";
    const hasCompat = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => {
        const attr = link.getAttribute('href') || '';
        return attr === href || attr.endsWith('/source/compat.css') || attr.endsWith('source/compat.css');
    });
    if (hasCompat) return;

    const compatLink = document.createElement('link');
    compatLink.rel = 'stylesheet';
    compatLink.href = href;
    document.head.appendChild(compatLink);
}

ensureCompatStyles();

const styleTag = document.createElement('style');
styleTag.innerHTML = footerStyle;
document.head.appendChild(styleTag);

// -------------------- 渲染页脚 --------------------
function renderFooter(containerId = "site-footer") {
    const container = document.getElementById(containerId);
    if(!container || !window.siteConfig || !window.siteConfig.footer) return;

    const cfg = window.siteConfig.footer;

    // 动态备案和站点类别
    const hostname = window.location.hostname;
    const domesticDomains = ["sec.hn.cn", "www.sec.hn.cn"];
    const internationalDomains = ["xinnew.top", "www.xinnew.top",];
    let siteType = '';
    let icpNumber = '';
    let icpLink = '';
    let mpsNumber = '';
    let mpsLink = '';
    if(domesticDomains.includes(hostname)){
        siteType="中国站 - 已支持IPv6"; 
        icpNumber="琼ICP备2025060601号-1";
        icpLink="https://beian.miit.gov.cn/";
        mpsNumber="琼公网安备46010002001548号";
        mpsLink="https://beian.mps.gov.cn/#/query/webSearch?code=46010002001548";
    } else if(internationalDomains.includes(hostname)){
        siteType="国际站 - 已支持IPv6"; 
        icpNumber="琼ICP备2025060601号-2";
        icpLink="https://beian.miit.gov.cn/";
        mpsNumber="琼公网安备46010002001548号";
        mpsLink="https://beian.mps.gov.cn/#/query/webSearch?code=46010002001548";
    } else {
        siteType="非官方站点"; 
        icpNumber="非官方站点";
        icpLink="";
    }
    cfg.siteType = siteType;
    cfg.icpNumber = icpNumber;
    cfg.icpLink = icpLink;
    cfg.mpsNumber = mpsNumber;
    cfg.mpsLink = mpsLink;

    // 渲染 HTML
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="row footer-top">
                <div class="col footer-brand">
                    <h3>${cfg.brand.logo ? `<img src="${cfg.brand.logo}" alt="${cfg.brand.name} Logo">` : ""}${cfg.brand.name}</h3>
                    <p>${cfg.brand.description}</p>
                </div>
                ${cfg.links.map(section => `
                    <div class="col footer-section">
                        <h4>${section.title}</h4>
                        <ul>
                            ${section.items.map(item => {
                                const classes = [];
                                if (item.class) classes.push(item.class);
                                if (item.disabled) classes.push('disabled-link');
                                return `<li><a href="${item.href || 'javascript:void(0)'}" ${item.target ? `target="${item.target}"` : ""} ${classes.length ? `class="${classes.join(' ')}"` : ""} ${item.disabled ? 'onclick="return false;"' : ''} rel="noopener noreferrer">${item.text}</a></li>`;
                            }).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
            <div class="footer-bottom">
                <p>${cfg.copyright}</p>
                <p class="footer-extra-links">
                    <a href="${cfg.extra.license.verifyUrl}" target="_blank" rel="noopener noreferrer"><i class="fas fa-certificate"></i> ${cfg.extra.license.buttonText}</a>
                    <a href="https://www.12377.cn/" target="_blank" rel="noopener noreferrer"><i class="fas fa-exclamation-triangle"></i> 互联网违法信息举报</a>
                </p>
                <p><span class="footer-icp">${cfg.icpLink ? `<a href="${cfg.icpLink}" target="_blank" rel="noopener noreferrer">${cfg.icpNumber}</a>` : cfg.icpNumber}</span>${cfg.mpsNumber ? ` | <span class="footer-mps"><a href="${cfg.mpsLink}" target="_blank" rel="noopener noreferrer">${cfg.mpsNumber}</a></span>` : ""} | <span class="footer-site-type">${cfg.siteType}</span></p>
                <p class="footer-ip-info"></p>
            </div>
        </div>
    </footer>
    `;
    container.innerHTML = footerHTML;
    container.querySelectorAll('.footer-section ul').forEach(ul => {
        ul.style.overflow = 'hidden';
        ul.style.transition = 'none';
    });

    // -------------------- 移动端折叠栏目逻辑 --------------------
    const sections = container.querySelectorAll('.footer-section');
    function updateLayout(){
        sections.forEach(sec=>{
            const list = sec.querySelector('ul');
            sec.classList.remove('collapsed');
            list.style.maxHeight=list.scrollHeight+"px";
        });
    }
    
    // 首次布局后启用动画
    updateLayout();
    requestAnimationFrame(() => {
        container.querySelectorAll('.footer-section ul').forEach(ul => {
            ul.style.transition = 'max-height 0.5s ease';
        });
    });
    
    // 点击切换移动端折叠
    sections.forEach(sec => {
        const header = sec.querySelector('h4');
        const list = sec.querySelector('ul');
        header.addEventListener('click', () => {
            if (window.innerWidth > 768) return;
            const isCollapsed = sec.classList.contains('collapsed');
            if (isCollapsed) {
                sec.classList.remove('collapsed');
                list.style.maxHeight = list.scrollHeight + "px";
            } else {
                sec.classList.add('collapsed');
                list.style.maxHeight = 0;
            }
        });
    });
    
    window.addEventListener('resize', updateLayout);

    // -------------------- 获取访问者 IP 信息 --------------------
    const ipInfoElem = container.querySelector('.footer-ip-info');
    if(ipInfoElem){
        function updateIP(){
            ipInfoElem.innerHTML = '<span class="loader"></span> 正在获取您的 IP 信息...（'+cfg.extra.ipv6+'）';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            fetch('https://api.ip.sb/geoip/', { signal: controller.signal })
                .then(res => res.json())
                .then(data => {
                    clearTimeout(timeoutId);
                    const ip = data.ip || '未知';
                    const country = data.country || '未知';
                    const region = data.region || '';
                    const isp = data.isp || '未知';
                    const timezone = data.timezone || '未知';
                    let ipv4 = '', ipv6 = '';
                    if (ip.includes(':')) {
                        ipv6 = ip;
                    } else {
                        ipv4 = ip;
                    }
                    const ipParts = [];
                    if (ipv4) ipParts.push(`IPv4: ${ipv4}`);
                    if (ipv6) ipParts.push(`IPv6: ${ipv6}`);
                    if (ipParts.length === 0) ipParts.push('IP: 未知');
                    const sep = '<span class="ip-separator">|</span>';
                    ipInfoElem.innerHTML = ipParts.join(sep) + sep + `地区: ${country} ${region}` + sep + `ISP: ${isp}` + sep + `时区: ${timezone}`;
                })
                .catch(err => {
                    clearTimeout(timeoutId);
                    if (err.name === 'AbortError') {
                        ipInfoElem.innerText = 'IP 获取超时 （本站支持 IPv6）';
                    } else {
                        ipInfoElem.innerText = '无法获取 IP 信息 （本站支持 IPv6）';
                    }
                    console.error('IP 获取失败', err);
                });
        }
        updateIP();
    }
}

if (document.readyState !== 'loading') {
    renderFooter("site-footer");
} else {
    document.addEventListener('DOMContentLoaded',()=>renderFooter("site-footer"), { once: true });
}
