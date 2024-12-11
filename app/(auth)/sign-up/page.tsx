import SignupForm from "@/containers/Auth/SignupForm";
import QueryClientWrapper from "@/providers/QueryClient";

export const SignUp = () => (
  <QueryClientWrapper>
    <SignupForm />
  </QueryClientWrapper>
);

export default SignUp;
