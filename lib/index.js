module.exports = {
  html: function(authStatusUI = `<a href="/auth/login">login</a>`) {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>COSCUZ-새로운안경플랫폼</title>
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="/fontello/css/fontello.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
    <link
      href="https://fonts.googleapis.com/css?family=Ibarra+Real+Nova:400,700&display=swap&subset=latin-ext"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="page-1">
    <div class="nav-bar">
      <div class="nav-bar_logo">
        <img src="/image/nav-logo.svg" alt="">
      </div>
      <div class="nav-name nav-bar_left">
        <span>COSCUZ</span>
      </div>
      <div class="nav-bar_right">
          <div class="list1 nav-bar__list">about</div>
          <div class="list2 nav-bar__list">brand</div>
          <div class="list4 nav-bar__list">contact</div>
          <div class="list5 nav-bar__list"><a href="/auth/login">${authStatusUI}</a></div>
          <!-- <div class="list5 nav-bar__list">로그인</div> -->
          <div class="logout-box">logout</div>
      </div>
      </div>
      <div class="page-1_slogan">
        <span class="slogan-1">The new Glasses Platform</span></br>
        <span class="slogan-2">안경을 위한 새로운 플렛폼</span>
      </div>
      <div class="page-1_button">
        MORE
      </div>
      <div class="page-1_image"></div>
    </div>
    <div class="page-hidden page-4">
      <nav id="navbar" class="navbar">
        <ul class="nav-menu">
          <li>
            <a data-scroll="home" href="#home" class="dot active"> </a>
          </li>
          <li>
            <a data-scroll="one" href="#one" class="dot"> </a>
          </li>
          <li>
            <a data-scroll="two" href="#two" class="dot"> </a>
          </li>
          <li>
            <a data-scroll="three" href="#three" class="dot"> </a>
          </li>
        </ul>
      </nav>
      <section id="home">
        <div class="s1-slogan up-on-scroll">
          <span>우리는 당신을위한 새로운 안경플렛폼 입니다.</span>
        </div>
      </section>
      <section id="one">
        <div class="s2-slogan up-on-scroll">
          <span>당신의 라이프스타일에 어울리는 안경을 찾아보세요.</span>
        </div>
      </section>
      <section id="two">
        <div class="s3-slogan up-on-scroll">
          <span>더 나은 디자인을 가진 브랜드가 함께 합니다.</span>
        </div>
      </section>
      <section id="three">
        <div class="s4-slogan up-on-scroll">
          <span>안경은 이제 네임.</span>
        </div>
      </section>
    </div>
    <div class="page-2">
      <span class="page-2_slogan">Brand</span>
      <div class="brand-box">
        <div class="brands">
          <div class="brands-inner">
           <div class="brands-front"></div>
           <div class="brands-back"></div>
          </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
        <div class="brands">
          <div class="brands-inner">
            <div class="brands-front"></div>
            <div class="brands-back"></div>
           </div>
        </div>
      </div>
       <a href="/about/brand">
         <div class="page-2_button">
         more
       </div>
      </a>
    </div>
    <div class="page-3">
      <div class="page-3_slogan">
        Are you interested ?
      </div>
      <div class="contact">
        <div class="contact-detail">
          contact us
        </div>
        <div class="icon icon-1">
          <span><i class="fab fa-instagram"></i></span>
        </div>
        <div class="icon icon-2">
          <span><i class="far fa-envelope"></i></span>
        </div>
        <div class="icon icon-3">
          <span><i class="fas fa-mobile-alt"></i></span>
        </div>
      </div>
    </div>
  </body>
  <script src="/javascript/index.js"></script>
  <script src="/javascript/about.js"></script>
</html>
      `;
  }
};
