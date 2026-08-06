// Unique Visitor Counter Script using FingerprintJS
async function trackUniqueVisitor() {
    const countElement = document.getElementById('visitor-count');
    
    try {
        // 1. FingerprintJS से यूज़र की यूनिक ID प्राप्त करें
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const visitorId = result.visitorId;

        // 2. चेक करें कि क्या इस डिवाइस/ब्राउज़र में यह ID पहले से सेव है?
        const savedVisitor = localStorage.getItem('portfolio_visitor_id');

        if (savedVisitor !== visitorId) {
            // नया Unique User है -> Count API hit करके +1 करें
            const response = await fetch('https://api.countapi.xyz/hit/kamlesh-kumar-portfolio/views');
            const data = await response.json();
            
            countElement.innerText = data.value;
            // LocalStorage में ID सेव करें
            localStorage.setItem('portfolio_visitor_id', visitorId);
        } else {
            // वही यूज़र है -> बिना +1 किए सिर्फ मौजूदा Count लें
            const response = await fetch('https://api.countapi.xyz/get/kamlesh-kumar-portfolio/views');
            const data = await response.json();
            
            countElement.innerText = data.value;
        }
    } catch (error) {
        console.error("Counter Error:", error);
        if (countElement) {
            countElement.innerText = "1";
        }
    }
}

// HTML लोड होते ही यह फ़ंक्शन चलेगा
document.addEventListener('DOMContentLoaded', trackUniqueVisitor);