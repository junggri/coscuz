module.exports = {
  IsOwner: function(req, res) {
    if (req.user) {
      return true;
    } else {
      return false;
    }
  },
  StatusUI: function(req, res) {
    console.log(req.user);
    var authStatusUI = `<a href="/auth/login">login</a>`;
    if (this.IsOwner(req, res)) {
      authStatusUI = `${req.user.displayName}`;
    }
    return authStatusUI;
  }
};
