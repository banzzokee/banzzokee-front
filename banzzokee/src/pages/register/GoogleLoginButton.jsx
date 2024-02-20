import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function GoogleLoginButton() {
  const clientId = '679888049936-k5otspaavapavud961if59cjnstpb7rb.apps.googleusercontent.com'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    width="295px"
                    theme="filled_black"
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
}
