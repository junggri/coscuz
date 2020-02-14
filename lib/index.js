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
            <div class="nav-bar_left">COSCUZ</div>
            <div class="nav-bar_right">
              <div class="nav-bar_right_list list1">로그인</div>
              <div class="nav-bar_right_list list2">회원가입</div>
              <div class="nav-bar_right_list list3">소개</div>
            </div>
          </div>
          <div class="container">
            <div class="main-detail"></div>
            <div class="main-slogan"></div>
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
          <script src="/javascript/index.js"></script>
        </body>
      </html>
      
      `;
  }
};
