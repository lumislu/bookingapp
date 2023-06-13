import jwt from "jsonwebtoken";
import { errorMessage } from "./errorMessage.js";

const JWT_Token = (req, res, next, callBackFunction) => {
  const token = req.cookies.JWT_token; //在index.js使用app.use(cookieParser())來抓取
 
  if (!token) {
    //沒抓到Token就顯示
    next(errorMessage(401, "請先登入"));
  }
  jwt.verify(token, process.env.JWT, (err, payload) => {
    console.log(token);
    if (err) return next(errorMessage(403, "TOKEN無效，解開JWT失敗"));
    req.userData = payload; //解碼後應該是我們一開始sign的user.id與user.isadmin

    // next();
    callBackFunction();
  });
};

export const verifyUser = (req, res, next) => {
  JWT_Token(req, res, next, () => {
    const apiUserId = req.params.id;
    if (req.userData.id == apiUserId || req.userData.isAdmin) {
      next();
    } else {
      next(errorMessage(403, "只能修改個人自己的權限或是你不是管理員"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  JWT_Token(req, res, next, () => {
    if (req.userData.isAdmin) {
      next();
    } else {
      next(errorMessage(403, "無管理員權限"));
    }
  });
};
