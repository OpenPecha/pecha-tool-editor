import { SignJWT } from "jose";

const secret = import.meta.env.VITE_TIPTAP_SECRET as string
const API_SECRET = new TextEncoder().encode(secret); // Replace with your actual secret

export const generateTiptapToken = async () => {
  

  const payload ={
    "exp": Math.floor(Date.now() / 1000) + 60 * 60,
    "iss": "https://cloud.tiptap.dev",
    "aud": "jkvv5xek"
  }
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256",typ:"JWT" }) // HS256 Algorithm
      .sign(API_SECRET);
    console.log(token)
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    return null;
  }
};
