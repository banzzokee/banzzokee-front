// import React from 'react';

// const GoogleLoginButton = () => {
//   const handleGoogleLogin = () => {
//     // 클라이언트 측에서 백엔드의 OAuth 엔드포인트로 리다이렉션
//     window.location.href = '/oauth2/authorization/google';
//   };

//   return (
//     <button onClick={handleGoogleLogin}>
//       Google 로그인
//     </button>
//   );
// };

// export default GoogleLoginButton;





// import {GoogleLogin} from "@react-oauth/google";
// import {GoogleOAuthProvider} from "@react-oauth/google";

// export default function GoogleLoginButton() {
//   const clientId = '679888049936-k5otspaavapavud961if59cjnstpb7rb.apps.googleusercontent.com'
//     return (
//         <>
//             <GoogleOAuthProvider clientId={clientId}>
//                 <GoogleLogin
//                     width="295px"
//                     theme="filled_black"
//                     onSuccess={(res) => {
//                         console.log(res);
//                     }}
//                     onFailure={(err) => {
//                         console.log(err);
//                     }}
//                 />
//             </GoogleOAuthProvider>
//         </>
//     );
// }













// import {GoogleLogin} from "@react-oauth/google";
// import {GoogleOAuthProvider} from "@react-oauth/google";

// export default function GoogleLoginButton() {
//   const clientId = '679888049936-k5otspaavapavud961if59cjnstpb7rb.apps.googleusercontent.com'
//     return (
//         <>
//             <GoogleOAuthProvider clientId={clientId}>
//                 <GoogleLogin
//                     width="295px"
//                     theme="filled_black"
//                     onSuccess={(res) => {
//                         console.log(res);
//                     }}
//                     onFailure={(err) => {
//                         console.log(err);
//                     }}
//                 />
//             </GoogleOAuthProvider>
//         </>
//     );
// }
