import singUpHandler from "./lambdas/signup";
import singInHandler from "./lambdas/signin";
import uploadImgHandler from "./lambdas/uploadimg";
import deleteImgHandler from "./lambdas/deleteimg";
import getImgsListHandler from "./lambdas/getlistimgs";

// sign-up handler
export const signUp = singUpHandler;
// sign-in handler
export const signIn = singInHandler;
// upload img to s3 bucket
export const uploadImg = uploadImgHandler;
// delete img handler
export const deleteImg = deleteImgHandler;
// get imgs list handler
export const getListImgs = getImgsListHandler;
