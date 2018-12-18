const bddQuery = require("./function/bddQuery");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "nickname",
      passwordField: "password"
    },
    async (nickname, password, cb) => {
      const userQuery = await bddQuery(
        `SELECT id, nickname from users where nickname = ?
         and password = ?`,
        [nickname, password]
      );

      const user = userQuery.results[0];
      if (!user) {
        return cb(null, false, { message: "Pseudo ou mot de passe incorrect" });
      } else {
        return cb(null, { id: user.id, nickname: user.nickname });
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      const user = jwtPayload;
      return cb(null, user);
    }
  )
);
