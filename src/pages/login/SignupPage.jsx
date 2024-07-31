import { useState } from "react";
import Signup from "./Signup";
import Terms from "./Terms";

const SignupPage = () => {
  const [isAgree, setIsAgree] = useState(false);
  return <>{isAgree ? <Signup /> : <Terms setIsAgree={setIsAgree} />}</>;
};
export default SignupPage;
