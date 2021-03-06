module.exports = {
  brand: function(brand, desc) {
    let list = "";
    for (let i = 0; i < brand.length; i++) {
      let descValue = desc[Object.keys(desc)[i]];
      list += `<a href="/brand/${brand[i]}"><div class="brand-box" id="${brand[i]}">
        <div class="brand-image" id="${brand[i]}" style=background-image:url("../image/brand/${brand[i]}-image.jpg")></div>
        <div class="brand-desc" id="${brand[i]}-desc">${descValue}</div>
      </div></a>`;
    }
    return list;
  }
};
