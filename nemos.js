
document.addEventListener("DOMContentLoaded", () => {
    const qhdElementsToShow = [
        ["fix_left_sidebar_DIV_qhd", "fix_left_sidebar_1_qhd"],
        ["fix_left_sidebar_2_qhd"],
        ["fix_left_sidebar_3_qhd"],
        ["fix_right_sidebar_DIV_qhd", "fix_right_sidebar_1_qhd"],
        ["fix_right_sidebar_2_qhd", "fix_bottom_qhd"],
        ["fix_scroll_sidebar_DIV_qhd", "fix_scroll_sidebar_1_qhd"],
    ];

    const fhdElementsToShow = [
        ["fix_left_sidebar_DIV_fhd", "fix_left_sidebar_1_fhd"],
        ["fix_left_sidebar_2_fhd"],
        ["fix_right_sidebar_DIV_fhd", "fix_right_sidebar_1_fhd"],
        ["fix_right_sidebar_2_fhd", "fix_bottom_fhd"],
        ["fix_scroll_sidebar_DIV_fhd", "fix_scroll_sidebar_1_fhd", "fix_scroll_sidebar_2_fhd"],
    ];

    const half_qhdElementsToShow = [
        ["fix_scroll_sidebar_DIV_fhd", "fix_scroll_sidebar_1_fhd", "fix_scroll_sidebar_2_fhd", "fix_bottom_fhd"],
    ];

    const isQHD = window.innerWidth >= 1700;
    const isFHD = window.innerWidth >= 1450 && window.innerWidth < 1700;
    const isQHD_half = window.innerWidth >= 750 && window.innerWidth < 1450;

    const scrollThresholds = [10, 20, 30, 35, 40, 45, 50, 55];
    let shownElements = 0;
    let elementsToShow = isQHD ? qhdElementsToShow : (isFHD ? fhdElementsToShow : (isQHD_half ? half_qhdElementsToShow : [] ));
    const adTimers = {};  

    function insertAdCode(adElement, id) {
        
        const adConfig = {
            'fix_left_sidebar_1_qhd': {width: 336, height: 280, slot: '4645534662'},
            'fix_left_sidebar_2_qhd': {width: 336, height: 280, slot: '4645534662'},
            'fix_right_sidebar_1_qhd': {width: 300, height: 600, slot: '6375708871'},
            'fix_right_sidebar_2_qhd': {width: 300, height: 250, slot: '1646126373'},
            'fix_bottom_qhd': {width: 728, height: 90, slot: '7242067984'},
            'fix_left_sidebar_1_fhd': {width: 160, height: 600, slot: '1816682616'},
            'fix_right_sidebar_1_fhd': {width: 160, height: 600, slot: '1816682616'},
            'fix_bottom_fhd': {width: 728, height: 90, slot: '7242067984'},
            'fix_scroll_sidebar_1_qhd': {width: 300, height: 600, slot: '3054989507'}, 
            'fix_scroll_sidebar_1_fhd': {width: 300, height: 250, slot: '9428826160'},
            'fix_scroll_sidebar_2_fhd': {width: 300, height: 250, slot: '9428826160'} 
        };

        if ((isQHD && id.includes('_fhd')) || (isFHD && id.includes('_qhd'))) return;

        const {width, height, slot} = adConfig[id] || {};
        if (!width || !height || !slot) return;

        adElement.innerHTML = ''; 

        const insTag = document.createElement("ins");
        insTag.className = "adsbygoogle";
        insTag.style.display = "inline-block";
        insTag.style.width = `${width}px`;
        insTag.style.height = `${height}px`;
        insTag.setAttribute("data-ad-client", "ca-pub-3335664859671214");
        insTag.setAttribute("data-ad-slot", slot);

        adElement.appendChild(insTag);

        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`AdSense code added to ${id}`);

        setTimeout(() => {
            if (!adTimers[id]) {
                adTimers[id] = true;
                insertAdCode(adElement, id);  
                console.log(`AdSense code refreshed for ${id} after 10 seconds`);
            }
        }, 30000);
    }

      elementsToShow.flat().forEach(id => {
          const adElement = document.getElementById(id);

          if (adElement && adElement.classList.contains('script_add_ads')) {
              const observer = new MutationObserver(() => {
                  if (window.getComputedStyle(adElement).display === "block" && !adTimers[id]) {
                      insertAdCode(adElement, id);
                  }
              });
              observer.observe(adElement, { attributes: true, attributeFilter: ['style'] });
          }
      });

    window.addEventListener("scroll", () => {
        const scrollPosition = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

        if (shownElements < elementsToShow.length && scrollPosition >= scrollThresholds[shownElements]) {
            elementsToShow[shownElements].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = "block";
                }
            });
            shownElements++;
        }
    });

    const sidebarQhd = document.getElementById('fix_scroll_sidebar_DIV_qhd');
    const sidebarFhd = document.getElementById('fix_scroll_sidebar_DIV_fhd');

    const sidebarQhdOffsetTop = sidebarQhd?.offsetTop || 0;
    const sidebarFhdOffsetTop = sidebarFhd?.offsetTop || 0;

    const sidebar_1_qhd = document.getElementById('fix_scroll_sidebar_1_qhd');
    const sidebar_1_fhd = document.getElementById('fix_scroll_sidebar_1_fhd');
    const sidebar_2_fhd = document.getElementById('fix_scroll_sidebar_2_fhd');

    const sidebarOffsetTop = (sidebarQhd || sidebarFhd)?.offsetTop || 0;

    function checkSidebarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop >= (isQHD ? sidebarQhdOffsetTop : sidebarFhdOffsetTop)) {
            if (isQHD && sidebarQhd) {
                sidebarQhd.style.position = 'fixed';
            }
            if ((isFHD || isQHD_half) && sidebarFhd) {
                sidebarFhd.style.position = 'fixed';
            }
        } else {
            if (isQHD && sidebarQhd) sidebarQhd.style.position = '';
            if ((isFHD || isQHD_half) && sidebarFhd) sidebarFhd.style.position = '';
        }
    }

    function loadAdsForResolution() {
        if (isQHD) {
            if (sidebar_1_qhd && !adTimers['fix_scroll_sidebar_1_qhd']) {
                insertAdCode(sidebar_1_qhd, 'fix_scroll_sidebar_1_qhd');
            }
        } 
        if (isFHD || isQHD_half) {
            if (sidebar_1_fhd && !adTimers['fix_scroll_sidebar_1_fhd']) {
                insertAdCode(sidebar_1_fhd, 'fix_scroll_sidebar_1_fhd');
            }
            if (sidebar_2_fhd && !adTimers['fix_scroll_sidebar_2_fhd']) {
                insertAdCode(sidebar_2_fhd, 'fix_scroll_sidebar_2_fhd');
            }
        }
    }

    loadAdsForResolution();
    window.addEventListener('scroll', checkSidebarScroll);

});
