    window.RufflePlayer = window.RufflePlayer || {};
    window.addEventListener("load", function () {
        const ruffle = window.RufflePlayer.newest();
        const rufflePlayer = ruffle.createPlayer();
        const container = document.querySelector("ruffle-embed");
        container.appendChild(rufflePlayer);
        rufflePlayer.load(container.getAttribute("src"));
    });
