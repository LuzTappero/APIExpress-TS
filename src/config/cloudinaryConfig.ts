// api name = dmofgxbvt
// api key = 265163655817565
//IwpxICQCVpkbvX24YNLstoNLGZY = secret

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: 'dmofgxbvt',
    api_key: '265163655817565',
    api_secret: 'IwpxICQCVpkbvX24YNLstoNLGZY'
});

export default cloudinary;