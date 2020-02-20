module.exports = {
  html: function(Lists) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>COSCUZ - 새로운 안경 플랫폼</title>
          <meta name="title" content="코스커즈 - 새로운 안경 플랫폼" />
          <meta
            name="keywords"
            content="안경,안경테,안경브랜드,해외안경브랜드,안경추,안경쇼핑몰,코스커즈"
          />
          <meta
            name="description"
            content="안경 이제는 온라인에서, 안경원에서 만나 볼 수 없었던 안경"
          />
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
        <div class="nav-bar">
      <div class="nav-bar_left">
        <div class="nav-bar_left_list1">COSCUZ</div>
      </div>
      <div class="nav-bar_right">
        <div class="input-box">
          <input
            type="text"
            class="search-text"
            name="searchBrand"
            placeholder="원하시는 브랜드를 찾아보세요"
          />
        </div>
        <div class="icon-box"></div>
      </div>
      <div class="nav-bar_box">
        <span>브랜드 등록하기</span>
      </div>
    </div>
    <div id="container">
      <div class="slide_wrap">
        <div class="slide_box">
          <div class="slide_list clearfix">
            <div class="slide_content slide1">
              <p>1</p>
            </div>
            <div class="slide_content slide2">
              <p>2</p>
            </div>
            <div class="slide_content slide3">
              <p>3</p>
            </div>
            <div class="slide_content slide4">
              <p>4</p>
            </div>
            <div class="slide_content slide5">
              <p>5</p>
            </div>
          </div>
        </div>
        <div class="slide_btn_box">
          <div class="slide_btn_prev">Prev</div>
          <div class="slide_btn_next">Next</div>
        </div>
        <ul class="slide_pagination"></ul>
      </div>
    </div>
    <div class="brand-page">
      <div class="brand-page_slo">
        The New Vibe Brands
      </div>
      <div class="brand-page_box">
       ${Lists}
      </div>
    </div>
    <div class="footer">
      <div class="footer_coscuz">COSCUZ</div>
      <div class="footer_copy">©COSCUZ. All Rights Reserved.</div>
      <div class="footer_icon">
        <div class="line-box">
          <div class="footer_icon_line line1"></div>
          <div class="footer_icon_line line2"></div>
        </div>
      </div>
    </div>
    <div class="register-login"></div>
    <script src="/javascript/slide.js"></script>
    <script src="/javascript/index.js"></script>
          <script src="/javascript/index.js"></script>
        </body>
      </html>
      
      `;
  }
};
