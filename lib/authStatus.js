module.exports = {
  isOwner: function (req, res) {
    if (req.session.logined) {
      return true;
    } else {
      return false;
    }
  },
  status: function (req, res) {
    if (this.isOwner(req, res)) {
      return `<div class="nav-bar">
      <div class="nav-bar_left">
        <span class="nav-bar_name">COSCUZ</span>
        <span class="nav-bar_intro">소개</span>
        <span class="nav-bar_brandship">브랜드쉽 신청하기</span>
      </div>
      <div class="nav-bar_search_login">
        <form action="">
          <input
            type="text"
            placeholder="브랜드를 찾아보세요"
            class="search-input_login"
          />
        </form>
        <span class="search-icon_login"></span>
      </div>
      <div class="icon-torso"></div>
    </div>`;
    } else {
      return `
      <div class="nav-bar">
      <div class="nav-bar_left">
        <span class="nav-bar_name">COSCUZ</span>
        <span class="nav-bar_intro">소개</span>
        <span class="nav-bar_brandship">브랜드쉽 신청하기</span>
      </div>
      <div class="nav-bar_search">
        <form action="">
          <input
            type="text"
            placeholder="브랜드를 찾아보세요"
            class="search-input"
          />
        </form>
        <span class="search-icon"></span>
      </div>
      <div class="nav-bar_login">
        로그인
      </div>
      <div class="nav-bar_register">
        회원가입
      </div>
    </div>
      `;
    }
  },
};
