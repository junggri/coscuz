module.exports = {
  html: function (Lists, authStatus) {
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
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css"
            rel="stylesheet"
            type="text/css"
          />
          <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="/fontello/css/fontello.css" />
          <link rel="stylesheet" href="/css/style.css" />
      </head>
        <body>
       ${authStatus}
            <div class="container">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="item active"></div>
                <div class="item"></div>
                <div class="item"></div>
              </div>
              <a class="left" href="#myCarousel" role="button" data-slide="prev">
                <span class="spoqa-left">&#xE000</span>
              </a>
              <a class="right" href="#myCarousel" role="button" data-slide="next">
                <span class="spoqa-right">&#xE001</span>
              </a>
            </div>
          </div>
          <div class="brand-page">
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
            <script src="../dist/bundle.js"></script>
        </body>
      </html>
      `;
  },
};
