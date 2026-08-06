async function trackUniqueVisitor() {
    const countElement = document.getElementById('visitor-count');
    
    try {
        // 1. FingerprintJS से Unique Visitor ID निकालें
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const visitorId = result.visitorId;

        // 2. Check LocalStorage
        const savedVisitor = localStorage.getItem('portfolio_visitor_id');

        // अपने नाम का एक यूनिक स्पेस (Workspace Name)
        const namespace = "kamlesh-kumar-portfolio-2026";
        const key = "views";

        if (savedVisitor !== visitorId) {
            // नया Visitor -> Hit API (+1 Increment)
            const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            const data = await response.json();
            
            if (data && data.count) {
                countElement.innerText = data.count;
                localStorage.setItem('portfolio_visitor_id', visitorId);
            }
        } else {
            // पुराना Visitor -> Read Only (Get Current Count)
            const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/`);
            const data = await response.json();
            
            if (data && data.count) {
                countElement.innerText = data.count;
            }
        }
    } catch (error) {
        console.error("Counter Error:", error);
        if (countElement) {
            countElement.innerText = "1";
        }
    }
}

document.addEventListener('DOMContentLoaded', trackUniqueVisitor);
