let fs = require("fs");
module.exports = {
  brand: function(data) {
    let list = "";
    for (let i = 0; i < data.length; i++) {
      list += `<div class="brand-box">
        <div class="brand-image"></div>
        <div class="brand-desc">desc</div>
      </div>`;
    }
    return list;
  }
};
