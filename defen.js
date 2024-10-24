    function setCookie(name, value, minutes) {
        let date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }

    let clickCount = getCookie('clickCount') ? parseInt(getCookie('clickCount')) : 0;

    document.querySelector('.adsbygoogle').addEventListener('click', function(event) {
        clickCount++;
        setCookie('clickCount', clickCount, 10); 

        if (clickCount > 4) {
            alert('더 이상 클릭할 수 없습니다.');
            event.preventDefault();
        }

        setTimeout(function() {
            clickCount = 0;
            deleteCookie('clickCount'); 
        }, 60 * 1000);
    });
