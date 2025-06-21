import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "~/Firebase";
import { SignInWithGoogle } from "~/store/slice/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      toast
        .promise(
          dispatch(
            SignInWithGoogle({
              name: resultsFromGoogle.user.displayName,
              email: resultsFromGoogle.user.email,
              googlePhotoUrl: resultsFromGoogle.user.photoURL,
            })
          ),
          {
            pending: "Loading",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success("Logged in successfully!");
            navigate("/");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex items-center justify-center cursor-pointer outline-none w-full bg-gradient-to-r text-white hover:opacity-90 from-pink-400 to-orange-400 py-3 rounded-lg transition-all duration-200"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </button>
  );
};
export default OAuth;
