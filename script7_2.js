addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const referer = request.headers.get("Referer") || "";

  // 허용된 사이트 목록
  const allowedSites = ["https://ai-nomad-test2.tistory.com/"];

  // 허용되지 않은 사이트에서 접근하면 403 반환
  if (!allowedSites.some(site => referer.startsWith(site))) {
      return new Response("403 Forbidden", { status: 403 });
  }

  // CSS + alert 스크립트 생성
  const cssAndScript = `
      .banner-container-nmd {
          position: relative;
          width: 300px;
          height: 250px;
          cursor: pointer;
          overflow: hidden;
          left: 50%;
          transform: translate(-50%, 0);
          background-color: #ffffff;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      }
      .slide-cpng-banner-back-nmd {
          position: absolute;
          width: 300px;
          height: 250px;
          background-color: grey;
          overflow: hidden;
      }
      .slide-cpng-banner-back-nmd img, .front-img-nmd {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
      }
      .front-img-nmd {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
      }
      .slide-cpng-banner-front-nmd {
          position: absolute;
          width: 300px;
          height: 250px;
          background-color: rgba(255, 255, 255, 0.7);
          z-index: 2;
          left: -50px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          cursor: grab;
      }
      .slide-cpng-banner-top-right-nmd {
          position: absolute;
          z-index: 3;
          top: 0;
          right: 0;
          transform: translate(50%, 0);
          width: auto;
          height: auto;
      }
      .slide-cpng-banner-front-nmd:active {
          cursor: grabbing;
      }
      .slide-cpng-banner-top-right-nmd img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          z-index: 1;
      }
      .slide-cpng-banner-rightbox-nmd {
          position: absolute;
          width: 50px;
          height: 150px;
          z-index: 3;
          top: 50%;
          right: -25px;
          transform: translate(0, -50%);
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0);
          border-radius: 10px;
      }
      .slide-cpng-banner-rightbox-arrow-nmd {
          position: absolute;
          width: 40px;
          height: 40px;
          background-color: orangered;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
      }
      
      /* alert 스크립트 삽입 */
      @import url('data:text/css;charset=utf-8;base64,LyoqIEluamVjdGVkIFNjcmlwdCAqLwppZiggd2luZG93ICkgYXN5bmMgPT4geyBhbGVydCgiYWRhc2QiKTsgfQo=');
  `;

  return new Response(cssAndScript, {
      headers: {
          "Content-Type": "text/css",
          "Access-Control-Allow-Origin": allowedSites[0],
      }
  });
}
