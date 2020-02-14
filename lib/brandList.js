let fs = require("fs");
module.exports = {
  brand: function(data, desc) {
    let list = "";
    for (let i = 0; i < data.length; i++) {
      console.log(desc[i]);
      list += `<div class="brand-box" id="${data[i]}">
        <div class="brand-image" id="${data[i]}-image"></div>
        <div class="brand-desc" id="${data[i]}-desc">${desc[i]}</div>
      </div>`;
    }
    return list;
  }
};
