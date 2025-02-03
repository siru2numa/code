	function getCookie(name) {
			return document.cookie.split('; ').some(cookie => cookie.startsWith(name + "="));
	}

	function setCookie(name, value, maxAge) {
			document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
	}

// setCookie(cookieName_slide_nmd, "false", 10);

	if (!getCookie(cookieName_slide_nmd)) {

		let paragraphs = document.querySelectorAll('.tt_article_useless_p_margin p');

		let paragraphCount = paragraphs.length;

		let slide_arrow_img_nmd = 'https://img.planbplus.co.kr/sliding/img/sliding75/arw.png'; // 화살표 이미지

		let slide_point_nmd = Math.floor(paragraphCount * location_numer_nmd);

    let slide_bannerHTML = `
        <div>&nbsp;</div>
        <div class="banner-container-nmd" onclick="setCookieAndRedirect();">
            <div class="slide-cpng-banner-back-nmd">
                <img src="${slide_back_img_nmd}" alt="Icon">
            </div>
            <div class="slide-cpng-banner-front-nmd">
                <img class="front-img-nmd" src="${slide_front_img_nmd}" alt="Icon">
                <div class="slide-cpng-banner-rightbox-nmd arw">
                    <div class="slide-cpng-banner-rightbox-arrow-nmd">
                        <img src="${slide_arrow_img_nmd}" alt="Arrow">
                    </div>
                </div>
            </div>
        </div>
        <div>&nbsp;</div>
    `;

    // 쿠키 설정 후 이동하는 함수 (실행 순서 보장)
    function setCookieAndRedirect() {
        setCookie(cookieName_slide_nmd, "true", ck_time_nmd);
        window.location.href = slide_target_url_nmd;
    }


		for (var i = 0; i < paragraphCount; i++) {
				if (i === slide_point_nmd) {
					var bannerWrapper = document.createElement('div');
					bannerWrapper.innerHTML = slide_bannerHTML;
					paragraphs[i].insertAdjacentElement('afterend', bannerWrapper);
			}
		}

	}

document.querySelectorAll('.banner-container-nmd').forEach((banner) => {
    const foreground = banner.querySelector('.slide-cpng-banner-front-nmd');
    const background = banner.querySelector('.slide-cpng-banner-back-nmd');

    let direction = -1;
    let position = -50;
    let moveCount = 0;
    let acceleration = 0;
    let isDragging = false;
    let dragStart_X = 0;
    let isPaused = false;
    let isRedirected = false; // 페이지 이동 여부 확인 변수

    function checkPosition() {
        if (position <= -30 && !isRedirected) { // 중복 실행 방지
            isRedirected = true;
            setCookie(cookieName_slide_nmd, "true", ck_time_nmd);

            // 클릭 및 터치 이벤트 비활성화
            foreground.style.pointerEvents = "none";
            background.style.pointerEvents = "none";
            banner.style.pointerEvents = "none";

            window.location.href = slide_target_url_nmd;
        }
    }

    function animate() {
        if (!isPaused && !isRedirected) { // 페이지 이동 후 실행 방지
            if (moveCount < 4) {
                if (direction === 1) {
                    acceleration += 0.05;
                    position += 1.5 + acceleration;
                    if (position >= -60) {
                        direction = -1;
                        moveCount++;
                        acceleration = 0;
                    }
                } else {
                    position -= 0.7;
                    if (position <= -120) {
                        direction = 1;
                        moveCount++;
                        acceleration = 0;
                    }
                }
                foreground.style.left = `${position}px`;
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    moveCount = 0;
                    requestAnimationFrame(animate);
                }, 1000);
            }
        }
    }

    foreground.addEventListener('mousedown', (e) => {
        if (isRedirected) return; // 페이지 이동 후 터치 방지
        isDragging = true;
        dragStart_X = e.clientX - position;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && !isRedirected) {
            position = e.clientX - dragStart_X;
            position = Math.min(Math.max(position, -150), -60);
            foreground.style.left = `${position}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    foreground.addEventListener('touchstart', (e) => {
        if (isRedirected) return; // 페이지 이동 후 터치 방지
        isDragging = true;
        dragStart_X = e.touches[0].clientX - position;
        e.preventDefault();
    });

    background.addEventListener('touchstart', (e) => {
        if (isRedirected) return;
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging && !isRedirected) {
            let touch = e.touches[0];
            position = touch.clientX - dragStart_X;
            position = Math.min(Math.max(position, -150), -60);
            foreground.style.left = `${position}px`;

            checkPosition();
        }
    });

    background.addEventListener('touchmove', (e) => {
        if (isDragging && !isRedirected) {
            let touch = e.touches[0];
            position = touch.clientX - dragStart_X;
            position = Math.min(Math.max(position, -150), -60);
            foreground.style.left = `${position}px`;

            checkPosition();
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    foreground.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    foreground.addEventListener('mouseleave', () => {
        isPaused = false;
        animate();
    });

    animate();
});
