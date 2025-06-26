import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { loginWithGoogle } from "lib/appwrite/auth";
import { account } from "lib/appwrite/client";
import { Link, redirect } from "react-router";

// export async function clientLoader() {
//   try {
//     const user = await account.get();
//     if (!user.$id) return redirect("/");
//   } catch (e) {
//     console.log("error fetching user", e);
//   }
// }

const SignIn = () => {
  const handleSignIn = async () => {
    await loginWithGoogle();
  };

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvist</h1>
          </header>
          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start your travel journey
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease
            </p>
          </article>

          <ButtonComponent
            type="button"
            onClick={handleSignIn}
            className="button-class !h-11 !w-full"
            iconCss="e-search-icon"
          >
            <img
              src="/assets/icons/google.svg"
              className="size-5"
              alt="google"
            />
            <span className="p-18-semibold text-white">
              Sign In with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
